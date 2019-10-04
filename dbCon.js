  const mysql = require('mysql');

  module.exports = {
    dbCon: mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "love1565",
      database: "manufacturers"
    })
  }
