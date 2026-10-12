const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'anchor_website_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 1. Submit Form Lead
app.post('/api/inquiries', (req, res) => {
  const { name, phone, eventType, eventDate, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and Phone are required' });
  }

  const query = 'INSERT INTO inquiries (name, phone, event_type, event_date, message, status) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(query, [name, phone, eventType || null, eventDate || null, message || null, 'New'], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database save failed' });
    }
    res.status(201).json({ success: true, message: 'Inquiry saved successfully!', id: result.insertId });
  });
});

// 2. Get All Leads
app.get('/api/inquiries', (req, res) => {
  const query = 'SELECT * FROM inquiries ORDER BY id DESC';
  pool.query(query, (err, rows) => {
    if (err) {
      console.error('Database fetch error:', err);
      return res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
    res.json(rows);
  });
});

// 3. Update Lead Status (New / Contacted / Booked)
app.patch('/api/inquiries/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['New', 'Contacted', 'Booked'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const query = 'UPDATE inquiries SET status = ? WHERE id = ?';
  pool.query(query, [status, id], (err, result) => {
    if (err) {
      console.error('Database update error:', err);
      return res.status(500).json({ error: 'Failed to update status' });
    }
    res.json({ success: true, message: 'Status updated successfully' });
  });
});

// 4. Delete Lead
app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM inquiries WHERE id = ?';
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database delete error:', err);
      return res.status(500).json({ error: 'Failed to delete inquiry' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  });
});

app.get('/', (req, res) => {
  res.send('Backend Server is running perfectly!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
