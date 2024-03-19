const bcrypt = require('bcryptjs');

const password = 'Medusa.123'; // The password you want to hash
const saltRounds = 10; // Or another number you deem appropriate

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
    // You can now manually insert the hash into your database
  }
});
