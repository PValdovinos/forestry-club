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
import { USER_ACTIVATED, ADMIN_ACTIVATED, ADMIN_DEACTIVATED } from "../projectVariables.js";

function translateData(data) {
    if (data) {
        return data.map(element => ({
            id: element.user_id,
            email: element.email,
            name: `${element.fname} ${element.lname}`,
            hours: element.hours ? element.hours : 0,
            points: element.hours*100,
            isAdmin: (Number.parseInt(element.user_flags) === ADMIN_ACTIVATED || Number.parseInt(element.user_flags) === ADMIN_DEACTIVATED)?"Admin":"User", 
            user_flags: element.user_flags,
            active: (Number.parseInt(element.user_flags) === USER_ACTIVATED || Number.parseInt(element.user_flags) === ADMIN_ACTIVATED)?"Active":"Inactive"
            
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
        .then(result => {
            setMemberData(translateData(result));
        });
    }, []);

    const ActivityStatusCell = (params) => {
        const currentUser = params.row.id;
        const currentStatus = Number.parseInt(params.row.user_flags);
        const currentStatusBool = currentStatus%2;
        const handleToggleStatus = async () => {
            
            let newStatus = ((currentStatus)%2 === 0)?(currentStatus+1):(currentStatus-1);

            const body = { id: currentUser, user_flags: newStatus};

            try {
                await fetch(`${BASE_URL}/api/users.php`, {
                    method: "Put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                .then( response => response.json())
                .then( result => {
                    if(result.success) {
                        setMemberData((prevRows) =>
                            prevRows.map((row) =>
                                row.id === currentUser ? {
                                    ...row,
                                    user_flags: newStatus,
                                    isAdmin:(Number.parseInt(newStatus) === ADMIN_ACTIVATED || Number.parseInt(newStatus) === ADMIN_DEACTIVATED)?"Admin":"User",
                                    active: (Number.parseInt(newStatus) === USER_ACTIVATED || Number.parseInt(newStatus) === ADMIN_ACTIVATED)?"Active":"Inactive"
                                } : row
                            )
                        );
                    }
                    else {

                    }
                })
            } catch (err) {
                console.log("error")
            }
        };
        
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MemberStatusControls
                    isActive={currentStatusBool}
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
            field: 'isAdmin',
            headerName: 'Admin status',
            minWidth: 175,
            flex: 1
        },
        {
            field: 'active',
            headerName: 'Active status',
            minWidth: 175,
            type: 'string',
            flex: 1
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
    if(memberData === null) {
        return(
        <Box>
            <Typography variant="h4" component="h1">Members</Typography>
            <ContainerNav
                items={[
                    { label: "Hours Pending", to: "/adminReview" },
                    { label: "Back", to: "/" }
                ]}
            />
            <div>Loading...</div>      
        </Box>)
    }
    else{
        return (
            <Box>
                <Typography variant="h4" component="h1">Members</Typography>
                <ContainerNav
                    items={[
                        { label: "Hours Pending", to: "/adminReview" },
                        { label: "Back", to: "/" }
                    ]}
                />
                <DataGrid rows={memberData} columns={columns} />            
            </Box>
        );
    }
};

export default AdminClubView;