import './hours-box.css';
import { DateTimePicker } from './DateTimePicker.jsx';
import {useState, Fragment} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from "dayjs";
import PropTypes from 'prop-types';
import { BASE_URL } from '../projectVariables.js';
import CreateIcon from '@mui/icons-material/Create';
import { NativeSelect, Tooltip } from '@mui/material';

/**
 * Modal component for logging hours volunteered and date for event
 * @param isAdmin
 *      is user triggering this component an admin account who needs to view the hour request, or is it a student
 *      creating a new one
 */
export const EditHours = ({ memberName, entryId, memberData, setMemberData }) => {
    // dialog handlers
    const [open, setOpen] = useState(false);
    const handleClickOpen = async () => {
        await fetch(`${BASE_URL}/api/hours.php?id=${entryId}`, {
            method: "get",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        })
        .then( response => response.json())
        .then( data => data[0])
        .then( result => {
            setStartValue(dayjs("0000-00-00 " + result["time_in"]))
            setEndValue(dayjs("0000-00-00 "+ result["time_out"]))
            setDateValue(dayjs(result["date"]))
            if(result["under_review"] == 1) {
                setStatus(0);
            }
            else {
                if(result["accepted"] == 1) {
                    setStatus(1);
                }
                else {
                    setStatus(2);
                }
            }
            setOpen(true);
        })};
    const handleClose = () => {
        setOpen(false);
    };

    //date state and default values
    const today = dayjs();
    const [dateValue, setDateValue] = useState(today)//
    const [startValue, setStartValue] = useState(today.set('hour', today.hour() - 1))//
    const [endValue, setEndValue] = useState(today)//
    const [status, setStatus] = useState(0);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    
    async function sendData() {
        let under_review = 0
        let accepted = 0
        switch(status) {
                case '2':
                    under_review = 0
                    accepted = 0
                    break
                case '1':
                    under_review = 0
                    accepted = 1
                    break
                default:
                    under_review = 1
                    accepted = 0
                    break
            }
        const editMemberHours = {
            update_id: entryId,
            time_in: dayjs(startValue.$d).format("HH:mm"),
            time_out: dayjs(endValue.$d).format("HH:mm"),
            date: dayjs(dateValue.$d).format("YYYY-MM-DD"),
            accepted: accepted,
            under_review: under_review
        }
        const url = `${BASE_URL}/api/hours.php?id=${entryId}`;
        const results = await fetch(url, {
            method: "put",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(editMemberHours)
        })
        setMemberData(memberData.map(entry => entry.submission_id === entryId ? { ...entry, accepted: accepted, under_review:under_review} : entry))
        handleClose()
        return results
    }

    return (
        <Fragment>
            <Tooltip title="Edit Entry">
                <CreateIcon 
                    onClick={handleClickOpen}
                    sx={{
                        color: 'black'
                    }}
                >
                </CreateIcon>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: () => {
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Log Event Hours</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the date and hours {memberName} worked.
                    </DialogContentText>
                    <DateTimePicker 
                        defaultDateValue={dateValue}
                        defaultStartTimeValue={startValue}
                        defaultEndTimeValue={endValue}
                        setDateValue={setDateValue}
                        setStartValue={setStartValue}
                        setEndValue={setEndValue}
                         />
                </DialogContent>
                <NativeSelect
                    defaultValue={0}
                    value={status}
                    onChange={handleStatusChange}
                    sx={{ maxWidth: 500, mx: 'auto', display: 'block', padding: 1, border: 1, borderColor: 'darkgray', borderRadius: 1 }}
                    inputProps={{
                        name: 'status',
                        id: 'hour-status'
                    }}
                >
                    <option value={0}>Pending</option>
                    <option value={1}>Accepted</option>
                    <option value={2}>Rejected</option>
                </NativeSelect>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={sendData}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
EditHours.propTypes = {
    memberName : PropTypes.string.isRequired,
    entryId : PropTypes.number.isRequired,
    memberData : PropTypes.array.isRequired,
    setMemberData : PropTypes.func.isRequired
}