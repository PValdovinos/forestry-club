import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField"
import Typography from '@mui/material/Typography'
import { BASE_URL } from "../projectVariables.js"
import Container from "../components/Container.jsx"
import { USER_ACTIVATED } from "../projectVariables.js"

export default function AddMember() { 
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

        const results = await fetch(`${BASE_URL}/api/users.php`, {
            method: "post",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newMember)
        })

        return results
    }

    return (
        <Container
            component="form"
            noValidate
            autoComplete="off"
        >
            <Typography>Sign-up</Typography>
            <TextField id="fname" label="First Name" variant="filled" required />
            <TextField id="lname" label="Last Name" variant="filled" required />
            <TextField id="email" label="Email" variant="filled" required />
            <TextField id="password" label="Password" variant="filled" required />

            <Button onClick={sendData}>Submit</Button>
        </Container>
    )
}