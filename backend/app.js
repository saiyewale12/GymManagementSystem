const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage
const users = [{ username: 'admin', password: '1234' }];
const members = [];

// Routes

// Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  return res.status(200).json({ message: 'Login successful' });
});

// Get All Members
app.get('/api/members', (req, res) => {
  res.json(members);
});

// Add a Member
app.post('/api/members', (req, res) => {
  const { name, email, phone, feePackage, diet, supplement } = req.body;

  if (!name || !email || !phone || !feePackage) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newMember = {
    id: members.length + 1,
    name,
    email,
    phone,
    feePackage,
    diet: diet || 'Standard',
    supplement: supplement || 'None',
    notifications: [],
  };

  members.push(newMember);
  res.status(201).json({ message: 'Member added successfully', member: newMember });
});

// Update a Member
app.put('/api/members/:id', (req, res) => {
  const memberId = parseInt(req.params.id, 10);
  const { name, email, phone, feePackage, diet, supplement } = req.body;

  const member = members.find((m) => m.id === memberId);

  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }

  member.name = name || member.name;
  member.email = email || member.email;
  member.phone = phone || member.phone;
  member.feePackage = feePackage || member.feePackage;
  member.diet = diet || member.diet;
  member.supplement = supplement || member.supplement;

  res.json({ message: 'Member updated successfully', member });
});

// Delete a Member
app.delete('/api/members/:id', (req, res) => {
  const memberId = parseInt(req.params.id, 10);
  const memberIndex = members.findIndex((m) => m.id === memberId);

  if (memberIndex === -1) {
    return res.status(404).json({ message: 'Member not found' });
  }

  members.splice(memberIndex, 1);
  res.json({ message: 'Member deleted successfully' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
