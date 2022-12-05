import React, { useEffect, useState } from 'react'
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { getUser, fetchRefreshToken } from '../../services/home.service';
import { logoutUser } from '../../services/auth.service';
import Header from '../../components/Header';


function HomePage() {
  let [user, setUser] = useState('');
  const { handle } = useParams();

  let navigate = useNavigate();

  // const getRefreshToken = async () => {
  //   let x = await fetchRefreshToken();
  //   console.log('x---', x);
  // };

  // getRefreshToken();
  
  const logout = async () => {
    const deleteDetails = await logoutUser();
    if (deleteDetails.error) {
      console.log(deleteDetails.error);
      return;
    }
    // accessToken = "";
    console.log(deleteDetails.message);
    return navigate('/login')
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
    }
    fetchData()
    .catch(console.error);
    console.log(user);
  }, [])


  return (
    <>
    <Header />
    <div>
      {user && <h1>Welcome {user.user.username}</h1>}
      <button onClick={logout}>logout</button>
    </div>
    </>
    )
}

export default HomePage