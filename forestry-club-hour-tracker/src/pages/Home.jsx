import { useEffect, useState } from "react";

import { ModifyHours } from "../components/modify-hours/ModifyHours.jsx";
import MemberSelect from "../components/MemberSelect.jsx";

function Home() { 
    return (
        <>
            <p>Home</p>
            <MemberSelect />
            <ModifyHours />
            <div><a href='/adminClub'>Admin Club View</a></div>
            <div><a href='/addMember'>Add Club Member</a></div>
        </>
    );
}

export default Home;