import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../AuthContext.jsx";
import ContainerNav from './../components/ContainerNav';
import useMemberHours from "./../hooks/useMemberHours.js";

function translateData(data) {
    if (!data) return [];
    return data.map(entry => ({
        id: entry.submission_id,
        date: entry.date_worked ? new Date(entry.date_worked).toLocaleDateString() : "N/A",
        hours: entry.hours ?? 0,
        points: (entry.hours ?? 0) * 100
    }));
}

const MemberHoursView = () => {
    const { user } = useAuth();
    const { memberHours, loading, error } = useMemberHours(user);

    const columns = [
        { field: 'date', headerName: 'Date', flex: 1, minWidth: 200 },
        { field: 'hours', headerName: 'Hours', flex: 1, minWidth: 200 },
        { field: 'points', headerName: 'Points', flex: 1, minWidth: 200 }
    ]

    if (!user || loading) {
         return <Typography>Loading your hours...</Typography>
    }
    if (error) {
        return <Typography color="error">Failed to load hours.</Typography>
    }

    return (
        <Box>
            <Typography variant="h4">Welcome, {user.fname} {user.lname}</Typography>
            <ContainerNav items={[{ label: "Back", to: "/" }]} />
            <DataGrid
                rows={translateData(memberHours)}
                columns={columns}
            />
        </Box>
    )
}

export default MemberHoursView