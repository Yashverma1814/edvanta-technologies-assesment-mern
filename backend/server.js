const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/prompts_db', { useNewUrlParser: true, useUnifiedTopology: true });

// Import the prompts route
const promptsRoute = require('./routes/prompts');
app.use('/api/prompts', promptsRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
