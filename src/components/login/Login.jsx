import * as React from 'react';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userActions, { validateUser } from '../../redux/actions/userActions';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const theme = createTheme();

function Login(props) {

  const history = useNavigate();
  const dispatch = useDispatch();


  const [logUser, setLogUser] = useState({
    email: '',
    password: ''
  })

  const readInput = (e) => {
    const value = e.target.value
    const prop = e.target.name
    setLogUser({
      ...logUser,
      [prop]: value
    })
  }

  const ValidateInfo = async () => {
    const userExists = await dispatch(validateUser(logUser));
    if (userExists) {
      history('/home');
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
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
              Acceso a la plataforma
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={readInput}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={readInput}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar contraseña"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => ValidateInfo()}
              >
                Acceder
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"No tenes cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
// const mapStateToProps = state => {
//   return {
//     userLogged: state.userR.userLogged
//   }
// }

// const mapDispatchToProps = {
//   logUser: userActions.logIn
// }

export default Login