import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CountryFilter = ({ countries, onFilterChange }) => {
    return (
        <Autocomplete
            options={countries}
            getOptionLabel={(option) => option}
            onChange={(_, value) => onFilterChange(value)}
            renderInput={(params) => <TextField {...params} label="Filter by Country" variant="outlined" />}
            style={{ marginBottom: '20px' }}
        />
    );
};

export default CountryFilter;