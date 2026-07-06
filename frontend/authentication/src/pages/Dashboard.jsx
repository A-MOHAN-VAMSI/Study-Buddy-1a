import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

    const { user, logout } = useContext(AuthContext);

    return (

        <div
            style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                height:"100vh"
            }}
        >

            <h1>Welcome {user?.name}</h1>

            <h2>{user?.role}</h2>

            <button onClick={logout}>
                Logout
            </button>

        </div>

    );

}

export default Dashboard;