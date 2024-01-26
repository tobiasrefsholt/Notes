import { useState } from "react";
import useFetch from "../../hooks/useFetch"

export default function UserSettingsChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const changePasswordFetch = useFetch("/changePassword", []);

    const handleChangePassword = () => {
        const requestBody = {
            currentPassword,
            newPassword
        }
        changePasswordFetch.doFetch("POST", [], requestBody);
        setCurrentPassword("");
        setNewPassword("");
    }

    return (
        <div className="card">
            <h2>Change password</h2>
            <div className="card-content">
                <label htmlFor="current-password">Current password</label>
                <input type="password" id="current-password" />
                <label htmlFor="new-password">New password</label>
                <input type="password" id="new-password" />
            </div>
            <div>
                <button onClick={handleChangePassword}>Submit</button>
            </div>
        </div>
    )
}