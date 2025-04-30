import './hours-box.css';
import { DateTimePicker } from './DateTimePicker.jsx';
import {jsDateToSqlDate} from './date-format';
import {useState, useEffect, Fragment} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from "dayjs";
import PropTypes from 'prop-types';

/**
 * Modal component for logging hours volunteered and date for event
 * @param isAdmin
 *      is user triggering this component an admin account who needs to view the hour request, or is it a student
 *      creating a new one
 */
export const EditHours = ({ memberName, entryId }) => {
    // dialog handlers
    const [open, setOpen] = useState(false);
    const handleClickOpen = async () => {
        setOpen(true);
        await fetch("http://localhost:3002/api/hours/"+entryId, {
            method: "get",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        })
        .then( response => response.json())
        .then( content => content.data[0])
        .then( result => {
            setStartValue(dayjs(result["time_in"]))
            setEndValue(dayjs(result["time_out"]))
            setDateValue(dayjs(result["time_in"]))
        })};
    const handleClose = () => {
        setOpen(false);
    };

    //date state and default values
    const today = dayjs();
    const [dateValue, setDateValue] = useState(today)//
    const [startValue, setStartValue] = useState(today.set('hour', today.hour() - 1))//
    const [endValue, setEndValue] = useState(today)//
    
    async function sendData() {
        const editMemberHours = {
            update_id: entryId,
            time_in: jsDateToSqlDate(startValue.$d),
            time_out: jsDateToSqlDate(endValue.$d),
        }
        const url = "http://localhost:3002/api/hours/" + entryId;
        const results = await fetch(url, {
            method: "put",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(editMemberHours)
        })
        return results;
    }

    return (
        <Fragment>
            <Button className="btn-outlined" variant="outlined" onClick={handleClickOpen}>
                Review
            </Button>
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
    entryId : PropTypes.number.isRequired
}