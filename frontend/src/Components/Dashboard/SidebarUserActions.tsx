import { Link } from "react-router-dom";
import useFetch, { ApiEndpoint } from "../../hooks/useFetch";
import { useEffect } from "react";

type UserResponse = {
    email: string;
    isEmailConfirmed: true;
}

export default function SidebarUserActions() {
    const userFetch = useFetch<UserResponse>(ApiEndpoint.ManageInfo, []);

    useEffect(() => {
        userFetch.doFetch("GET");
    })

    if (!(userFetch.data && "email" in userFetch.data)) return "";

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem" }}>
            <Link to="/user-settings" style={
                {
                    width: "2.5rem", height: "2.5rem", borderRadius: "1000px", backgroundColor: "#945600",
                    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "white", textDecoration: "none"
                }
            }>
                {userFetch.data.email.charAt(0).toUpperCase()}
            </Link>
            <div>
                <Link to="/user-settings" style={{ color: "inherit", textDecoration: "none" }}>{userFetch.data.email}</Link><br />
                <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem", fontSize: ".8em" }}>
                    <Link to="/user-settings" style={{ color: "inherit" }}>Settings</Link>
                    <Link to="/logout" style={{ color: "inherit" }}>Logout</Link>
                </div>
            </div>
        </div>
    )
}