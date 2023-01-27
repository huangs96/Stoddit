import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {
  const userID = JSON.parse(localStorage.getItem('UserID'));

  return (
    userID ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes