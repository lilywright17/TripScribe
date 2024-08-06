import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./cityFilter.css"

const CityFilter = ({ cities,selectedCity, onFilterChange }) => {
    return (
        <div className="city-filter">
        <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            value={selectedCity || null}
            onChange={(_, value) => onFilterChange(value)}
            renderInput={(params) => (
                <TextField {...params} 
                    label="City" 
                    fullWidth
                    />)}
        />
        </div>
    );
};

export default CityFilter;