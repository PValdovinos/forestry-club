import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function AddMember() { 
    return (
        <>
            <h2>Add new member</h2>
            <br />
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField id="Username" label="Username" variant="outlined" />
                </div>
                <div>
                    <TextField id="fname" label="fname" variant="outlined" />
                </div>
                <div>
                    <TextField id="lname" label="lname" variant="outlined" />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </Box>
        </>
    );
}