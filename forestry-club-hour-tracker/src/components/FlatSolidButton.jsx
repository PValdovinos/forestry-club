import Button from '@mui/material/Button'
import { styled } from '@mui/system'

const FlatSolidButton = styled(Button)(({ theme, ownerState }) => ({
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,

    '&:hover': {
        boxShadow: 'none',
        backgroundColor: theme.palette.secondary.dark,
    },
}));

FlatSolidButton.defaultProps = {
    variant: 'contained',
};

export default FlatSolidButton