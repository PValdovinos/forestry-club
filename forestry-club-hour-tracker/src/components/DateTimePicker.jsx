import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {HorizontalRule} from "@mui/icons-material";

export const DateTimePicker = ({ dateValue, startValue, endValue, setDateValue, setStartValue, setEndValue }) => {
    return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={'date-wrapper'}>
            <DatePicker
                label="Date"
                value={dateValue}
                onChange={(newValue) => setDateValue(newValue)}
            />
        </div>
        <div className={'time-wrapper'}>
            <TimePicker
                label={"Start Time"}
                disableFuture
                value={startValue}
                onChange={(newValue) => setStartValue(newValue)}/>
            <HorizontalRule/>
            <TimePicker
                label={"End Time"}
                disableFuture
                value={endValue}
                onChange={(newValue) => setEndValue(newValue)}/>
        </div>
    </LocalizationProvider>)
}