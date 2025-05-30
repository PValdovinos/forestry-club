import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import Box from '@mui/material/Box'
import { BASE_URL } from "../base_url.js";
import FlatSolidButton from "./FlatSolidButton";

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
            return data.map(element => element.fname + " " + element.lname + " (" + element.email + ")");
        }
        else {
            return []
        }
    }

    function handleButtonClick() {
        let email = document.getElementById('name-select-nav') ? document.getElementById('name-select-nav').innerText:'';
        if(typeof(email) === 'string' && email.length > 1) {
            email = email.substring(email.indexOf('(') + 1, email.indexOf(')'));
            navigate(`/member/${email}`);
        }
    }

    return (
        <Box display="flex" gap={2}>
            <Dropdown 
                id='name-select-nav' 
                data={translateData(memberData ? memberData.filter(member => member.email !== null) : [])}
                sx={{ flex: 4 }}
            />
            <FlatSolidButton 
                onClick={handleButtonClick}
                sx={{
                    flex: 1,
                }}
            >
                View Member
            </FlatSolidButton>
        </Box>
    )
}