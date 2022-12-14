const getUsers = "SELECT * FROM account";
const getUsersById = "SELECT * FROM account WHERE id = $1";
const userPhoneExists = "SELECT u FROM account u WHERE u.phone = $1";
const usernameExists = "SELECT u FROM account u WHERE u.username = $1";
const addUser = "INSERT INTO account (username, password, bio, phone) VALUES ($1, $2, $3, $4)";

module.exports = {
  getUsers,
  getUsersById,
  userPhoneExists,
  usernameExists,
  addUser,
}