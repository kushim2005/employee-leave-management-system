const bcrypt = require("bcrypt");

bcrypt.hash("Manager@123", 10).then(hash => {
    console.log(hash);
});