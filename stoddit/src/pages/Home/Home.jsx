import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../contexts/userContext';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { getAuthedUser, fetchRefreshToken } from '../../services/user.service';
import { logoutUser } from '../../services/auth.service';
import App from '../../App';
// import Header from '../../components/Header';


function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //grab user information as soon as authetication has been established
  useEffect(()=> {
    const fetchData = async () => {
      const data = await getAuthedUser();
      setUser(data);
      localStorage.setItem('UserID', JSON.stringify(data.user.id));
      localStorage.setItem('Username', JSON.stringify(data.user.username));
    }
    fetchData()
    .catch(console.error);
  }, []);

  const logout = async () => {
    const deleteDetails = await logoutUser();
    if (deleteDetails.error) {
      console.log(deleteDetails.error);
      return;
    }
    console.log(deleteDetails.message);
    return navigate('/login');
  };

  return (
    <>
    <div style={{marginTop: '10vh'}}>
      {user && <h1>Welcome {user.user.username}</h1>}
      <button onClick={logout}>logout</button>
    </div>
    </>
    )
};

export default HomePage