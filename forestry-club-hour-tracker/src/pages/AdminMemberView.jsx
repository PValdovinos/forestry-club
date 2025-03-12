import { useState, useEffect } from "react"; 
import AdminNav from "../components/AdminNav";
import { useParams } from "react-router";
import MemberTimesTable from "../components/Table";
import { Button } from '@mui/material';

function translateData(data) {
    if(data){
        return data.map(element => {
            let userStatus = "Accepted";
            if(!element.accepted) {
                userStatus = "Rejected"
            }
            if(element.under_review){
                userStatus = "Pending";
            }
            document.getElementById("member-name").innerText = element.fname + " " + element.lname + " (" + element.username + ")";
            return{
                "id": element.submission_id,
                "date": element.date_worked.substring(0,10),
                "hours": element.hours ? element.hours : 0,
                "status": userStatus
            }
        });
    }
    else {
        return []
    }
}

function AdminMemberView() { 
    const params = useParams();
    const [memberData, setMemberData] = useState([]);

        useEffect(() => {fetch(`http://localhost:3002/api/hours/username/${params.member}`, {
            method: "get",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        })
        .then( response => response.json())
        .then( content => content.data)
        .then( result => setMemberData(result))}, [{"id":0,}]);
    
    const exampleData = [
        { "id": 0, "date": "2025-02-20", "hours": 3, "status": "Accepted" },
        { "id": 1, "date": "2025-02-21", "hours": 2.5, "status": "Accepted" },
        { "id": 2, "date": "2025-02-22", "hours": 4, "status": "Pending" },
        { "id": 3, "date": "2025-02-23", "hours": 1.5, "status": "Accepted" },
        { "id": 4, "date": "2025-02-24", "hours": 3.75, "status": "Accepted" }
    ];

    const rowData = memberData;

    const columns = [
        { field: 'date', headerName: 'Date', width: 500 },
        { field: 'hours', headerName: 'Hours', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        { field: 'edit', headerName: '', renderCell: EditButton,
            width: 150,  sortable: false, filterable: false, resizable: false,
            hideable: false, disableExport: true, disableColumnMenu: true }
    ];

    function EditButton(props) {
        return (<a href={window.location.href+'/'+props.row.id}><Button
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        >
            review
        </Button></a>)
    }
    return (
        <>
            <a href="/adminClub"><button>Back</button></a>
            <AdminNav />
            <p id="member-name" style={{textAlign: "left"}}></p>
            <MemberTimesTable rows={translateData(rowData)} columns={columns}/>
        </>
    );
}

export default AdminMemberView;