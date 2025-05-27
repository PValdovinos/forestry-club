import { NavLink } from "react-router-dom"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AddHours } from "../components/AddHours"
import MemberSelect from "../components/MemberSelect"
import Container from "./../components/Container"
import Button from '@mui/material/Button'
import AddMember from "../components/AddMember"

function Home() { 
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

            {/* Admin Section */}
            <Container
                sx={{
                    mt: 3,
                }}
            >
                <Typography variant="h5" component="h4">Admin Access</Typography>
                <Box display="flex" gap={2}>
                    <Button
                        variant="contained"
                        component={NavLink}
                        to='adminClub'
                        sx={{ flex: 1 }}
                    >
                        View Members
                    </Button>
                    <AddMember />
                </Box>
            </Container>
        </Box>
    );
}

export default Home;