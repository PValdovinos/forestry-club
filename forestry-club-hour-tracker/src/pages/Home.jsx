import { AddHours } from "../components/AddHours";
import MemberSelect from "../components/MemberSelect.jsx";

function Home() { 
    return (
        <div className="home-container">
            <h2 className="home-title">Welcome to the Forestry Club Hours Tracker</h2>

            {/* Member Section */}
            <div className="member-section">
                <h4>Member Access</h4>
                <AddHours />
                <MemberSelect />
            </div>

            {/* Admin Section */}
            <div className="admin-section">
                <h4>Admin Access</h4>
                <div><a href='/adminClub' className="admin-link">Admin Club View</a></div>
                <div><a href='/addMember' className="admin-link">Add Club Member</a></div>
            </div>
        </div>
    );
}

export default Home;