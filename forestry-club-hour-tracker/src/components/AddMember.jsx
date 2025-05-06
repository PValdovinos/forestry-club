import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from '@mui/material';
import TableNav from './TableNav';

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

    const results = await fetch("https://wh1437951.ispot.cc/api/users.php", {
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
            <h2>Add Member</h2>
            <br />
            <TableNav 
                items={[
                    { label: "Back", to: "/" }
                ]}
            />
            <Box
                component="form"
                sx={{ 
                    boxShadow: 1,
                    p: 7,
                    '& > :not(style)': { 
                        m: 2, width: '25ch' 
                    } 
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField id="username" label="Username" variant="outlined" />
                </div>
                <div>
                    <TextField id="fname" label="First Name" variant="outlined" />
                </div>
                <div>
                    <TextField id="lname" label="Last Name" variant="outlined" />
                </div>
                <div>
                    <Button variant='outlined' onClick={submit} className='btn-outlined'>
                        Submit
                    </Button>
                </div>
            </Box>
        </>
    );
}