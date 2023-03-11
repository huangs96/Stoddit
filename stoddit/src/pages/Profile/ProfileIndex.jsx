import React, { useState } from 'react'
import { TextField, MenuItem, Typography, Grid, Button } from '@mui/material';
import './ProfileIndex.css';

function ProfileIndex() {

  const [text, setText] = useState("");

  const mainUser = {
    // DEFAULT VALUES
    title: "CEO of Apple",
    dt1: 32,
    dt2: 40,
    dt3: 50,
    firstName: { text },
    lastName: "Doe",
    midName: "Baker",
    gender: "female",
    phone: "932-555-4247",
    email: "janedoe@gmail.com",
    pass: "password123"
  };

  const fullName = `${mainUser.firstName} ${mainUser.lastName}`;

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline>
        {/* BACKGROUND */}
        <Grid container direction="column" sx={{ overflowX: "hidden" }}>
          <Grid item xs={12} md={6}>
            <img
              alt="avatar"
              style={{
                width: "100vw",
                height: "35vh",
                objectFit: "cover",
                objectPosition: "50% 50%",
                position: "relative"
              }}
              src="https://iris2.gettimely.com/images/default-cover-image.jpg"
            />
          </Grid>

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
              ></ProfileCard>
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item md={9}>
              <SettingsCard
                expose={(v: string) => setText(v)}
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
        </Grid>
      </CssBaseline>
    </ThemeProvider>
      
      {/* <form className='accountFormContainer' noValidate autoComplete="off">
        <div className='accountForm'>
          <Typography className='accountTitleText'>
            {" "}
            ACCOUNT INFORMATION{" "}
          </Typography>
          <TextField
            id="standard-required"
            label="Username"
            style={{
              width: "97%"
            }}
          />
          <TextField
            label="Password"
            type="password"
            style={{
              width: "97%"
            }}
          />
          <TextField
            id="standard-required"
            label="Phone Number"
            fullWidth={true}
            type="number"
            style={{
              width: "97%"
            }}
          />
        </div>
      </form>
      <Button className="submitButton" color="primary">
        Save Changes
      </Button> */}
    </>
  );
};

export default ProfileIndex