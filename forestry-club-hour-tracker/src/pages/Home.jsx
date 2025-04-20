import { AddHours } from "../components/AddHours";

function Home() { 
    return (
        <>
            <p>Home</p>
            <AddHours />
            <div><a href='/adminClub'>Admin Club View</a></div>
            <div><a href='/addMember'>Add Club Member</a></div>
        </>
    );
}

export default Home;