import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AddHours } from "../components/AddHours"
import MemberSelect from "../components/MemberSelect"
import Container from "./../components/Container"
import Logout from './../components/Logout'

function MemberHome() { 
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
            <Typography variant="h4" component="h1">Forestry Club Hour Tracker</Typography>
            <Logout />

            {/* Member Section */}
            <Container
                sx={{
                    mt: 3,
                }}
            >
                <Typography variant="h5" component="h4">Member Access</Typography>
                <AddHours />
                <MemberSelect />
            </Container>
        </Box>
    );
}

export default MemberHome