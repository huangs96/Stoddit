//getting user dashboard/homepage

const getAuthedUser = () => {
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
};

const getUserByID = async (userID) => {
  return fetch(`http://localhost:5000/users/${userID}`, {
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
  });
};

const getAllUsers = async () => {
  return fetch('http://localhost:5000/users', {
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
  });
};

const updateImage = async (image) => {
  return fetch('http://localhost:5000/users/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors',
    credentials: 'include',
    body: image
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  });
};

module.exports = {
  getAllUsers,
  getAuthedUser,
  getUserByID,
  updateImage
  // fetchRefreshToken
}