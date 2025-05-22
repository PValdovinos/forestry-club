import Box from "@mui/material/Box"
import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField"
import Typography from '@mui/material/Typography'
import { BASE_URL } from "../base_url.js"
import ContainerNav from './ContainerNav'
import Container from "./../components/Container"

// TODO Re-implement error messages
async function submit(event){
    event.preventDefault();

    const result = await sendData();

    function createErrorMessage() {
        const username = document.getElementById("username");
        const errorMessage = document.createElement("span");
        errorMessage.innerText = "Username taken.";
        errorMessage.id = "errorMessage"
        errorMessage.style.color = "red";
        username.parentElement.parentElement.appendChild(errorMessage);
    }

    if(result.status == 201)
        document.location.href="/";
    else{
        if(document.getElementById("errorMessage"))
        {
            document.getElementById("errorMessage").remove();
            setTimeout(() => {
                //fake refresh for UX
                createErrorMessage();
            }, 50);
        }
        else {
            //createErrorMessag();
        }
    }  
}

async function sendData() {
    const username = document.getElementById("username").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const newMember = {
        username,
        fname,
        lname,
        user_flags: 0
    }

    const results = await fetch(`${BASE_URL}/api/users.php`, {
        method: "post",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newMember)
    })
    return results;
}

export default function AddMember() { 
    return (
        <Box
            sx={{
                width: {
                    xs: '90%',
                    sm: '70%',
                    md: '50%',
                },
                margin: 'auto',
            }}
        >
            <Typography variant="h4" component="h1">Add Member</Typography>
            <ContainerNav 
                items={[
                    { label: "Back", to: "/" }
                ]}
            />
            <Container
                component="form"
                sx={{
                    mt: 0
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="username" label="Username" variant="filled" required />
                <TextField id="fname" label="First Name" variant="filled" required />
                <TextField id="lname" label="Last Name" variant="filled" required />
                
                <Button variant='contained' onClick={submit}>
                    Submit
                </Button>
            </Container>
        </Box>
    );
}