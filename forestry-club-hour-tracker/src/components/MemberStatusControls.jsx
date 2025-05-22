import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatusContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
}))

const StatusText = styled('span')(({ theme, isActive }) => ({
    fontWeight: 'bold',
    color: isActive ? theme.palette.success.main : theme.palette.error.main,
    marginLeft: theme.spacing(1),
}))

function MemberStatusControls({ isActive, onToggle }) {
    return (
        <StatusContainer>
            <Typography variant='h6'>
                Status:
                <StatusText isActive={isActive}>
                    {isActive ? 'Active' : 'Inactive'}
                </StatusText>
            </Typography>
            <Button 
                variant="contained" 
                color={isActive ? 'warning' : 'success'}
                onClick={onToggle}
            >
                Set as {isActive ? 'Inactive' : 'Active'}
            </Button>
        </StatusContainer>
    );
}

export default MemberStatusControls