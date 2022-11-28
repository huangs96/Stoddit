const getUsers = "SELECT * FROM account";
const getUsersById = "SELECT * FROM account WHERE id = $1";
const userExists = "SELECT u FROM account u WHERE u.phone = $1";
const addUser = "INSERT INTO account (username, password, bio, phone) VALUES ($1, $2, $3, $4)";
const deleteUser = "DELETE FROM account WHERE id = $1";
const updateUser = "UPDATE account SET username = COALESCE($1, username), password = COALESCE($2, password), bio = COALESCE($3, bio), phone = COALESCE($4, phone) WHERE id = $5";


module.exports = {
  getUsers,
  getUsersById,
  userExists,
  addUser,
  deleteUser,
  updateUser
}