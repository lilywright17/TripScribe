import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./countryFilter.css"

export const CountryFilter = ({ countries,selectedCountry, onFilterChange }) => {
    return (
        <div className="country-filter">
        <Autocomplete
            options={countries}
            getOptionLabel={(option) => option}
            value={selectedCountry || null}
            onChange={(_, value) => onFilterChange(value)}
            renderInput={(params) => (
                <TextField {...params} 
                    label="Country" 
                    variant="outlined" 
                    />)}
        />
        </div>
    );
};
