import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Constants from "../shared/constants";
import { Auth } from 'aws-amplify';

export default function Confirm() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const { user } = JSON.parse(localStorage.getItem("user") || '');
        const username = user.username;
        const code = data.get('code') as string;
        Auth.confirmSignUp(username, code)
            .then(() => navigate('/login'))
            .catch((error: Error) => {
                setError(error.message);
            });
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
                    Verify your email
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        name="code"
                        required
                        fullWidth
                        id="code"
                        label="Verification code"
                        autoFocus
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
                </Box>
            </Box>
        </Container>
    );
}