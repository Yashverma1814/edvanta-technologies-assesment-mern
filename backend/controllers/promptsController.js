const Prompt = require('../models/prompts');

class Prompts {
  constructor(username) {
    this.username = username;
  }

  async create(promptData) {
    promptData.actor = { username: this.username };
    const newPrompt = new Prompt(promptData);
    return await newPrompt.save();
  }

  async update(promptId, updatedData) {
    const prompt = await Prompt.findOne({ _id: promptId, 'actor.username': this.username });
    if (prompt) {
      Object.assign(prompt, updatedData);
      return await prompt.save();
    } else {
      throw new Error('Prompt not found or access denied.');
    }
  }

  async get(promptId) {
    return await Prompt.findOne({
      _id: promptId,
      $or: [
        { 'actor.username': this.username },
        { visibility: 'public' },
        { visibility: 'custom', sharedAccess: this.username }
      ]
    });
  }

  async getAll() {
    return await Prompt.find({
      $or: [
        { 'actor.username': this.username },
        { visibility: 'public' },
        { visibility: 'custom', sharedAccess: this.username }
      ]
    });
  }

  async delete(promptId) {
    const result = await Prompt.deleteOne({ _id: promptId, 'actor.username': this.username });
    if (result.deletedCount === 0) {
      throw new Error('Prompt not found or access denied.');
    }
    return result;
  }
}

module.exports = Prompts;