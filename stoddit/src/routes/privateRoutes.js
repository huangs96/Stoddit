import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {
  const authed = localStorage.getItem('authed');

  return (
    authed ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes