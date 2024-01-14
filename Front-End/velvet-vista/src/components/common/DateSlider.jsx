import React, { useState } from "react";
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range";

const DateSlider = ({onDateChange, onFilterChange}) => {
    const[dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key:"selection"
    })

    const handleSelect = (ranges) =>{
        setDateRange(ranges.selection)
        onDateChange(ranges.selection.startDate, ranges.selection.endDate)
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
    }
  return (
    <div>DateSlider</div>
  )
}

export default DateSlider
