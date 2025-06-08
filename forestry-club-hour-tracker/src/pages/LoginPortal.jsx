import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router"
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from "@mui/material/TextField"
import Typography from '@mui/material/Typography'
import { BASE_URL } from "../projectVariables.js"
import StyledContainer from "../components/StyledContainer.jsx"
import { useAuth } from "../AuthContext"

function LoginPortal() { 
    const navigate = useNavigate();
    const { login } = useAuth()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState(" ")
    const [ isValid,  setIsValid ] = useState(true)

    async function sendData () {
        try {
            const response = await fetch(`${BASE_URL}/api/auth.php`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({action: 'login', email, password })
            })

            const data = await response.json()

            if (data.success) {
                login(data.user)
                setEmail("")
                setPassword("")
                navigate('/')
            } else {
                setError('Email and/or password is incorrect. Please try again.')
                setIsValid(false)
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        }
    }

    return (
        <Container maxWidth='sm'>
            <Typography variant="h4" component="h1">Log-in</Typography>
            <StyledContainer 
                component="form" 
                noValidate 
                autoComplete="off"
                sx={{
                    mt: 2,
                    mb: 1
                }}
            >
                <TextField
                    id="email"
                    label="Email"
                    variant="filled"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={!isValid}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="filled"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={!isValid}
                    fullWidth
                    margin="normal"
                    type="password"
                />

                {error && <Typography color="error">{error}</Typography>}

                <Button onClick={sendData} variant='contained'>Submit</Button>
            </StyledContainer>
            <Typography sx={{ textAlign: 'center' }} variant="body1">
                Don't have an account? <Link to='/signup'>Sign up</Link>
            </Typography>
        </Container>
    )
}

export default LoginPortal