import React, { useState } from 'react';
import { updateImage } from '../services/user.service';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Badge from "@mui/material/Badge";
import { IconButton } from '@mui/material';
import Button from "@mui/material/Button";

function ProfileCard(props) {

  const [image, setImage] = useState('');
  const [showSave, setShowSave] = useState(false);
  console.log('props', props);
  // STYLES
  const styles = {
    details: {
      padding: "1rem",
      borderTop: "1px solid #e1e1e1"
    },
    value: {
      padding: "1rem 2rem",
      borderTop: "1px solid #e1e1e1",
      color: "#899499"
    }
  };

  const uploadPhoto = (e) => {
    // console.log(e.target.files);
    setImage(e.target.files[0]);
    setShowSave(true);
    console.log('save', showSave);
  };

  const handlePhoto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log('image', image);
    formData.append('image', image);
    updateImage(formData);
    setShowSave(false);
  };

  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* CARD HEADER START */}
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          {/* PROFILE PHOTO */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <>
              {!showSave ?
                <IconButton 
                  aria-label="upload picture" 
                  component="label"
                >
                  <input 
                    hidden accept="image/*, .heic" 
                    type="file"
                    name="file"
                    onChange={uploadPhoto}
                  />
                  <EditIcon
                    containerElement='photos'
                    sx={{
                      border: "5px solid white",
                      backgroundColor: "#ff558f",
                      borderRadius: "50%",
                      padding: ".2rem",
                      width: 35,
                      height: 35,
                      cursor: 'pointer'
                    }}
                  />
                </IconButton>
                :
                <IconButton
                  type="submit"
                >
                  <CheckIcon
                    containerElement='save'
                    sx={{
                      border: "5px solid white",
                      backgroundColor: "#ff558f",
                      borderRadius: "50%",
                      padding: ".2rem",
                      width: 35,
                      height: 35,
                      cursor: 'pointer'
                    }}
                    onClick={handlePhoto}
                  >
                  </CheckIcon>
                </IconButton>
              }
              </>
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src={props.userImg[props.sub]}
            ></Avatar>
          </Badge>

          {/* DESCRIPTION */}
          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary">{props.sub}</Typography>
        </Grid>
        {/* CARD HEADER END */}

        {/* DETAILS */}
        <Grid container>
          <Grid item xs={6}>
            <Typography style={styles.details}>Detail 1</Typography>
            <Typography style={styles.details}>Detail 2</Typography>
            <Typography style={styles.details}>Detail 3</Typography>
          </Grid>
          {/* VALUES */}
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography style={styles.value}>{props.dt1}</Typography>
            <Typography style={styles.value}>{props.dt2}</Typography>
            <Typography style={styles.value}>{props.dt3}</Typography>
          </Grid>
        </Grid>

        {/* BUTTON */}
        <Grid item style={styles.details} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            sx={{ width: "99%", p: 1, my: 2 }}
          >
            View Public Profile
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileCard