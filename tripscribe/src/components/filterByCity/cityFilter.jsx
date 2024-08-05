import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CityFilter = ({ cities,selectedCity, onFilterChange }) => {
    return (
        <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            value={selectedCity || null}
            onChange={(_, value) => onFilterChange(value)}
            renderInput={(params) => <TextField {...params} label="City/Town" variant="outlined" />}
            style={{ marginBottom: '20px' }}
        />
    );
};

export default CityFilter;