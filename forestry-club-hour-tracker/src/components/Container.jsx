import Box from '@mui/material/Box'
import { styled } from '@mui/system'

const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius * 2,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
}))

export default Container