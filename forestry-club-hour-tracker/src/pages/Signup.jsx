import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField"
import Typography from '@mui/material/Typography'
import { BASE_URL, USER_ACTIVATED } from "../projectVariables.js"
import StyledContainer from "../components/StyledContainer"
import ContainerNav from '../components/ContainerNav'
import Container from '@mui/material/Container'
import Toast from '../components/Toast'

export default function AddMember() {
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastSeverity, setToastSeverity] = useState("success")

    async function sendData() {
        const email = document.getElementById("email").value;
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const password = document.getElementById('password').value;

        const newMember = {
            email,
            fname,
            lname,
            user_flags: USER_ACTIVATED,
            password
        }

        try {
            let results = await fetch(`${BASE_URL}/api/users.php`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newMember)
            })

            results = await results.json()

            if (results.success) {
                setToastMessage(results.message)
                setToastSeverity("success")
                setToastOpen(true)
            } else {
                setToastMessage(results.message || "Failed to create account.")
                setToastSeverity("error")
                setToastOpen(true)
            }
        } catch (error) {
            setToastMessage("Network error. Please try again.")
            setToastSeverity("error")
            setToastOpen(true)
        }
    }

    return (
        <Container maxWidth='sm'>
            <Typography variant="h4" component="h1">Sign-up</Typography>
            <ContainerNav 
                items={[
                    { label: "Back", to: "/" }
                ]}
            />
            <StyledContainer
                component="form"
                sx={{
                    mt: 0
                }}
                autoComplete="off"
            >
                <TextField id="fname" label="First Name" variant="filled" required />
                <TextField id="lname" label="Last Name" variant="filled" required />
                <TextField id="email" label="Email" variant="filled" required />
                <TextField id="password" label="Password" variant="filled" required type="password" />
                
                <Button onClick={sendData} variant='contained'>Submit</Button>
            </StyledContainer>

            <Toast 
                open={toastOpen}
                onClose={() => setToastOpen(false)}
                message={toastMessage}
                severity={toastSeverity}
            />
        </Container>
    )
}