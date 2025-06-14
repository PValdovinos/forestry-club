import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { EditHours } from "../components/EditHours";
import { BASE_URL } from "../projectVariables.js";
import ContainerNav from "../components/ContainerNav";
import useMemberData from "../hooks/useMemberData.js";
import { translateMemberData } from "../helpers/translateData.js";

function AdminMemberView() {
    const { email } = useParams();
    const {
        memberData,
        displayName,
        memberEmail,
        setMemberData
    } = useMemberData(email);
    
    const rowData = memberData;

    const columns = [
        { field: 'date', headerName: 'Date', minWidth: 250, flex: 1 },
        { field: 'hours', headerName: 'Hours', minWidth: 250, flex: 1 },
        { field: 'status', headerName: 'Status', minWidth: 250, flex: 1 },
        { 
            field: 'edit',
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
            <EditHours
                entryId={params.row.id}
                email={email}
                memberData={memberData}
                setMemberData={setMemberData}
            />
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
                <Typography variant="h4" component="h1">
                    {displayName} <span className="text-secondary">({memberEmail})</span>
                </Typography>
            </Box>   
            <ContainerNav 
                items={[
                    { label: "Back", to: "/adminClub" },
                    { label: "Hours Pending", to: "/adminReview" },
                    { label: "Home", to: "/" }
                ]}
            />
            <DataGrid rows={translateMemberData(rowData) ?? []} columns={columns} />
        </Box>
    );
}

export default AdminMemberView;
