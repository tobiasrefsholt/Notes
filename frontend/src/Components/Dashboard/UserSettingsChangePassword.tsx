import { useState } from "react";
import useFetch, { ApiEndpoint } from "../../hooks/useFetch"

export default function UserSettingsChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const changePasswordFetch = useFetch(ApiEndpoint.ManageInfo, []);

    const handleChangePassword = () => {
        const requestBody = {
            oldPassword,
            newPassword
        }
        changePasswordFetch.doFetch("POST", [], requestBody);
        setOldPassword("");
        setNewPassword("");
    }

    return (
        <div className="card">
            <h2>Change password</h2>
            <div className="card-content">
                <label htmlFor="current-password">Current password</label>
                <input type="password" id="current-password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <label htmlFor="new-password">New password</label>
                <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={handleChangePassword}>Submit</button>
            </div>
        </div>
    )
}