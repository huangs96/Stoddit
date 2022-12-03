const getUser = async (token) => {
  return await fetch ('http://localhost:5000/users/home', {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
})
  .then(data => {
    console.log(data);
    data.json();
  })
}

module.exports = {
  getUser,
  // fetchRefreshToken
}