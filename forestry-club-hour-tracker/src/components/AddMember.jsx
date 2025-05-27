import { useState, useEffect, Fragment } from "react"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import TextField from "@mui/material/TextField"
import Typography from '@mui/material/Typography'
import { BASE_URL } from "../base_url.js"
import Container from "./../components/Container"



export default function AddMember() { 
    // dialog handlers
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
        .then(handleClose())
        return results
    }

    return (
        <Fragment>
            <Button onClick={handleClickOpen}>
                Add Member
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Container
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Typography>Add Member</Typography>
                    <TextField id="username" label="Username" variant="filled" required />
                    <TextField id="fname" label="First Name" variant="filled" required />
                    <TextField id="lname" label="Last Name" variant="filled" required />
                    
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={sendData}>Submit</Button>
                    </DialogActions>
                </Container>
            </Dialog>
        </Fragment>
    )
}