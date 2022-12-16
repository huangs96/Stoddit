//getting user dashboard/homepage

const getUser = () => {
  return fetch (`http://localhost:5000/users/home`, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  })
}

module.exports = {
  getUser,
  // fetchRefreshToken
}