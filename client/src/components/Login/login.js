import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Typography, createTheme, ThemeProvider, Paper } from '@mui/material';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
// import { createTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const axios = require("axios");

const mdTheme = createTheme();
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  // const location = useLocation();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function updateForm(value){
    return setForm((prev) => {
        return { ...prev, ...value};
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      header: {
          "Content-Type": "application/json",
      },
    };
    
    await axios.post(
      "http://localhost:5000/login/",
      { 
        email: form.email,
        password: form.password,
      },
      config
    )
    .then(function (response){
      console.log(response)
      localStorage.setItem("authToken", response.data.token);
      navigate('/dashboard',{state:{user: response.data.user}});
      
    })
    .catch(function (error) {
      console.log(error);
    })
  };
  
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '83.6vh',
                    overflow: 'auto'
                }}
            >
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
              sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value})}
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
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value})}
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
              <Grid item xs sx={{textAlign:"center", pb: 2}}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                <Link onClick={() => {navigate("/register")}} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
              <Divider>or you can sign in with</Divider>
            <Grid container sx={{ pt: 3,justifyContent: 'center'}} spacing={2}>

            <Grid item>
              <Link >
              <GoogleIcon/>
              </Link>
            </Grid>
            <Grid item>
              <Link>
              <FacebookIcon />
              </Link>
            </Grid>
            </Grid>
          </Box>
          </Paper>
        </Container>
        </Box>
      </ThemeProvider>
  );
}