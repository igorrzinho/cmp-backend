const express = require('express');
const app = express();
const port = 3010;
const cors = require('cors');
const routerChat = require('./route/routeChat.js');
const routerUser = require('./route/routeUser.js');
const { CreateTableChat } = require('./controller/chat.js');
const { CreateTableUser } = require('./controller/user.js');
const { CreateTableMessage } = require('./controller/chat.js');

CreateTableUser();
CreateTableChat();
CreateTableMessage();

app.use(express.json());
app.use(cors());

app.use('/chat', routerChat);
app.use('/user', routerUser);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
