const authUser = async (credentials)=>  {
  // console.log(credentials);
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
  .then(data => {
    console.log(data);
    data.json()
  })
  .catch(e => {
    console.log('e', e);
  });
}

const getHome = async () => {
  return fetch('http://localhost:5000/users/home')
  .then(data => {
    console.log(data);
  })
}

module.exports = {
  authUser,
  getHome
}