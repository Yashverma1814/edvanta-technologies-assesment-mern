const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  prompt: String,
  label: String,
  visibility: { type: String, enum: ['public', 'private', 'custom'] },
  sharedAccess: [String],
  description: String,
  type: String,
  subtype: String,
  actor: { username: String }
});

module.exports = mongoose.model('Prompt', promptSchema);
