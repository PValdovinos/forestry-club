import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: { 
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, 
            width: 200, 
        },
    },
};

export default function BasicSelect({ id, data, sx = {} }) {
    const [memberName, setMemberName] = React.useState('');

    const handleChange = (event) => {
        setMemberName(event.target.value);
    };

    return (
        <Box sx={sx}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Name</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id={id}
                    value={memberName}
                    label="Name"
                    onChange={handleChange}
                    MenuProps={MenuProps}
                >
                    {data.map(name => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

BasicSelect.propTypes = {
    id : PropTypes.number.isRequired,
    data : PropTypes.isRequired
}