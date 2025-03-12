import { useEffect, useState } from "react";
import { userToFirstLast } from "../helpers/api_helper";
import AdminNotify from "../components/AdminNotify";

import ToastContainer from 'react-bootstrap/ToastContainer';

function AdminReview() {

    const [users, setUsers] = useState(null);
    const [reviewData, setReviewData] = useState(null);

    // fetch user list
    useEffect( () => {
        // TODO: set me to a .env sometime!
        fetch("http://localhost:3002/api/users/")
        .then(res => res.json())
        .then(json => setUsers(json.data));
    },[] );

    // fetch work hours
    useEffect( () => {
        // TODO: set me to a .env sometime!
        fetch("http://localhost:3002/api/hours/")
        .then(res => res.json())
        .then(json => setReviewData(json.data));
    }, []);

    // console.log(reviewData);
    // console.log(users.filter(user => user.user_id === 1))

    return (
        <>
            <ToastContainer>
                {
                    users && reviewData && reviewData
                    .filter(entry => entry.under_review === 1)
                    .map( entry => {
                        <AdminNotify
                            key={entry.submission_id}
                            name={userToFirstLast(users.filter(user => user.user_id === entry.user_id)[0])}
                            time_in={entry.time_in}
                            time_out={entry.time_out}
                            date_submitted={entry.create_date}
                            date_volunteered={entry.time_in} 
                        />
                    })    
                }
            </ToastContainer>
        </>
    );
}

export default AdminReview;