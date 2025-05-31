import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AddHours } from "../components/AddHours"
import Container from "./../components/Container"
import Logout from './../components/Logout'
import { useNavigate } from 'react-router'
import FlatSolidButton from '../components/FlatSolidButton'

function MemberHome() { 
    const navigate = useNavigate()

    const handleClick = () => navigate('/hours')

    return (
        <Box
            sx={{
                width: {
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                },
                margin: 'auto',
            }}
        >
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant="h4" component="h1">Forestry Club Hour Tracker</Typography>
                <Logout />
            </Box>

            <Container
                sx={{
                    mt: 3,
                }}
            >
                <Typography variant="h5" component="h4">Member Access</Typography>
                <AddHours />
                <FlatSolidButton onClick={handleClick}>View Hours</FlatSolidButton>
            </Container>
        </Box>
    );
}

export default MemberHome