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
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");


    useEffect(() => {
        fetch(`http://localhost:3002/api/hours/username/${memberName}`, {
            method: "get",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(content => {
            const result = content.data;
            setMemberData(result);
            if (result.length > 0) {
                const first = result[0];
                setDisplayName(`${first.fname} ${first.lname}`);
                setUsername(`${first.username}`)
            }
        });
    }, [memberName]);
    

    const rowData = memberData;
    const HEADER_CLASS_NAME = 'admin-table-header';

    const columns = [
        { field: 'date', headerName: 'Date', width: 500, headerClassName: HEADER_CLASS_NAME },
        { field: 'hours', headerName: 'Hours', width: 200, headerClassName: HEADER_CLASS_NAME },
        { field: 'status', headerName: 'Status', width: 200, headerClassName: HEADER_CLASS_NAME },
        { field: 'edit', headerName: '', renderCell: EditButton,
            width: 150,  sortable: false, filterable: false, resizable: false,
            hideable: false, disableExport: true, disableColumnMenu: true, headerClassName: HEADER_CLASS_NAME }
    ];

    function EditButton(props) {
        return(
            <EditHours entryId={props.row.id} memberName = {memberName} />
        )
            
    }
    return (
        <>
            <h1 className="page-title">{displayName} <h2 className="username">({username})</h2></h1>
            <div className='admin-nav'>
                <a href="/adminClub"><button className="admin-nav-btn">Back</button></a>
                <AdminNav />
            </div>
            <MemberTimesTable rows={translateData(rowData)} columns={columns}/>
        </>
    );
}

export default AdminMemberView;