import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { BASE_URL } from "../base_url.js";
import ContainerNav from './ContainerNav';
import SolidButton from "./SolidButton";

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
        <>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent:'center'
                }}
            >
                <br />
                <Box
                    sx={{ 
                        minWidth: 390,
                        margin: 2,
                    }}
                >
                    <h1 className="page-title">Add Member</h1>
                    <ContainerNav 
                        items={[
                            { label: "Back", to: "/" }
                        ]}
                    />
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            padding: 4,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="username" label="Username" variant="outlined" required />
                        <TextField id="fname" label="First Name" variant="outlined" required />
                        <TextField id="lname" label="Last Name" variant="outlined" required />
                        
                        <SolidButton onClick={submit}>
                            Submit
                        </SolidButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
}