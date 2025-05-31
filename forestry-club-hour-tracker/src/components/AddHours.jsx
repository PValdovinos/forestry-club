import './hours-box.css';
import { useState, useEffect, Fragment } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BASE_URL } from '../projectVariables.js';
import dayjs from "dayjs";
import { DateTimePicker } from './DateTimePicker.jsx';
import FlatSolidButton from "./FlatSolidButton";
import { useAuth } from '../AuthContext.jsx';

export const AddHours = () => {
    const { user } = useAuth()

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Date state
    let now = dayjs().subtract(7, 'hour');
    const minutes = now.minute();
    const roundedMinutes = Math.round(minutes / 5) * 5;
    now = now.minute(roundedMinutes).second(0);

    const [dateValue, setDateValue] = useState(now);
    const [startValue, setStartValue] = useState(now.subtract(1, 'hour'));
    const [endValue, setEndValue] = useState(now);

    async function sendData() {
        if (!user) {
            alert("You must be logged in to submit hours.");
            return;
        }

        const newMemberHours = {
            time_in: dayjs(startValue.$d).format("HH:mm"),
            time_out: dayjs(endValue.$d).format("HH:mm"),
            date: dayjs(dateValue.$d).format("YYYY-MM-DD"),
            user_id: user.user_id,
            under_review: true,
            accepted: false
        };

        try {
            await fetch(`${BASE_URL}/api/hours.php`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMemberHours)
            });

            handleClose();
        } catch (error) {
            console.error("Failed to submit hours:", error);
        }
    }

    return (
        <Fragment>
            <FlatSolidButton onClick={handleClickOpen}>
                Submit Hours
            </FlatSolidButton>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (e) => {
                            e.preventDefault();
                            sendData();
                        }
                    },
                }}
            >
                <DialogTitle>Log Event Hours</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the date and hours worked.
                    </DialogContentText>
                    <DateTimePicker 
                        defaultDateValue={dateValue} 
                        defaultStartTimeValue={startValue} 
                        defaultEndTimeValue={endValue}
                        setDateValue={setDateValue}
                        setStartValue={setStartValue}
                        setEndValue={setEndValue} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={sendData}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};