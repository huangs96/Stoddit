import React, { useEffect, useState } from 'react'
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { getUser, fetchRefreshToken } from '../../services/home.service';
import { logoutUser } from '../../services/auth.service';
import App from '../../App';
// import Header from '../../components/Header';


function HomePage() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  
  const logout = async () => {
    const deleteDetails = await logoutUser();
    if (deleteDetails.error) {
      console.log(deleteDetails.error);
      return;
    }
    console.log(deleteDetails.message);
    return navigate('/login');
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
    }
    fetchData()
    .catch(console.error);
    console.log('userhome----', user);
  }, [])


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