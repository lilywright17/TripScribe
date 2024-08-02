import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CityFilter = ({ cities, onFilterChange }) => {
    return (
        <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            onChange={(_, value) => onFilterChange(value)}
            renderInput={(params) => <TextField {...params} label="Filter by City" variant="outlined" />}
            style={{ marginBottom: '20px' }}
        />
    );
};

export default CityFilter;