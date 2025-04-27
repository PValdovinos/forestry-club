import { useState, useEffect } from "react";
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
    const [memberHours, setMemberHours] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetch("http://localhost:3002/api/member/hours", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setUserName(data.name || '');
            setMemberHours(data.hours || []);
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
