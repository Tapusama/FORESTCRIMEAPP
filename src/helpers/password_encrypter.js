const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
  try {
    return new Promise((resolve, reject) => {
      const salt = process.env.APP_KEY + password;
      bcrypt.hash(salt, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  } catch (e) {
    reject(e)
  }
};

module.exports = { encryptPassword };
