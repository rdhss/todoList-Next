'use client';


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Todo List
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const router = useRouter()

  const [dataRegister, setDataRegister] = useState({
    email: '',
    password: '',
    username: '',
    name: ''
  })
  
  const [errorRegister, setErrorRegister] = useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/signup`, {
      username: dataRegister.username,
      email: dataRegister.email,
      name: dataRegister.name,
      password: dataRegister.password
    })
      .then((res) => { router.push('/login') })
      .catch((err) => { setErrorRegister(err.response.data.errors) })
  };

  const user = localStorage.getItem('token')


  useEffect(() => {
    if (user) {
      return redirect("/");
    }
  }, [user]);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpapers.com/images/hd/cute-desktop-organizer-october-to-do-list-7b0rwkvxpvavpcaw.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => { setDataRegister({ ...dataRegister, username: e.target.value }) }}
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="Username"
                autoFocus
              />
              <TextField
                onChange={(e) => { setDataRegister({ ...dataRegister, name: e.target.value }) }}
                margin="normal"
                required
                fullWidth
                id="Name"
                label="Name"
                name="Name"
                autoComplete="Username"
                autoFocus
              />
              <TextField
                onChange={(e) => { setDataRegister({ ...dataRegister, email: e.target.value }) }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={(e) => { setDataRegister({ ...dataRegister, password: e.target.value }) }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errorRegister &&
                <Typography align='center' color="error">
                  {errorRegister.email || errorRegister.password || errorRegister.username}
                </Typography>
              }
              <Button
                disabled={!dataRegister.email || !dataRegister.password || !dataRegister.name || !dataRegister.username}
                type="submit"
                fullWidth
                color='secondary'
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className='bg-[#9c27b0]/80 hover:bg-[#9c27b0]'
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link className='cursor-pointer' onClick={() => router.push('/login')} href variant="body2">
                    {"already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}