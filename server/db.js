const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',     // Replace with your MySQL server host
  user: 'root',          // Replace with your MySQL username
  password: '',          // Replace with your MySQL password
//   database: 'secureweb',   // Replace with your MySQL database name
});

const DATABASE_NAME = 'secureweb';

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err.sqlMessage);
        return;
      }
    
    console.log('Connected to MySQL database!');
});

connection.query('CREATE DATABASE '+ DATABASE_NAME, (err, result) => {
    if (err) {
      console.error('Error creating database: ', err.sqlMessage);
      return;
    }
  
    console.log('Database created successfully!');
});


connection.query('USE '+ DATABASE_NAME, (err, result) => {
    if (err) {
      console.error('Error selecting database: ', err.sqlMessage);
      return;
    }
  
    console.log('Database selected successfully!');
});

function createUsersTable() {
    const sql = `
    CREATE TABLE users (
        id int(11) NOT NULL,
        username varchar(60) NOT NULL,
        first_name varchar(60) NOT NULL,
        last_name varchar(60) NOT NULL,
        email varchar(80) NOT NULL,
        password varchar(72) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY email (email),
        UNIQUE KEY username (username),
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `;
  
    connection.query(sql, (error) => {
      if (error) {
        console.error('Error creating "users" table:', error.sqlMessage);
      } else {
        console.log('Successfully created "users" table');
      }
    });
}

function addUser(username, first_name, last_name, email, password){
    const sql = `INSERT INTO users (id, username, first_name, last_name, email, password) VALUES (? ,? ,? ,? ,? ,? )`;
    const values = [username, first_name, last_name, email, password];
}

createUsersTable()
module.exports = connection;

// module.exports = { connection, createUsersTable };