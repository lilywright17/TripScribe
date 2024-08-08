import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import "./countryFilter.css"

export const Filter = ({ choice,selectedOption, onFilterChange, label }) => {
    return (
        <div className="filter">
        <Autocomplete
            options={choice}
            getOptionLabel={(option) => option}
            value={selectedOption || null}
            onChange={(_, value) => onFilterChange(value)}
            renderInput={(params) => (
                <TextField {...params} 
                    label={label} 
                    variant="outlined" 
                    />
                )}
        />
        </div>
    );
};