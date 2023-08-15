const openDb = require('../db.js');

async function CreateTableUser() {
  openDb().then((db) => {
    db.exec(
      'CREATE TABLE IF NOT EXISTS usuarios( id integer PRIMARY KEY, email varchar(90), user varchar(90), senha varchar(90),nome varchar(90), token varchar(50));'
    );
  });
}

async function Token(username, password) {
  return openDb().then((db) => {
    return db
      .all(
        `SELECT token,id FROM usuarios WHERE email = ? OR user = ?  AND senha
         = ?`,
        [username, password]
      )
      .then((res) => res);
  });
}

async function AllUsers() {
  return openDb().then((db) => {
    return db.all('SELECT * FROM usuarios');
  });
}

async function NewUser(senha, nome, user, email, token) {
  openDb().then((db) => {
    db.run(
      'INSERT INTO usuarios (senha, user, nome, email, token) VALUES (?,?,?)',
      [senha, user, nome, email, token]
    );
  });
}

module.exports = {
  CreateTableUser,
  NewUser,
  AllUsers,
  Token,
};
