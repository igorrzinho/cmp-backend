const express = require('express');
const router = express.Router();
const {
  NewChat,
  AllChats,
  NewMessage,
  SelectMessages,
  SelectMessageId,
  SelectId,
} = require('../controller/chat.js');

router.get('/', (req, res) => {
  res.json('chat');
});

router.post('/newChat', async (req, res) => {
  let { id1, id2 } = req.body;
  NewChat(id1, id2);
  res.json('chat criado ');
});

router.get('/allchats', async (req, res) => {
  let chats = await AllChats();
  console.log(chats);
  res.json(chats);
});

router.get('/selectId/:idChat', async (req, res) => {
  let { idChat } = req.params;
  let ids = await SelectId(idChat);
  res.status(200).json(ids);
});

// messages

router.post('/newMessage', (req, res) => {
  let { id1, id2, content, idChat } = req.body; //id1 = de //id2= para
  NewMessage(content, id1, id2, idChat);
  res.status(200).json('mensagem adicionada');
});

router.get('/selectMessages/:idChat', async (req, res) => {
  let { idChat } = req.params;
  let messages = await SelectMessages(idChat);
  res.status(200).json(messages);
});

router.get('/selectMessageId/:idChat', async (req, res) => {
  let { idChat } = req.params;
  let messages = await SelectMessageId(idChat);
  res.status(200).json(messages);
});

module.exports = router;