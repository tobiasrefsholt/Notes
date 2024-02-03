import { useNavigate } from "react-router-dom";
import GoBackIcon from "../SVGs/GoBackIcon";
import UserSettings2fa from "./UserSettings2fa";
import UserSettingsChangeEmail from "./UserSettingsChangeEmail";
import UserSettingsChangePassword from "./UserSettingsChangePassword";

export default function UserSettings() {
    const navigate = useNavigate();
    return (
        <main className="user-settings">
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginLeft: "1rem" }}>
                <div style={{ width: "2rem", height: "2rem" }} onClick={() => navigate("/")}>
                    <GoBackIcon color='#ffffff' />
                </div>
                <h1>Edit user settings</h1>
            </div>
            <section className="settings-grid">
                <UserSettingsChangePassword />
                <UserSettingsChangeEmail />
                <UserSettings2fa />
            </section>
        </main>
    );
}