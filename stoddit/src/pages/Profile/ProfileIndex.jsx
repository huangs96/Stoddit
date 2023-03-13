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
        const data = await getUserByID(userID);
        console.log('data', data[0]);
        const userData = data[0];
        setMainUser({
          // DEFAULT VALUES
          title: userData.username,
          dt1: 32,
          dt2: 40,
          dt3: 50,
          firstName: userData.first_name,
          lastName: userData.last_name,
          phone: userData.phone,
          email: userData.email
        });
      };
      fetchUserSettingData()
      .catch(console.error);
    };
    return () => {
      isLoaded = false;
    };
  }, []);

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
                  phone={mainUser.phone}
                ></SettingsCard>
              </Grid>
            </Grid>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};

export default ProfileIndex