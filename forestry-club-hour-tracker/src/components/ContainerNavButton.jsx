import { Button } from '@mui/material'
import { styled } from '@mui/system'

export const ContainerNavButton = styled(Button)(({ theme }) => ({
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.palette.secondary.main,
    marginRight: '0.5rem',

    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
}));