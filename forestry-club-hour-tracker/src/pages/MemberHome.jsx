import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { AddHours } from "../components/AddHours"
import StyledContainer from "./../components/StyledContainer"
import Logout from './../components/Logout'
import { useNavigate } from 'react-router'
import FlatSolidButton from '../components/FlatSolidButton'

function MemberHome() { 
    const navigate = useNavigate()
    const handleClick = () => navigate('/hours')

    return (
        <Container maxWidth='md'>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant="h4" component="h1">Forestry Club Hour Tracker</Typography>
                <Logout />
            </Box>

            <StyledContainer
                sx={{
                    mt: 3,
                }}
            >
                <Typography variant="h5" component="h4">Member Access</Typography>
                <AddHours />
                <FlatSolidButton onClick={handleClick}>View Hours</FlatSolidButton>
            </StyledContainer>
        </Container>
    );
}

export default MemberHome