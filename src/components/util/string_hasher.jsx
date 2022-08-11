const bcrypt = require("bcrypt");
const saltRounds = 10;

export function hashString(string) {
  const salt = bcrypt
    .genSalt(saltRounds)
    .then((value) => value)
    .catch((error) => console.log(error));

  const hashed = bcrypt
    .hash(string, salt)
    .then((value) => value)
    .catch((error) => error);

  return hashed;
}
