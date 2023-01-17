import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Constants from "../shared/constants";
import { forgotPassword } from '../supabaseClient';

interface IFormInputs {
  email: string,
};

const schema = yup.object({
  email: yup.string().required('Email is required').email('Email not valid'),
})

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (formData: IFormInputs) => {
    const { email } = formData;
    const { data, error } = await forgotPassword(email);
    if (error) {
      setError(error.message);
    } else {
      navigate('/forgot-password-submit');
    }
  }
  return (
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
          {Constants.FORGOT_PASSWORD}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            error={!!errors.email}
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            helperText={errors.email?.message}
            {...register("email")}
          />
          {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {Constants.FORGOT_PASSWORD}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                {"Back to Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}