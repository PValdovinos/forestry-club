import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import { useAuth } from './../AuthContext'

function Logout() {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <Button onClick={handleLogout} variant='contained'>Logout</Button>
    )
}

export default Logout