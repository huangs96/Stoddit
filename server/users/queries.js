const getUsers = "SELECT * FROM account";
const getUsersById = "SELECT * FROM account WHERE id = $1";
const userExists = "SELECT u FROM account u WHERE u.phone = $1";


module.exports = {
  getUsers,
  getUsersById,
  userExists
}