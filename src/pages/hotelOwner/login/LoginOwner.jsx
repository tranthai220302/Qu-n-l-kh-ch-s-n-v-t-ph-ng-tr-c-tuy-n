import * as React from 'react';
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
import Navbar from '../../../compoments/customer/navbar/Navbar';
import Header from '../../../compoments/customer/header/Header';
import MailList from '../../../compoments/customer/mailList/MailList';
import Footer from '../../../compoments/customer/footer/Footer';
import newRequest from '../../../ults/newRequest';
import LinearWithValueLabel from '../../../compoments/linear/Linear';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        HaruBooking
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginOwner() {
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
      newRequest.post('/auth/loginOwner', {
        email : data.get('email'),
        password : data.get('password')
      }).then((res)=>{
          setIsLoading(false)
          setError(false)
          setUser(res.data)
          localStorage.setItem('currentUser', JSON.stringify(res.data))
          navigate('/hotelAdmin')
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
      <Navbar />
      <Header type={'list'}/>
      {isLoading && <LinearWithValueLabel isLoading={isLoading}/>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lưu tài khoản"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registerOwner" variant="body2">
                  {"Bạn chưa có tài khoản? Đăng ký"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <MailList />
      <Footer/>
    </ThemeProvider>
  );
}