import { useState, useEffect } from "react"; 
import AdminNav from "../components/AdminNav";
import { useParams } from "react-router";
import MemberTimesTable from "../components/Table";
import { Button } from '@mui/material';
import { EditHours } from "../components/EditHours"

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
    const memberName = params.member;

    useEffect(() => {fetch(`http://localhost:3002/api/hours/username/${memberName}`, {
        method: "get",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        }
    })
    .then( response => response.json())
    .then( content => content.data)
    .then( result => setMemberData(result))}, [{"id":0,}]);

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
        return(
            <EditHours entryId={props.row.id} memberName = {memberName} />
        )
            
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