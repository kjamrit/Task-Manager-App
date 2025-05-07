require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, Task } = require('./models');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

sequelize.authenticate()
  .then(() => console.log('Database connected via Sequelize!'))
  .catch(err => console.error('DB connection error:', err));

sequelize.sync() // auto-create tables if they don't exist
  .then(() => console.log('Models synced!'))
  .catch(err => console.error('Sync error:', err));

 
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll({ order: [['created_at', 'DESC']] });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/tasks/:id/complete', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.is_completed = true;
    await task.save();

    res.json({ message: 'Task marked as completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/tasks/:id', async (req, res) => {
  try {
    const rowsDeleted = await Task.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
