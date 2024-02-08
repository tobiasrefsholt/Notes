import { useEffect, useState } from "react";
import useFetch, { ApiEndpoint } from "../../../hooks/useFetch"

type EmailResponse = {
    email: string;
    isEmailConfirmed: boolean;
}

export default function UserSettingsChangePassword() {
    const [newEmail, setNewEmail] = useState("");
    const changePasswordFetch = useFetch<EmailResponse>(ApiEndpoint.ManageInfo, []);

    useEffect(() => {
        changePasswordFetch.doFetch("GET");
    }, [])

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
                {changePasswordFetch.isPending && <p>Loading data...</p>}
                {changePasswordFetch.error && <p>{changePasswordFetch.error}</p>}
                {
                    !changePasswordFetch.isPending &&
                    changePasswordFetch.data &&
                    <>
                        <p>Current email: {changePasswordFetch.data.email}</p>
                        <p>{changePasswordFetch.data.isEmailConfirmed ? "Is verified" : "Not verified"}</p>
                        <label htmlFor="new-email">New email</label>
                        <input type="email" id="new-email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />   
                    </>
                }
            </div>
            <div>
                <button className="button button-primary" onClick={handleChangeEmail}>Submit</button>
            </div>
        </div>
    )
}