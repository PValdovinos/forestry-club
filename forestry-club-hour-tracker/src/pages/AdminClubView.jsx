import { useState, useEffect } from "react"; 
import AdminNav from "../components/AdminNav";
import AdminTable from "../components/Table";
import { Button } from '@mui/material';

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

    useEffect(() => {fetch("http://localhost:3002/api/users", {
        method: "get",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        }
    })
    .then( response => response.json())
    .then( content => content.data)
    .then( result => setMemberData(result))}, []);

    const rowData = memberData;
    const HEADER_CLASS_NAME = 'admin-table-header';
    
    const columns= [
        {field: 'name', headerName: 'Name', headerClassName: HEADER_CLASS_NAME, flex: 0.43, renderCell: spanUsername},
        {field: 'hours', headerName: 'Total Hours', headerClassName: HEADER_CLASS_NAME, flex: 0.17},
        {field: 'points', headerName: 'Points', headerClassName: HEADER_CLASS_NAME, flex: 0.2},
        {field: 'none', headerName: 'Edit', renderCell: ViewButton, 
            sortable: false, filterable: false, resizable: false, 
            hideable: false, disableExport: true, disableColumnMenu: true, 
            headerClassName: HEADER_CLASS_NAME, flex: 0.15}
    ];

    function spanUsername(props) {
        return (
            <p>
                {props.row.name}  
                <span className="username">
                    ({props.row.username})
                </span>
            </p>
        )
    }

    function ViewButton(props) {
        return (
            <div className='btn-container'>
                <a href={"/adminClub/"+props.row.username}><Button className="btn-outlined" variant="outlined">View</Button></a>
            </div>
        )
    }

    return (
        <>
            <h1 className="page-title">Club Members</h1>
            <AdminNav />
            <AdminTable rows={translateData(rowData)} columns={columns}/>
        </>
    );
}

export default AdminClubView;