import { NavLink } from "react-router-dom"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StyledContainer from "./../components/StyledContainer"
import Button from '@mui/material/Button'
import Logout from './../components/Logout'

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
                </Box>
            </StyledContainer>
        </Box>
    );
}

export default Home;