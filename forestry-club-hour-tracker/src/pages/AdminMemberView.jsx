import { useState, useEffect } from "react"; 
import { useParams } from "react-router";
import MemberTimesTable from "../components/Table";
import { EditHours } from "../components/EditHours";
import TableNav from "../components/TableNav";
import { BASE_URL } from "../base_url.js";

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
                "date": element.date_worked,
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
        fetch(`${BASE_URL}/api/hours.php?username=${memberName}`, {
            method: "get",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        }
        )
        .then(content => {
            setMemberData(content);
            if (content.length > 0) {
                const first = content[0];
                setDisplayName(`${first.fname} ${first.lname}`);
                setUsername(`${first.username}`)
            }
        });
    }, [memberName]);
    

    const rowData = memberData;
    const HEADER_CLASS_NAME = 'table-header';

    const columns = [
        { field: 'date', headerName: 'Date', flex: 0.3, headerClassName: HEADER_CLASS_NAME },
        { field: 'hours', headerName: 'Hours', flex: 0.25, headerClassName: HEADER_CLASS_NAME },
        { field: 'status', headerName: 'Status', flex: 0.25, headerClassName: HEADER_CLASS_NAME },
        { 
            field: 'none',
            headerName: 'Review',
            renderCell: EditButton,
            sortable: false,
            filterable: false,
            resizable: false,
            hideable: false,
            disableExport: true,
            disableColumnMenu: true,
            headerClassName: HEADER_CLASS_NAME,
            flex: 0.2
        }  
    ];

    function EditButton(params) {
        return(
            <EditHours entryId={params.row.id} memberName = {memberName} />
        )  
    }

    return (
        <>
            <h1 className="page-title">{displayName} <h2 className="username">({username})</h2></h1>
            <TableNav 
                items={[
                    { label: "Back", to: "/adminClub" },
                    { label: "Hours Pending", to: "/" },
                    { label: "Logout", to: "/" }
                ]}
            />
            <MemberTimesTable rows={translateData(rowData)} columns={columns}/>
        </>
    );
}

export default AdminMemberView;