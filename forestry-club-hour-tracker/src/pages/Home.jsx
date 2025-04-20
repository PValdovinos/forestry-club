import { AddHours } from "../components/AddHours";
import MemberSelect from "../components/MemberSelect.jsx";

function Home() { 
    return (
        <>
            <p>Home</p>
            <AddHours />
            <MemberSelect />
            <div><a href='/adminClub'>Admin Club View</a></div>
            <div><a href='/addMember'>Add Club Member</a></div>
        </>
    );
}

export default Home;