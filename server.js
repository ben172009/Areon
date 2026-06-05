const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 3000;
const dataFile = path.join(__dirname, 'messages.json');

app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/results', (req, res) => {
  return res.json({
    labels: [
      'Group Study',
      'Peer Discussion',
      'Class Participation',
      'Independent Study'
    ],
    data: [42, 23, 19, 16],
    colors: ['#2563eb', '#60a5fa', '#93c5fd', '#1e3a8a']
  });
});

app.post('/api/contact', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ status: 'error', error: 'invalid_message' });
  }

  const entry = {
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  try {
    let messages = [];
    try {
      const existing = await fs.readFile(dataFile, 'utf8');
      messages = JSON.parse(existing);
      if (!Array.isArray(messages)) {
        messages = [];
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    messages.push(entry);
    await fs.writeFile(dataFile, JSON.stringify(messages, null, 2), 'utf8');
    console.log('New contact message received:', entry);
    return res.json({ status: 'ok' });
  } catch (error) {
    console.error('Failed to save contact message:', error);
    return res.status(500).json({ status: 'error', error: 'server_error' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const content = await fs.readFile(dataFile, 'utf8');
    const messages = JSON.parse(content);
    return res.json(Array.isArray(messages) ? messages : []);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.json([]);
    }
    console.error('Failed to load messages:', error);
    return res.status(500).json({ status: 'error', error: 'server_error' });
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
