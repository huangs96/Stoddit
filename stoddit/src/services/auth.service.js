const authUser = async (credentials)=>  {
  const res = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
  .then(res => res.json());
  return res;
};

const registerUser = async (credentials) => {
  const res = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
  .then(res => res.json());
  return res;
};

const logoutUser = async () => {
  const res = await fetch('http://localhost:5000/login/delete_token', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  });
  return await res.json();
};


module.exports = {
  authUser,
  logoutUser,
  registerUser
}