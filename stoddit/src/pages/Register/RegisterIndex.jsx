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
  const theme = createTheme();
 
  const required = (value) => {
    if (!value) {
      return (
        <div>
          This field is required!
        </div>
      );
    }
  };

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
      console.log("invalid");
      setLoading(false);
    } else {
      setLoading(true);
    }

    await registerUser({
      username,
      password,
      phone
    });

    setRegistered(true);
  };

  const navigate = useNavigate();

  const navToLogin = () => {
    navigate("/login");
  }
  
  return (
    <>
    {registered && 
    <div>
      <h3>registered!</h3>
      <button onClick={navToLogin}>
        Login Now
      </button>
    </div>
    }
    {!registered &&
    <>
    <form onSubmit={handleSubmit}>
      <div className="form-inner">
        <h2>Registration</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            onChange={onChangeUsername} 
            value={username}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            name="password" 
            id="password"
            onChange={onChangePassword} 
            value={password}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password:</label>
          <input 
            type="password" 
            name="confirmPassword" 
            id="confirmPassword"
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input 
            type="text" 
            name="phone" 
            id="phone"
            onChange={onChangePhone} 
            value={phone}
            maxLength="10"
            validations={[required]}
          />
        </div>
        <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Register</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        <button onClick={navToLogin} className="accountExists">Already have an account? Sign in!</button>
      </div>
    </form>

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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              error={username.length !== 0 && username.length < 8}
              helperText={username.length !== 0 && username.length < 8 ? 'Less than 8 characters!' : ' '}
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChangeUsername}
            />
            <TextField
              margin="normal"
              required
              error={password.length !== 0 && password.length < 8}
              helperText={password.length !== 0 && password.length < 8 ? 'Less than 8 characters!' : ' '}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePassword}
            />
            <TextField
              margin="normal"
              required
              error={!passwordMatch && confirmPassword.length > 0}
              helperText={!passwordMatch && confirmPassword.length > 0 ? 'Password does not match' : ' '}
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeConfirmPassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!passwordMatch}
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
        </Box>
      </Container>
      </ThemeProvider>
    </>
    }
    </>
  )
}

export default RegisterPage