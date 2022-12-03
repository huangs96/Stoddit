import React, { useEffect } from 'react'
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { getUser, fetchRefreshToken } from '../../services/home.service';
import { logoutUser } from '../../services/login.service';
// import { getUserHomePage } from ''


function HomePage() {
  let [user, setUser] = React.useState('');
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
    getUser();
  }, [])


  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>logout</button>
    </div>
    )
}

export default HomePage