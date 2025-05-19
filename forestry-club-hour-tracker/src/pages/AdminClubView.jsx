import { useState, useEffect } from "react"; 
import { NavLink } from "react-router-dom";
import TableNav from "../components/TableNav";
import AdminTable from "../components/Table";
import { BASE_URL } from "../base_url.js";
import ContainerNav from "./../components/ContainerNav";
import AdminTable from "./../components/Table";
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Tooltip } from "@mui/material";

function translateData(data) {
    if(data) {
        return data.map(element => ({
            "id": element.user_id,
            "username": element.username,
            "name": element.fname + " " + element.lname,
            "hours": element.hours ? element.hours : 0,
            "points": element.hours * 100
        }));
    }
    else {
        return []
    }
}

const AdminClubView = () => {
    const [memberData, setMemberData] = useState(null);

    useEffect(() => {fetch(`${BASE_URL}/api/users.php`, {
        method: "get",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        }
    })
    .then( response => response.json())
    .then( result => setMemberData(result))}, []);

    const rowData = memberData;
    const HEADER_CLASS_NAME = 'table-header';
    
    const columns= [
        {field: 'name', headerName: 'Name', headerClassName: HEADER_CLASS_NAME, renderCell: spanUsername, flex: 1},
        {field: 'hours', headerName: 'Total Hours', headerClassName: HEADER_CLASS_NAME, flex: 1},
        {field: 'points', headerName: 'Points', headerClassName: HEADER_CLASS_NAME, flex: 1},
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
            headerClassName: HEADER_CLASS_NAME,
            flex: 0.5, 
        }
    ];

    function spanUsername(params) {
        return (
            <p>
                {params.row.name}  
                <span className="text-secondary">
                    ({params.row.username})
                </span>
            </p>
        )
    }

    function ViewButton(params) {
        return (
            <div>
                <Tooltip title="View Hours">
                    <NavLink to={"/adminClub/" + params.row.username}>
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
                    <NavLink>
                        <PersonRemoveIcon 
                            sx={{
                                color: 'red'
                            }}
                        >
                        </PersonRemoveIcon>
                    </NavLink>
                </Tooltip>
            </div>
        )
    }

    return (
        <>
            <h1 className="page-title">Members</h1>
            <ContainerNav 
                items={[
                    { label: "Hours Pending", to: "/adminReview" },
                    { label: "Logout", to: "/" }
                ]}
            />
            <AdminTable rows={translateData(rowData)} columns={columns}/>
        </>
    );
}

export default AdminClubView;