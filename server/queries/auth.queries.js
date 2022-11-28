const getUsernameAndPassword = "SELECT * FROM account WHERE username = $1 AND password = $2";

module.exports = {
  getUsernameAndPassword
}