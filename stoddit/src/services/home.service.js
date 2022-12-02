const getUser = async () => {
  return fetch ('http://localhost:5000/users/home')
  .then(data => {
    console.log(data);
  })
}

module.exports = {
  getUser
}