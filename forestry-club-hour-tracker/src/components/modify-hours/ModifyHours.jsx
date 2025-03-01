import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import './modify-hours.css'
import {useState, Fragment} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {HorizontalRule} from "@mui/icons-material";

/**
 * Modal component for logging hours volunteered and date for event
 * @param isAdmin
 *      is user triggering this component an admin account who needs to view the hour request, or is it a student
 *      creating a new one
 */
export const ModifyHours = ({isAdmin}) => {
    // dialog handlers
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //date state and default values
    const today = dayjs()
    const [dateValue, setDateValue] = useState(today)
    const [startValue, setStartValue] = useState(today.set('hour', today.hour() - 1))
    const [endValue, setEndValue] = useState(today)

    return (
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event) => {
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Log Event Hours</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the date and hours worked.
                    </DialogContentText>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className={'date-wrapper'}>
                            <DatePicker
                                disabled={isAdmin}
                                label="Date"
                                value={dateValue}
                                onChange={(newValue) => setDateValue(newValue)}
                            />
                        </div>
                        <div className={'time-wrapper'}>
                                <TimePicker
                                    disabled={isAdmin}
                                    label={"Start Time"}
                                    disableFuture
                                    value={startValue}
                                    onChange={(newValue) => setStartValue(newValue)}/>
                            <HorizontalRule/>
                                <TimePicker
                                    disabled={isAdmin}
                                    label={"End Time"}
                                    disableFuture
                                    value={endValue}
                                    onChange={(newValue) => setEndValue(newValue)}/>
                        </div>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}