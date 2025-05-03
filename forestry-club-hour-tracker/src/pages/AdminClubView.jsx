import { useState, useEffect } from "react"; 
import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";
import TableNav from "../components/TableNav";
import AdminTable from "../components/Table";

function translateData(data) {
    if(data){
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

    useEffect(() => {fetch("https://wh1437951.ispot.cc/api/users.php", {
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
        {field: 'name', headerName: 'Name', headerClassName: HEADER_CLASS_NAME, flex: 0.4, renderCell: spanUsername},
        {field: 'hours', headerName: 'Total Hours', headerClassName: HEADER_CLASS_NAME, flex: 0.25},
        {field: 'points', headerName: 'Points', headerClassName: HEADER_CLASS_NAME, flex: 0.2},
        {
            field: 'none', 
            headerName: 'Edit', 
            renderCell: ViewButton, 
            sortable: false, 
            filterable: false, 
            resizable: false, 
            hideable: false, 
            disableExport: true, 
            disableColumnMenu: true, 
            headerClassName: HEADER_CLASS_NAME, 
            flex: 0.15
        }
    ];

    function spanUsername(params) {
        return (
            <p>
                {params.row.name}  
                <span className="username">
                    ({params.row.username})
                </span>
            </p>
        )
    }

    function ViewButton(params) {
        return (
            <div className='btn-container'>
                <NavLink to={"/adminClub/" + params.row.username}><Button className="btn-outlined" variant="outlined">View</Button></NavLink>
            </div>
        )
    }

    return (
        <>
            <h1 className="page-title">Members</h1>
            <TableNav 
                items={[
                    { label: "Hours Pending", to: "/" },
                    { label: "Logout", to: "/" }
                ]}
            />
            <AdminTable rows={translateData(rowData)} columns={columns}/>
        </>
    );
}

export default AdminClubView;