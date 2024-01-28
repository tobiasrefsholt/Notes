import { useState } from "react";
import useFetch from "../../hooks/useFetch"

export default function UserSettingsChangePassword() {
    const [newEmail, setNewEmail] = useState("");
    const changePasswordFetch = useFetch("/manage/info", []);

    const handleChangeEmail = () => {
        const requestBody = {
            newEmail
        }
        changePasswordFetch.doFetch("POST", [], requestBody);
        setNewEmail("");
    }

    return (
        <div className="card">
            <h2>Change email address</h2>
            <div className="card-content">
                <label htmlFor="new-email">New email</label>
                <input type="email" id="new-email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
            <div>
                <button onClick={handleChangeEmail}>Submit</button>
            </div>
        </div>
    )
}