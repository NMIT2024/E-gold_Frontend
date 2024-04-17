import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateRangeComponent = ({selectedDateRange}) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        selectedDateRange(dateRange)
    }, [dateRange])
    return (
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            placeholderText='Select Date Range'
            className='form-control'
            endDate={endDate}
            onChange={(update) => {
                setDateRange(update);
            }}
            isClearable={true}
        />
    );
};
export default DateRangeComponent