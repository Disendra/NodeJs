const express = require('express');
const mongoose = require('mongoose');
const teamRoutes = require('./routes/teamRoutes');
const matchRoutes = require('./routes/matchRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/add-team', teamRoutes);
app.use('/process-result', matchRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/fantasy-cricket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => console.error('Error connecting to MongoDB:', err));
