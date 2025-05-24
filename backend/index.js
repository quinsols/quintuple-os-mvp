// index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const OpenAI = require('openai'); // ✅ OpenAI SDK v4
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(cors());
app.use(express.json());

// ===========================
// 📦 PostgreSQL API Routes
// ===========================

app.get('/api/pods', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pods');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/agents', async (req, res) => {
  try {
    const podId = req.query.pod_id;
    const query = podId 
      ? 'SELECT * FROM agents WHERE pod_id = $1'
      : 'SELECT * FROM agents';
    const values = podId ? [podId] : [];

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching agents' });
  }
});

app.get('/api/task-log', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM task_log ORDER BY timestamp DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching task log' });
  }
});

app.get('/api/feedback-log', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedback_log ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Feedback log error:', err.message);
    res.status(500).json({ error: 'Error fetching feedback' });
  }
});

// ===========================
// 🧠 Unified Prompt Route with Simulation Check + MasterPod Mapping
// ===========================
app.post('/api/prompt', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // ✅ Step 1: Check for Simulated OKR Match
    const simQuery = `
      SELECT * FROM simulated_okrs 
      WHERE LOWER(okr_text) LIKE LOWER($1) LIMIT 1
    `;
    const simRes = await pool.query(simQuery, [`%${prompt.trim()}%`]);

    if (simRes.rowCount > 0) {
      const sim = simRes.rows[0];

      return res.json({
        status: "ok",
        step: "simulation_match",
        source: "simulated",
        matched_okr: sim.okr_text,
        pod_id: sim.pod_id,
        tags: sim.tags,
        status_flag: sim.status,
        sop_id: sim.sop_id
      });
    }

    // ✅ Step 2: Fallback to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = completion.choices[0].message.content;
    console.log("🧠 OpenAI OKR Response:\n", rawText);

    const okrs = rawText
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0);

    console.log("🟢 Extracted OKRs:", okrs);

    // ✅ Step 3: Map each OKR using simulated_okrs
    const mappedTasks = [];

    for (const okr of okrs) {
      const simRes = await pool.query(
        `SELECT s.okr_text, s.sop_id, s.agent_id, s.pod_id,
                a.name AS agent_name, p.name AS pod_name, sop.title AS sop_title
         FROM simulated_okrs s
         LEFT JOIN agents a ON s.agent_id = a.id
         LEFT JOIN pods p ON s.pod_id = p.id
         LEFT JOIN sops sop ON s.sop_id = sop.id
         WHERE LOWER(s.okr_text) ILIKE LOWER($1) LIMIT 1`,
        [`%${okr}%`]
      );

      if (simRes.rowCount === 0) {
        console.log(`⚠️ Simulated match not found for OKR: ${okr}`);
        continue;
      }

      const row = simRes.rows[0];

      const placeholdersRes = row.sop_id
        ? await pool.query('SELECT placeholder FROM placeholders WHERE sop_id = $1', [row.sop_id])
        : { rows: [] };

      const placeholders = placeholdersRes.rows.map(p => p.placeholder);

      mappedTasks.push({
        okr,
        pod_id: row.pod_id,
        pod_name: row.pod_name || 'Unknown',
        agent_id: row.agent_id,
        agent_name: row.agent_name || 'Unknown',
        sop_id: row.sop_id,
        sop_title: row.sop_title,
        placeholders
      });
    }

    res.json({
      status: 'ok',
      step: 'phase_1_complete',
      source: 'openai',
      original_prompt: prompt,
      okrs,
      mapped_tasks: mappedTasks
    });

  } catch (err) {
    console.error('❌ Prompt handler error:', err.message);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// ===========================
// 🚀 Start Server
// ===========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
