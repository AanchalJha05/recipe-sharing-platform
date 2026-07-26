import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <Sidebar />

            <div
                style={{
                    marginLeft: 250,
                    width: "100%",
                    minHeight: "100vh",
                    background: "#f5f5f5",
                    padding: 30,
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardLayout;