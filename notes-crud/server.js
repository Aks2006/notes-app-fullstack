const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api/notes', noteRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/notesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch(err => console.error('MongoDB connection error:', err));
