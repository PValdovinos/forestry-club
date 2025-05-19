import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContainerNav from "../components/ContainerNav";
import HoursTable from "../components/Table"; 
import { BASE_URL } from "../base_url.js"; 

function translateData(data) {
    if (data) {
        return data.map(entry => ({
            id: entry.submission_id,
            date: new Date(entry.date_worked).toLocaleDateString(),
            hours: entry.hours,
            points: entry.hours * 100
        }));
    } else {
        return [];
    }
}

const MemberHoursView = () => {
    const { username } = useParams();
    const [memberData, setMemberData] = useState(null);
    const [memberHours, setMemberHours] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetch(`${BASE_URL}/api/users.php`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('Fetched users:', data);
            console.log('Username from URL:', username);

            const currentUser = data.find(user => user.username === username);

            if (currentUser) {
                setUserName(`${currentUser.fname} ${currentUser.lname}`);
                setMemberData(currentUser);
            } else {
                console.error('User not found for username:', username);
                setUserName('Member');
                setMemberData(null);
            }
        })
        .catch(err => console.error("Failed to load member hours:", err));
    }, [username]);

    useEffect(() => {
        fetch(`${BASE_URL}/api/hours.php?username=${username}`, {
            method: "get",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            return setMemberHours(result)
        })
    }, [username]);

    const HEADER_CLASS_NAME = 'table-header';

    const columns = [
        { field: 'date', headerName: 'Date', flex: 1, headerClassName: HEADER_CLASS_NAME },
        { field: 'hours', headerName: 'Hours', flex: 1, headerClassName: HEADER_CLASS_NAME },
        { field: 'points', headerName: 'Points', flex: 1, headerClassName: HEADER_CLASS_NAME }
    ];

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Welcome, {userName}</h2>
            <h5 className="text-muted mb-4">Your Volunteer Hours and Points</h5>
            <ContainerNav 
                items={[
                    { label: "Logout", to: "/" }
                ]}
            />
            <HoursTable rows={translateData(memberHours)} columns={columns} />
        </div>
    );
};

export default MemberHoursView;
