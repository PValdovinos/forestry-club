import "../App.css";
import { Auth } from "../components/auth.jsx"

function Login() {
    return (
        <div className="Login" style={{ color: 'white' }}>
            <h2 className="home-title">Welcome to the Forestry Club Hours Tracker</h2>

            <Auth />

        </div>
    )
}


export default Login;