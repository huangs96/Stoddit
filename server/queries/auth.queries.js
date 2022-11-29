const getUsernameAndPassword = "SELECT * FROM account WHERE username = $1";

module.exports = {
  getUsernameAndPassword
}