const mysql = require('mysql');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// MYSQL SERVER CONFIG

const dbConfig = {
  host: 'localhost',     
  user: 'root',          
  password: '',            
};

// HELPER FUNCTIONS

const SALTROUNDS = 10;

function createUUID(){
    return crypto.randomBytes(16).toString('hex')
}

const hashPassword = (plaintext) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plaintext, SALTROUNDS, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};


const validateUser = (plaintext, hashedText) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintext, hashedText, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


// DATABASE CONFIG

const DATABASE_NAME = 'secureweb';

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err.sqlMessage);
        return;
      }
    
    console.log('Connected to MySQL database!');
});

// DATABASE CREATION 

connection.query('CREATE DATABASE '+ DATABASE_NAME, (err, result) => {
    if (err) {
      console.error('Error creating database: ', err.sqlMessage);
      return;
    }
  
    console.log('Database created successfully!');
});

// DATABASE SELECTION

connection.query('USE '+ DATABASE_NAME, (err, result) => {
    if (err) {
      console.error('Error selecting database: ', err.sqlMessage);
      return;
    }
  
    console.log('Database selected successfully!');
});

// USER TABLE CREATION

function createUsersTable() {
    const SQL_USER_TABLE = `
    CREATE TABLE users (
        id int(32) NOT NULL,
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
  
    connection.query(SQL_USER_TABLE, (error) => {
      if (error) {
        console.error('Error creating "users" table:', error.sqlMessage);
      } else {
        console.log('Successfully created "users" table');
      }
    });
}

// USER ACCOUNT CREATION

function addUser(username, first_name, last_name, email, password){
    const SQL_ADD_USER = `INSERT INTO users (id, username, first_name, last_name, email, password) VALUES (? ,? ,? ,? ,? ,? );`;
    const values = [createUUID(), username, first_name, last_name, email, password];
    connection.query(SQL_ADD_USER, values, (error, results, fields) => {
            console.log('error: ',error,'\n results: ',results,'\n fields: ',fields);
            if (error) {
            console.error('Error adding user:', error);
            } else {
            console.log('User added successfully');
            }
        });
}


// USER LOGIN

function accountLogin(username='', email='', password){
  
  if (username.length==0){
  const SQL_USER_EMAIL = `SELECT (id, username, email) FROM users WHERE email LIKE (?); `;
  const u_mail = [email, password];
  connection.query(SQL_USER_EMAIL, u_mail, (error, results, fields) => {
          console.log('error: ',error,'\n results: ',results,'\n fields: ',fields);
          if (error) {
            console.error('Error logging in:', error);
          } else {
            console.log('User logged in successfully');
            return results
          }
      });}

  if (email.length==0){
  const SQL_USER_NAME = `SELECT (id, username, email) FROM users WHERE username LIKE (?); `;
  const u_name = [username, password];
  connection.query(SQL_USER_NAME, u_name, (error, results, fields) => {
          console.log('error: ',error,'\n results: ',results,'\n fields: ',fields);
          if (error) {
            console.error('Error logging in:', error);
          } else {
            console.log('User logged in successfully');
            return results
          }
      });}
}

// console.log(hash('teset'));
// createUsersTable()
addUser(username='testUser1',
        first_name='test',
        last_name='user1',
        email='testuser1@email.com',
        password='P@ssw0rd123')

module.exports = connection;

// module.exports = { connection, createUsersTable };