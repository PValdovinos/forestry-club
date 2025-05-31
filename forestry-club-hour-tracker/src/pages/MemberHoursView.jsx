import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "../projectVariables.js";
import { useAuth } from "../AuthContext.jsx";
import ContainerNav from './../components/ContainerNav'

function translateData(data) {
    if (data) {
        return data.map(entry => ({
            id: entry.submission_id,
            date: new Date(entry.date_worked).toLocaleDateString(),
            hours: entry.hours,
            points: entry.hours * 100
        }));
    } else {
        return [];
    }
}

const MemberHoursView = () => {
    const { user } = useAuth()
    const [memberHours, setMemberHours] = useState(null);

    useEffect(() => {
        if (!user) return;

        fetch(`${BASE_URL}/api/hours.php?email=${user.email}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setMemberHours)
            .catch(err => console.error("Failed to load member hours:", err));
    }, [user]);

    const columns = [
        { field: 'date', headerName: 'Date', flex: 1, minWidth: 200 },
        { field: 'hours', headerName: 'Hours', flex: 1, minWidth: 200 },
        { field: 'points', headerName: 'Points', flex: 1, minWidth: 200 }
    ];

    if (!user) {
        return (
            <Typography>Loading user data...</Typography>
        )
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h4" component="h1">
                    Welcome, {user.fname} {user.lname}
                </Typography>
                <Typography variant="h6" component="h4" className="text-secondary">
                    Your Volunteer Hours and Points
                </Typography>
            </Box>
            <ContainerNav 
                items={[
                    { label: "Back", to: "/" }
                ]}
            />
            <DataGrid rows={translateData(memberHours)} columns={columns} />
        </Box>
    );
};

export default MemberHoursView;