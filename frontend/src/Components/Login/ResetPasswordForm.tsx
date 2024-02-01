import { useState } from "react"
import { LoginPageView } from "../../types"
import useFetch from "../../hooks/useFetch";

type Props = {
    setLoginState: React.Dispatch<React.SetStateAction<LoginPageView>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function ResetPasswordForm({ email, setEmail, setLoginState }: Props) {
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const resetPasswordFetch = useFetch("/resetPassword", []);

    function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const requestBody = {
            email,
            resetCode,
            newPassword
        }
        resetPasswordFetch.doFetch("POST", [], requestBody, false, () => {
            if (resetPasswordFetch.data === true)
                setLoginState("login");
        });
    }

    return (
        <>
            <form onSubmit={(e) => handleResetPassword(e)}>
                <div>
                    <label>Reset Code:</label>
                    <input type="text" value={resetCode} onChange={e => setResetCode(e.target.value)} autoFocus={true} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>New password:</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <button style={{ backgroundColor: "#945600" }} type="submit">Set new password</button>
            </form>
        </>
    )
}