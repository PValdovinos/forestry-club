import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {HorizontalRule} from "@mui/icons-material";
import PropTypes from 'prop-types';

export const DateTimePicker = ({ defaultDateValue, defaultStartTimeValue, defaultEndTimeValue, setDateValue, setStartValue, setEndValue }) => {
    console.log(defaultStartTimeValue, defaultEndTimeValue, defaultDateValue)
    return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={'date-wrapper'}>
            <DatePicker
                label="Date"
                value={defaultDateValue}
                onChange={(newValue) => setDateValue(newValue)}
            />
        </div>
        <div className={'time-wrapper'}>
            <TimePicker
                label={"Start Time"}
                defaultValue={defaultStartTimeValue}
                onChange={(newValue) => setStartValue(newValue)}/>
            <HorizontalRule/>
            <TimePicker
                label={"End Time"}
                defaultValue={defaultEndTimeValue}
                onChange={(newValue) => setEndValue(newValue)}/>
        </div>
    </LocalizationProvider>)
}
DateTimePicker.propTypes = {
    defaultDateValue : PropTypes.object.isRequired,
    defaultStartTimeValue : PropTypes.object.isRequired,
    defaultEndTimeValue : PropTypes.object.isRequired,
    setDateValue : PropTypes.func.isRequired,
    setStartValue : PropTypes.func.isRequired,
    setEndValue : PropTypes.func.isRequired
}