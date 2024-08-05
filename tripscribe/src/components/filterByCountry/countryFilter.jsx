import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CountryFilter = ({ countries,selectedCountry, onFilterChange }) => {
    return (
        <Autocomplete
            options={countries}
            getOptionLabel={(option) => option}
            value={selectedCountry || null}
            onChange={(_, value) => onFilterChange(value)}
            renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
            style={{ marginBottom: '20px' }}
        />
    );
};

export default CountryFilter;