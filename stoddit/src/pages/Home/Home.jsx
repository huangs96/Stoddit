import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../contexts/userContext';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { getAuthedUser, fetchRefreshToken } from '../../services/user.service';
import { logoutUser } from '../../services/auth.service';
import Dashboard from './Dashboard/Dashboard';


function HomePage() {

  return (
    <>
    <div>
      <Dashboard />
    </div>
    </>
    )
};

export default HomePage