import { useEffect, useState } from "react";
import { userToFirstLast } from "../helpers/api_helper";
import AdminNotify from "../components/AdminNotify";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../base_url.js";

function AdminReview() {

    // const [count, setCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [reviewData, setReviewData] = useState([]);

    // fetch user list
    useEffect( () => {
        // TODO: set me to a .env sometime!
        fetch(`${BASE_URL}/api/users.php`)
        .then(res => res.json())
        .then(json => setUsers(json));
    },[] );

    // fetch work hours
    useEffect( () => {
        // TODO: set me to a .env sometime!
        fetch(`${BASE_URL}/api/hours.php`)
        .then(res => res.json())
        .then(json => setReviewData(json.filter(entry => entry.under_review == "1")))
    }, []);

    

    // http rest UPDATE the resource on button click
    const doAccept = id => {
        let record = reviewData.filter(record => record.submission_id == id)[0];

        // send api put request to change that record to accepted
        
        const header = new Headers();
        header.append( "Content-Type", "application/json");
        header.append( 'Accept', 'application/json');

        fetch(`${BASE_URL}/api/hours.php?accepted=true&id=${record.submission_id}`, {
            mode: "cors",
            method: 'PUT',
            headers: header
        })
    }

    const doDeny = id => {
        let record = reviewData.filter(record => record.submission_id == id)[0];

        // deny record and record it
    
        const header = new Headers();
        header.append( "Content-Type", "application/json");
        header.append( 'Accept', 'application/json');

        fetch(`${URL}/api/hours.php?accepted=false&id=${record.submission_id}`, {
            mode: "cors",
            method: 'PUT',
            headers: header
        })
    }

    if(users && reviewData.length > 0){
        return (
            <>
                <section style={{
                    display: 'grid',
                    gridAutoFlow: 'row',
                    gridTemplateColumns: '1fr 1fr',
                }}>
                {
                    // on first pass, show all under_review.
                    reviewData.map( entry => (
                        <AdminNotify
                            key={entry.submission_id}
                            id={entry.submission_id}
                            name={userToFirstLast(users.filter(user => user.user_id === entry.user_id)[0])}
                            time_in={entry.time_in}
                            time_out={entry.time_out}
                            date_submitted={entry.create_date}
                            date_volunteered={entry.date}
                            onAccept={doAccept}
                            onDeny={doDeny}
                            setReviewData={setReviewData}
                            reviewData = {reviewData}
                        />
                    ))
                }
                </section>
            </>
        )
    }
    else{    
        // if no records are found, show a link to admin member view
        return (
            <>
                <p>You&apos;re all done! <NavLink to="./../adminClub">Go to Admin Member view.</NavLink></p>
            </>
        );
           
    }
}

export default AdminReview;