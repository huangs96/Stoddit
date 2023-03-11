import React from 'react'
import { TextField, MenuItem, Typography, Grid, Button } from '@mui/material';
import './ProfileIndex.css';

function ProfileIndex() {

  return (
    <>
      <form className='accountFormContainer' noValidate autoComplete="off">
        <div className='accountForm'>
          <Typography className='accountTitleText'>
            {" "}
            ACCOUNT INFORMATION{" "}
          </Typography>
          <TextField
            id="standard-required"
            label="First Name"
            style={{
              width: "97%"
            }}
          />
          <TextField
            label="Last Name"
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
          <TextField
            id="standard-required"
            label="Address"
            style={{
              width: "97%"
            }}
          />
        </div>
      </form>
      <Button className="submitButton" color="primary">
        Save Changes
      </Button>
    </>
  );
};

export default ProfileIndex