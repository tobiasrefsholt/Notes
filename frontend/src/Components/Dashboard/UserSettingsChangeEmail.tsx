import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch"

type EmailResponse = {
    email: string;
    isEmailConfirmed: true;
}

export default function UserSettingsChangePassword() {
    const [newEmail, setNewEmail] = useState("");
    const changePasswordFetch = useFetch<EmailResponse>("/manage/info", []);

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
                    <>
                        <p>Current email: {changePasswordFetch.data?.email}</p>
                        <p>Is verified: {changePasswordFetch.data?.isEmailConfirmed}</p>
                        <label htmlFor="new-email">New email</label>
                        <input type="email" id="new-email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />   
                    </>
                }
            </div>
            <div>
                <button onClick={handleChangeEmail}>Submit</button>
            </div>
        </div>
    )
}