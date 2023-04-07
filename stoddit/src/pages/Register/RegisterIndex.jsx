import './RegisterIndex.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function RegisterPage() {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState("");
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      anger: createColor('#F40B27'),
      apple: createColor('#5DBA40'),
      steelBlue: createColor('#5C76B7'),
      violet: createColor('#BC00A3'),
      purpleBlue: createColor('#4353FF'),
    },
  });

  const onChangeUsername = (e) => {
    const userName = e.target.value;
    setUserName(userName);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    if (confirmPassword !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    };
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  
  const handleSubmit = async e => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (!password || !username ||!phone) {
      setLoading(false);
    } else {
      setLoading(true);
    };

    await registerUser({
      username,
      password,
      phone
    });

    setRegistered(true);
  };

  const navToLogin = () => {
    navigate("/login");
  };
  

  return (
    <>
    <div style={{display: 'flex'}}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 30,
            }}
            >
            {registered &&
              <div className="registeredBox">
                <Typography component="h1" variant="h5">
                You are Registered!
                </Typography>
                <Button
                  sx={{ 
                    mt: 3, 
                    mb: 2, 
                  }}
                  variant="contained"
                  style={{borderRadius: 12}}
                  onClick={navToLogin}
                  color='purpleBlue'
                >
                  Login to Stoddit
                </Button>
              </div>
            }
            {!registered && 
              <div className="registeringBox">
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign Up For Stoddit
                </Typography>
                <div style={{paddingTop:'12px', paddingBottom:'25px'}}>
                  <Divider variant="middle" style={{width: '500px'}}/>
                </div>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    style={{
                      width: '500px',
                      borderRadius: '12px'
                    }}
                    margin="normal"
                    required
                    error={username.length !== 0 && username.length < 8}
                    helperText={username.length !== 0 && username.length < 8 ? 'Less than 8 characters!' : ' '}
                    id="email"
                    label="Username"
                    InputLabelProps={{ shrink: true }}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={onChangeUsername}
                    value={username}
                  />
                  <TextField
                    margin="normal"
                    required
                    error={password.length !== 0 && password.length < 8}
                    helperText={password.length !== 0 && password.length < 8 ? 'Less than 8 characters!' : ' '}
                    fullWidth
                    name="password"
                    label="Password"
                    InputLabelProps={{ shrink: true }}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onChangePassword}
                    value={password}
                  />
                  <TextField
                    margin="normal"
                    required
                    error={!passwordMatch && confirmPassword.length > 0}
                    helperText={!passwordMatch && confirmPassword.length > 0 ? 'Password does not match' : ' '}
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    InputLabelProps={{ shrink: true }}
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    onChange={onChangeConfirmPassword}
                  />
                  <TextField
                    label="Phone"
                    type="text"
                    inputProps={{ 
                      inputMode: 'numeric', 
                      pattern: '/^-?\d+(?:\.\d+)?$/g'
                    }} 
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    inputProps={{maxLength: 10}}
                    value={phone} 
                    onChange={onChangePhone}
                  >
                  </TextField>
                  <Button
                    type="submit"
                    style={{borderRadius: 12}}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!passwordMatch}
                    color='purpleBlue'
                  >
                    Register
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/login" variant="body2">
                        {"Already have an account?"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            }
          </Box>
        </Container>
        </ThemeProvider>
      </div>
    </>
  );
};
export default RegisterPage
