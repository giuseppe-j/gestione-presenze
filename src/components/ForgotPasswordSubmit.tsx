import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Constants from "../shared/constants";
import { Auth } from 'aws-amplify';

interface IFormInputs {
    email: string,
    password: string,
    code: string,
};

const schema = yup.object({
    email: yup.string().required('Email is required').email('Email not valid'),
    password: yup.string().required('Password is required').min(8, 'Password should have minimum 8 characters'),
    code: yup.string().required('Code is required')
})

export default function ForgotPasswordSubmit() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: IFormInputs) => {
        Auth.forgotPasswordSubmit(data.email, data.code, data.password)
            .then(data => console.log(data))
            .then(() => navigate('/login'))
            .catch((error: Error) => {
                setError(error.message);
            });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        error={!!errors.email}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        helperText={errors.email?.message}
                        {...register("email")}
                    />
                    <TextField
                        margin="normal"
                        error={!!errors.password}
                        required
                        fullWidth
                        label="New password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="code"
                        label="Verification code"
                        autoFocus
                        helperText={errors.code?.message}
                        {...register("code")}
                    />
                    {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {Constants.CONFIRM}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}