import React, { useEffect, useState } from 'react';
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
import HomeIcon from '@mui/icons-material/Home';
import newRequest from '../../../ults/newRequest';
import { faL } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import LinearWithValueLabel from '../../../compoments/linear/Linear';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
let Chatra = require('@chatra/chatra')
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
const defaultTheme = createTheme();

export default function LoginCustomer() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [user, setUser] = useState(null);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    newRequest.post('/auth/login', {
      email : data.get('email'),
      password : data.get('password')
    }).then((res)=>{
        setIsLoading(false)
        setError(false)
        setUser(res.data)
        localStorage.setItem('currentUser', JSON.stringify(res.data))
        if(res.data.idRole == 1){
          navigate('/')
        }else{
          navigate('/admin')
        }
    }).catch((error)=>{
      setIsLoading(false);
      setError(error.response.data)
      setState({
        open: true,
        vertical: 'top',
        horizontal: 'right',
      })
    })
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={error}
        key={vertical + horizontal}
      />
      <Grid container component="main" style={{ height: '100vh', position: 'relative' }}>
      <div  style={{position: 'absolute', top : '0', width :'100%'}}>
      {isLoading && <LinearWithValueLabel isLoading={isLoading}/>}
      </div>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: 'url(https://static-images.vnncdn.net/files/publish/2023/5/24/348559308-3784185538484345-527454361338992790-n-546.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            style={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding : '20% 30px 30px 30px'
            }}
          >
            <Avatar style={{ m: 1, backgroundColor: '#9c27b0' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} style={{ mt: 1 }}>
              <TextField
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
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ marginTop: 25, marginBottom: 20}}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    <HomeIcon/>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Bạn chưa có tài khoản ? Đăng ký"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright style={{ marginTop: 50 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
