import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {
  const userID = JSON.parse(localStorage.getItem('UserID'));
  // const username = JSON.parse(localStorage.getItem('Username'));

  return (
    userID ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes