import { useState, useEffect } from "react"; 
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { EditHours } from "../components/EditHours";
import { BASE_URL } from "../base_url.js";
import ContainerNav from "../components/ContainerNav";
import MemberStatusControls from './../components/MemberStatusControls';

function translateData(data) {
    if (data) {
        return data.map(element => {
            let userStatus = "Accepted";
            if (!element.accepted) {
                userStatus = "Rejected";
            }
            if (element.under_review) {
                userStatus = "Pending";
            }
            return {
                id: element.submission_id,
                date: element.date_worked,
                hours: element.hours ? element.hours : 0,
                status: userStatus
            };
        });
    } else {
        return [];
    }
}

function AdminMemberView() {
    const params = useParams();
    const [memberData, setMemberData] = useState([]);
    const email = params.email;
    const [displayName, setDisplayName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [isActive, setIsActive] = useState(true); 

    useEffect(() => {
        fetch(`${BASE_URL}/api/hours.php?email=${email}`, {
            method: "get",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(content => {
            setMemberData(content);
            if (content.length > 0) {
                const first = content[0];
                setDisplayName(`${first.fname} ${first.lname}`);
                setMemberEmail(first.email);
                setIsActive(first.active === 1);
            }
        });
    }, [email]);

    function handleToggleStatus() {
        const newStatus = !isActive;

        fetch(`${BASE_URL}/api/update_status.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: memberEmail,
                active: newStatus ? 1 : 0
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setIsActive(newStatus);
            } else {
                alert("Failed to update member status.");
            }
        })
        .catch(err => {
            console.error("Status update error:", err);
            alert("Error updating status.");
        });
    }

    const rowData = memberData;

    const columns = [
        { field: 'date', headerName: 'Date', minWidth: 250, flex: 1 },
        { field: 'hours', headerName: 'Hours', minWidth: 250, flex: 1 },
        { field: 'status', headerName: 'Status', minWidth: 250, flex: 1 },
        { 
            field: 'none',
            headerName: 'Edit',
            renderCell: EditButton,
            sortable: false,
            filterable: false,
            resizable: false,
            hideable: false,
            disableExport: true,
            disableColumnMenu: true,
            minWidth: 100,
            flex: 0.5
        }  
    ];

    function EditButton(params) {
        return (
            <EditHours entryId={params.row.id} email={email} memberData={memberData} setMemberData={setMemberData}/>
        );
    }

    return (
        <Box>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h4" component="h1">{displayName} <span className="text-secondary">({memberEmail})</span></Typography>
                <MemberStatusControls isActive={isActive} onToggle={handleToggleStatus} />
            </Box>   
            <ContainerNav 
                items={[
                    { label: "Back", to: "/adminClub" },
                    { label: "Hours Pending", to: "/adminReview" },
                    { label: "Logout", to: "/" }
                ]}
            />
            <DataGrid rows={translateData(rowData)} columns={columns}/>
        </Box>
    );
}

export default AdminMemberView;
