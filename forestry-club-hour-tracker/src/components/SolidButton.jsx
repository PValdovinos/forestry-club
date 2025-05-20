import { Button } from '@mui/material'
import { styled } from '@mui/system'

const SolidButton = styled(Button)(() => ({
    backgroundColor: 'var(--color-solid-btn-bg)',
    color: 'white',
    textTransform: 'capitalize',
    borderRadius: 5,

    '&:hover': {
        backgroundColor: 'var(--color-solid-btn-hover-bg)',
    },
}));

export default SolidButton;