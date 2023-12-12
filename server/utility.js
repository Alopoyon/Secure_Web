const crypto = require('crypto');
const bcrypt = require('bcrypt');

const SALTROUNDS = 10;

function createUUID(){
    return crypto.randomBytes(16).toString('hex')
}

// function hashPassword(password) {
//     return bcrypt.hash(password, SALTROUNDS)
//         .then(hashedPassword => {
//             // console.log(hashedPassword );
//             return hashedPassword;
//         })
//         .catch(err => {
//             console.error(err);
//             throw err;
//         });
// }

// function validateUser(password, hash) {
//     return bcrypt.compare(password, hash)
//         .then(isPasswordValid => {
//             // console.log(isPasswordValid );
//             return isPasswordValid;
//         })
//         .catch(err => {
//             console.error(err);
//             throw err;
//         });
// }

const hashPassword = (plaintext) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plaintext, 10, (err, hash) => {
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

async function runExample() {
    console.log('UUID: ',createUUID(),'\nUUID type: ',typeof(createUUID()),'\n');
    const hashedPassword = await hashPassword('test');
    console.log('hashedPassword: ',hashedPassword);
    console.log(await validateUser('test', hashedPassword));
}

// let k = hash('test')
// console.log('k: ',typeof(k));

runExample()
module.exports = {createUUID,hashPassword,validateUser}