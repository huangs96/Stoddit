import React, { useState, useEffect } from 'react'
import { getUserByID } from '../../services/user.service';
import { TextField, MenuItem, Typography, Grid, Button } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "../../components/ProfileCard";
import SettingsCard from '../../components/SettingForms';
import './ProfileIndex.css';

// STYLE & THEME
const theme = createTheme();

function ProfileIndex() {

  const userID = JSON.parse(localStorage.getItem('UserID'));
  const [text, setText] = useState("");
  const [mainUser, setMainUser] = useState({});
  
  useEffect(() => {
    let isLoaded = true;
    if (isLoaded) {
      const fetchUserSettingData = async () => {
        const data = getUserByID(userID);
        console.log('data', data);
      };
      fetchUserSettingData()
      .catch(console.error);
    };

  }, []);

  // const mainUser = {
  //   // DEFAULT VALUES
  //   title: "CEO of Apple",
  //   dt1: 32,
  //   dt2: 40,
  //   dt3: 50,
  //   firstName: { text },
  //   lastName: "Doe",
  //   midName: "Baker",
  //   gender: "female",
  //   phone: "932-555-4247",
  //   email: "janedoe@gmail.com",
  //   pass: "password123"
  // };

  const fullName = `${mainUser.firstName} ${mainUser.lastName}`;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
            {/* COMPONENTS */}
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              sx={{
                position: "absolute",
                top: "20vh",
                px: { xs: 0, md: 7 }
              }}
            >
              {/* PROFILE CARD */}
              <Grid item md={3}>
                <ProfileCard
                  name={fullName}
                  sub={mainUser.title}
                  dt1={mainUser.dt1}
                  dt2={mainUser.dt2}
                  dt3={mainUser.dt3}
                >
                </ProfileCard>
              </Grid>
              {/* SETTINGS CARD */}
              <Grid item md={9}>
                <SettingsCard
                  expose={(v) => setText(v)}
                  firstName={mainUser.firstName}
                  lastName={mainUser.lastName}
                  midName={mainUser.midName}
                  phone={mainUser.phone}
                  email={mainUser.email}
                  pass={mainUser.pass}
                  gender={mainUser.gender}
                ></SettingsCard>
              </Grid>
            </Grid>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};

export default ProfileIndex