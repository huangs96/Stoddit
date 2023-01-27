import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../contexts/userContext';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { getAuthedUser, fetchRefreshToken } from '../../services/user.service';
import { logoutUser } from '../../services/auth.service';
import Dashboard from './Dashboard/Dashboard';


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

  // const logout = async () => {
  //   const deleteDetails = await logoutUser();
  //   if (deleteDetails.error) {
  //     console.log(deleteDetails.error);
  //     return;
  //   }
  //   console.log(deleteDetails.message);
  //   return navigate('/login');
  // };

  return (
    <>
    <div>
      <Dashboard />
    </div>
    </>
    )
};

export default HomePage