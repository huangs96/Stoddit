import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {
  const authed = localStorage.getItem('authed');
  const userID = JSON.parse(localStorage.getItem('UserID'));

  return (
    authed && userID ? <Outlet /> : <Navigate to='/login' />
  )
};

export default PrivateRoutes