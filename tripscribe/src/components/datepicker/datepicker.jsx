import React, { useState,useRef } from "react";
import DatePicker from "react-datepicker";
import "./datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const DatePick = ({ selected, startDate, endDate, onChange, dateFormat, placeholderText }) => {
  const inputRef = useRef(null);

  // Function to handle icon click
  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input element to open the date picker
    }
  };
  return(
    <div className="date-picker-component">
      <DatePicker
        className="date-picker"
        selected={selected}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        isClearable
        selectsRange
        customInput={<input ref={inputRef} />} // Use custom input to attach ref
     />
     <FontAwesomeIcon 
        icon={faCalendar}
        className="calendar-icon"
        onClick={handleIconClick}/>
    </div>  
  );
};

export default DatePick;