import { useState, useEffect } from "react" 
import { NavLink } from "react-router-dom"
import { BASE_URL } from "../projectVariables.js"
import ContainerNav from "./../components/ContainerNav"
import VisibilityIcon from '@mui/icons-material/Visibility'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import Tooltip from "@mui/material/Tooltip"
import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"
import Typography from "@mui/material/Typography"
import { translateClubMembers } from "../helpers/translateData.js"

const AdminClubView = () => {
    const [memberData, setMemberData] = useState(null)

    useEffect(() => {fetch(`${BASE_URL}/api/users.php`, {
        method: "get",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        }
    })
    .then( response => response.json())
    .then( result => setMemberData(result))}, [])

    const rowData = memberData
    const columns= [
        {field: 'name', headerName: 'Name', renderCell: spanEmail, minWidth: 250, flex: 2},
        {field: 'hours', headerName: 'Total Hours', minWidth: 175,  flex: 1},
        {field: 'points', headerName: 'Points', minWidth: 175,  flex: 1},
        {
            field: 'none', 
            headerName: 'Actions', 
            renderCell: ViewButton, 
            sortable: false, 
            filterable: false, 
            resizable: false, 
            hideable: false, 
            disableExport: true, 
            disableColumnMenu: true, 
            minWidth: 125,
            flex: 1
        }
    ]

    function spanEmail(params) {
        return (
            <p>
                {params.row.name}  <span className="text-secondary">({params.row.email})</span>
            </p>
        )
    }

    function ViewButton(params) {
        return (
            <div>
                <Tooltip title="View Hours">
                    <NavLink to={"/adminClub/" + params.row.email}>
                        <VisibilityIcon
                            sx={{
                                color: 'black',
                                mr: 2,
                            }}
                        >
                        </VisibilityIcon>
                    </NavLink>
                </Tooltip>
                <Tooltip title="Delete Member">
                    <PersonRemoveIcon 
                        sx={{
                            color: 'red'
                        }}
                    >
                    </PersonRemoveIcon>
                </Tooltip>
            </div>
        )
    }

    return (
        <Box>
            <Typography variant="h4" component="h1">Members</Typography>
            <ContainerNav 
                items={[
                    { label: "Back", to: "/" },
                    { label: "Hours Pending", to: "/adminReview" }
                ]}
            />
            <DataGrid rows={translateClubMembers(rowData)} columns={columns}/>
        </Box>
    )
}

export default AdminClubView