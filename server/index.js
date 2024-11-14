const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Endpoint to add a new task
app.post('/add', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Task name is required' });
  }

  TodoModel.create({ name })
    .then(result => res.status(201).json(result))  // Ensure _id is included in the result
    .catch(err => {
      console.error('Error creating task:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Endpoint to get all tasks
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(results => res.status(200).json(results))
    .catch(err => {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Endpoint to update a task's status
app.patch('/update/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  TodoModel.findByIdAndUpdate(id, { status }, { new: true })
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.error('Error updating task:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Endpoint to delete a task
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(result => res.status(200).json({ message: 'Task deleted successfully' }))
    .catch(err => {
      console.error('Error deleting task:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
