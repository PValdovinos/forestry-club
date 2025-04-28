import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import AdminTable from "../components/Table"; // same table component used in AdminClubView

function translateData(data) {
    if (data) {
        return data.map(entry => ({
            id: entry.entry_id || entry.date,  // ensure unique key
            date: new Date(entry.date).toLocaleDateString(),
            hours: entry.hours,
            points: entry.points
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
        fetch("http://localhost:3002/api/users", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('Fetched users:', data.data);
        console.log('Username from URL:', username);

        const currentUser = data.data.find(user => user.username === username);

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
    }, []);

    const columns = [
        { field: 'date', headerName: 'Date', width: 300 },
        { field: 'hours', headerName: 'Hours', width: 150 },
        { field: 'points', headerName: 'Points', width: 150 }
    ];

    return (
        <>
            <AdminNav />
            <div className="container mt-4">
                <h2 className="text-center mb-3">Welcome, {userName}</h2>
                <h5 className="text-muted text-center mb-4">Your Volunteer Hours and Points</h5>
                <AdminTable rows={translateData(memberHours)} columns={columns} />
            </div>
        </>
    );
};

export default MemberHoursView;
