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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuthedUser } from '../../services/user.service';

function LoginPage() {

  const form = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectInput, setIncorrectInput] = useState({
    shortUsername: '',
    shortPassword: '',
    status: ''
  });
  const [user, setUser] = useState('');
  const theme = createTheme();

  const navigate = useNavigate();

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} ref={form} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
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
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePassword}
              error={Boolean(incorrectInput?.shortPassword)}
              helperText={incorrectInput?.shortPassword}
            />
            {postLoginMessage()}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
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