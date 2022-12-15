import { useCookies } from 'react-cookie';
import { Container, Typography } from '@mui/material';

export default function Home() {
    const [cookies] = useCookies(['user']);
    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                {'Hello ' + cookies.user.name}
            </Typography>
        </Container>
    )
}