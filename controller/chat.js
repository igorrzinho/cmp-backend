const openDb = require('../db.js');

async function CreateTableChat() {
  openDb().then((db) => {
    db.exec(
      'CREATE TABLE IF NOT EXISTS chat (id integer PRIMARY KEY,id1 INT NOT NULL, id2 INT NOT NULL, FOREIGN KEY (id1) REFERENCES usuarios (id), FOREIGN KEY (id2) REFERENCES usuarios (id))'
    );
  });
}

async function NewChat(id1, id2) {
  openDb().then((db) => {
    db.run('INSERT INTO chat (id1,id2) VALUES(?,?)', [id1, id2]);
  });
}

async function AllChats() {
  return openDb().then((db) => {
    return db.all('SELECT * FROM chat').then((res) => res);
  });
}

async function SelectId(id) {
  return openDb().then((db) => {
    return db
      .all(
        `SELECT id1, id2 FROM chat
         WHERE id = ?`,
        [id]
      )
      .then((res) => res);
  });
}

// messages
async function CreateTableMessage() {
  openDb().then((db) => {
    db.run(
      'CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY, content TEXT NOT NULL, de INT NOT NULL, para INT NOT NULL, idChat INT NOT NULL )'
    );
  });
}

async function NewMessage(content, id1, id2, idChat) {
  openDb().then((db) => {
    db.run('INSERT INTO messages (content, de, para, idChat) VALUES(?,?,?,?)', [
      content,
      id1,
      id2,
      idChat,
    ]);
  });
}

async function SelectMessages(idChat) {
  return openDb().then((db) => {
    return db
      .all(
        `SELECT * FROM messages
         WHERE idChat = ?`,
        [idChat]
      )
      .then((res) => res);
  });
}

async function SelectMessageId(idChat) {
  return openDb().then((db) => {
    return db
      .all(
        `SELECT content,de,para FROM messages
         WHERE idChat = ?`,
        [idChat]
      )
      .then((res) => res);
  });
}

module.exports = {
  CreateTableChat,
  NewChat,
  AllChats,
  CreateTableMessage,
  NewMessage,
  SelectMessages,
  SelectMessageId,
  SelectId,
};
