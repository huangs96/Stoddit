const getUser = async (token) => {
  return fetch ('http://localhost:5000/users/home', {
    headers: {Authentication: token,
  }})
  .then(data => {
    console.log(data);
  })
}

module.exports = {
  getUser
}