const express = require('express');
const router = express.Router();
const { NewUser, AllUsers, Token } = require('../controller/user.js');
const { randomUUID } = require('crypto');
router.get('/', (req, res) => {
  res.json('user');
});

router.post('/newUser', async (req, res) => {
  let { user, pass } = req.body;
  NewUser(pass, user, randomUUID());
  let tolken = await Token(user, pass);
  res.json(tolken);
});

router.post('/token', async (req, res) => {
  let { user, pass } = req.body;
  let tolken = await Token(user, pass);
  res.json(tolken);
});

router.get('/allusers', async (req, res) => {
  let users = await AllUsers();
  res.json(users);
});
module.exports = router;
