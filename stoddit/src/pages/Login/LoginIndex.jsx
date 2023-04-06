import React, { useState, useRef } from 'react';
import { authUser } from '../../services/auth.service';
import { useNavigate } from "react-router-dom";
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
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuthedUser } from '../../services/user.service';

function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectInput, setIncorrectInput] = useState({
    shortUsername: '',
    shortPassword: '',
    status: ''
  });
  const [user, setUser] = useState('');
  const form = useRef();
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
    setUsername(userName);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  
  const validateFields = () => {
    let error = false;
    if (username.length !== 0 && username.length < 5) {
      error = true;
      setIncorrectInput(state => ({...state, shortUsername: 'Username must contain at least 5 characters.'}));
    } else {
      error = false;
      setIncorrectInput(state => ({...state, shortUsername: ''}));
    };

    if (password.length !== 0 && password.length < 5) {
      error = true;
      console.log('Password too short');
      setIncorrectInput(state => ({...state, shortPassword: 'Password must be atleast 5 characters.'}));
    } else {
      error = false;
      setIncorrectInput(state => ({...state, shortPassword: ''}));
    }
    return error;
  };

  const postLoginMessage = () => {
    let postLoginMsg;
    if (incorrectInput.status === 'incorrect') {
      postLoginMsg = <Alert severity="error">Username and/or Password Incorrect - Please Try Again!</Alert>
    } else if (incorrectInput.status === 'correct') {
      postLoginMsg = <Alert severity="success">Login Successful - You are being Redirected!</Alert>
    };
    console.log(postLoginMsg);
    return postLoginMsg;
  };

  console.log(incorrectInput);
  postLoginMessage();

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateFields()) {
      return;
    };
    
    try {

      let token = await authUser({
        username,
        password
      });

      if (token) {
        console.log('here2');
        setIncorrectInput(state => ({...state, status: 'correct'}));
        const data = await getAuthedUser();
        setUser(data);
        localStorage.setItem('UserID', JSON.stringify(data.user.id));
        localStorage.setItem('Username', JSON.stringify(data.user.username));
        localStorage.setItem('authed', true);
        navigate('/home');
      };
    } catch (err) {
      console.log(err)
      setIncorrectInput(state => ({...state, status: 'incorrect'}));
      setUsername('');
      setPassword('');
    };
  };

  return (
    <>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign into Stoddit
          </Typography>
          <div style={{paddingTop:'12px', paddingBottom:'25px'}}>
            <Divider variant="middle" style={{width: '650px'}}/>
          </div>
          <Box component="form" onSubmit={handleSubmit} ref={form} noValidate sx={{ mt: 1 }}>
            <TextField
              style={{
                width: '650px',
                borderRadius: '12px'
              }}
              margin="normal"
              required
              id="email"
              label="Username"
              InputLabelProps={{ shrink: true }}
              name="email"
              autoFocus
              onChange={onChangeUsername}
              error={Boolean(incorrectInput?.shortUsername)}
              helperText={incorrectInput?.shortUsername}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              InputLabelProps={{ shrink: true }}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePassword}
              error={Boolean(incorrectInput?.shortPassword)}
              helperText={incorrectInput?.shortPassword}
            />
            {postLoginMessage()}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </div>
            <Button
              style={{borderRadius: 12}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='purpleBlue'
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </ThemeProvider>
    </>
  )
}


export default LoginPage