const express = require('express');
const router = express.Router();
const Prompts = require('../controllers/promptsController');

// Middleware to authenticate and set username
router.use((req, res, next) => {
  // Assume JWT is decoded and username is available in req.user.username
  req.username = 'john_doe'; // Replace this with actual authentication logic
  next();
});

router.post('/', async (req, res) => {
  try {
    const prompts = new Prompts(req.username);
    const result = await prompts.create(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const prompts = new Prompts(req.username);
    const result = await prompts.update(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const prompts = new Prompts(req.username);
    const result = await prompts.get(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const prompts = new Prompts(req.username);
    const result = await prompts.getAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const prompts = new Prompts(req.username);
    const result = await prompts.delete(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
