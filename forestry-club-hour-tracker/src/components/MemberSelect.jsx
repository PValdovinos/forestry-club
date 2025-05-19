import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dropdown from './Dropdown';
import { BASE_URL } from "../base_url.js";


export default function MemberSelect() {
    const [memberData, setMemberData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/api/users.php`, {
        method: "get",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        }
    })
    .then( response => response.json())
    .then( result => setMemberData(result))}, []);

    function translateData(data) {
        if(data){
            return data.map(element => element.fname + " " + element.lname + " (" + element.username + ")");
        }
        else {
            return []
        }
    }

    function handleButtonClick() {
        let username = document.getElementById('name-select-nav') ? document.getElementById('name-select-nav').innerText:'';
        if(typeof(username) === 'string' && username.length > 1) {
            username = username.substring(username.indexOf('(') + 1, username.indexOf(')'));
            navigate(`/member/${username}`);
        }
    }

    return (
        <div className='member-select-nav'>
            <Dropdown id='name-select-nav' data={translateData((memberData)?memberData.filter(member => member.username !== null):[])} />
            <Button variant='outlined' onClick={handleButtonClick}>View Member</Button>
        </div>
    )
}