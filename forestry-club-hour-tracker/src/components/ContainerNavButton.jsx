import { Button } from '@mui/material'
import { styled } from '@mui/system'

export const ContainerNavButton = styled(Button)(() => ({
    backgroundColor: 'var(--color-button-bg)',
    color: 'black',
    textTransform: 'capitalize',
    borderRadius: '5px 5px 0 0',
    margin: '0 5px 0 0',
    border: 'solid 1px var(--color-button-bg)',

    '&:hover': {
        backgroundColor: 'var(--color-button-hover-bg)',
        borderColor: 'var(--color-button-hover-border)',
    },
}));