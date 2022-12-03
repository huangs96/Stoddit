const authUser = async (credentials)=>  {
  // console.log(credentials);
  const res = fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
  .then(data => {
    data.json();
  })
  .catch(err => {
    console.log('err', err);
  });
}

const logoutUser = async () => {
  const res = await fetch('http://localhost:5000/login/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  });
  return await res.json();
}

module.exports = {
  authUser,
  logoutUser
}