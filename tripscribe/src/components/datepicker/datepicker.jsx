import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import "./datepicker.css";

export const DatePick = ({ selected, startDate, endDate, onChange, dateFormat, placeholderText }) => {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); 
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
        customInput={<input ref={inputRef} />} 
     />
     <FontAwesomeIcon 
        icon={faCalendar}
        className="calendar-icon"
        onClick={handleIconClick}/>
    </div>  
  );
};
