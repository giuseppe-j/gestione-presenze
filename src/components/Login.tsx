import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Link, Snackbar, SnackbarOrigin, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Constants from "../shared/constants";
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
interface IFormInputs {
  email: string,
  password: string,
};
interface User {
  email: string,
  family_name: string,
  name: string
}

const schema = yup.object({
  email: yup.string().required('Email is required').email('Email not valid'),
  password: yup.string().required('Password is required'),
})
export interface Toast extends SnackbarOrigin {
  open: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [logged, setLogged] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<Toast>({
    open: false,
    vertical: 'top',
    horizontal: 'left'
  });
  const { vertical, horizontal, open } = toast;
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (logged === false) {
      return
    }
    const navigateToHome = setTimeout(() => {
      navigate('/home')
    }, 3000)
    return () => clearTimeout(navigateToHome)
  }, [logged])

  const onSubmit = (data: IFormInputs) => {
    Auth.signIn(data.email, data.password).then((user) => {
      setCookie('user', JSON.stringify(user.attributes), { path: '/' });
      setToast({ ...toast, open: true });
      setLogged(true);
    }).catch((error: Error) => {
      setError(error.message);
    });
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast({ ...toast, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          You are successfully logged in
        </Alert>
      </Snackbar>
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
          {Constants.LOGIN}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            error={!!errors.password}
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            helperText={errors.password?.message}
            {...register("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {Constants.LOGIN}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
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
  );
}