import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField"
import Typography from '@mui/material/Typography'
import { BASE_URL } from "../projectVariables.js"
import Container from "./../components/Container"
import { useAuth } from "../AuthContext"

function LoginPortal() { 
    const navigate = useNavigate();
    const { login } = useAuth()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

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
                navigate('/')
            } else {
                setError('Email and/or password is incorrect. Please try again.')
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        }
    }

    const handleClick = () => navigate('signup')

    return (
        <Container component="form" noValidate autoComplete="off">
            <Typography variant="h6">Log In</Typography>

            <TextField
                id="email"
                label="Email"
                variant="filled"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                fullWidth
                margin="normal"
                type="password"
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button onClick={sendData}>Submit</Button>
            <Button onClick={handleClick}>Sign-up</Button>
        </Container>
    )
}

export default LoginPortal