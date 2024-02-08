import { useNavigate } from "react-router-dom";
import GoBackIcon from "../../../components/icons/goBackIcon";
import UserSettings2fa from "./userSettings2fa";
import UserSettingsChangeEmail from "./userSettingsChangeEmail";
import UserSettingsChangePassword from "./userSettingsChangePassword";

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