import { Button } from '@mui/material'
import { styled } from '@mui/system'

export const SolidButton = styled(Button)(() => ({
    backgroundColor: '#cad6b4',
    color: 'black',
    textTransform: 'capitalize',
    borderRadius: 5,

    '&:hover': {
        backgroundColor: '#cad6b4',
    },
}));