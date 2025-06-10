import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../projectVariables.js";
import ContainerNav from "./../components/ContainerNav";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import MemberStatusControls from "../components/MemberStatusControls";

function translateData(data) {
    if (data) {
        return data.map(element => ({
            id: element.user_id,
            email: element.email,
            name: `${element.fname} ${element.lname}`,
            hours: element.hours ? element.hours : 0,
            points: element.hours * 100,
            active: element.user_flags === 1 || element.user_flags === 3, 
            user_flags: element.user_flags,  
            isAdmin: element.user_flags === 2 || element.user_flags === 3
        }));
    } else {
        return [];
    }
}

const AdminClubView = () => {
    const [memberData, setMemberData] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/users.php`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(result => setMemberData(result));
    }, []);

    const rowData = translateData(memberData);

    const ActivityStatusCell = (params) => {
        const currentEmail = params.row.email;
        const currentStatus = params.row.active;

        const handleToggleStatus = () => {
            const newStatus = !currentStatus;

            fetch(`${BASE_URL}/api/update_status.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: currentEmail,
                    active: newStatus ? 1 : 0
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setMemberData(prev =>
                        prev.map(m =>
                            m.email === currentEmail
                                ? { ...m, active: newStatus ? 1 : 0 }
                                : m
                        )
                    );
                } else {
                    alert("Failed to update member status.");
                }
            })
            .catch(err => {
                console.error("Status update error:", err);
                alert("Error updating status.");
            });
        };
        
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MemberStatusControls
                    isActive={currentStatus}
                    onToggle={handleToggleStatus}
                />
            </Box>
        );
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 250,
            flex: 2,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>
                        {params.row.name} <span className="text-secondary">({params.row.email})</span>
                    </Typography>
                    <Tooltip title="View Hours">
                        <NavLink to={"/adminClub/" + params.row.email}>
                            <VisibilityIcon sx={{ color: 'black', fontSize: 20 }} />
                        </NavLink>
                    </Tooltip>
                </Box>
            )
        },
        {
            field: 'hours',
            headerName: 'Total Hours',
            minWidth: 175,
            flex: 1
        },
        {
            field: 'points',
            headerName: 'Points',
            minWidth: 175,
            flex: 1
        },
        {
            field: 'activityStatus',
            headerName: 'Activity Status',
            renderCell: ActivityStatusCell,
            sortable: false,
            filterable: false,
            resizable: false,
            hideable: false,
            disableExport: true,
            disableColumnMenu: true,
            minWidth: 150,
            flex: 1
        }
    ];

    return (
        <Box>
            <Typography variant="h4" component="h1">Members</Typography>
            <ContainerNav
                items={[
                    { label: "Hours Pending", to: "/adminReview" },
                    { label: "Back", to: "/" }
                ]}
            />
            <DataGrid rows={rowData} columns={columns} />
        </Box>
    );
};

export default AdminClubView;