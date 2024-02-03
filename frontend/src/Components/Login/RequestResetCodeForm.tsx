import useFetch, { ApiEndpoint } from "../../hooks/useFetch";
import { LoginPageView } from "../../types";

type Props = {
    setLoginState: React.Dispatch<React.SetStateAction<LoginPageView>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function RequestResetCodeForm({ email, setEmail, setLoginState }: Props) {
    const resetPasswordFetch = useFetch(ApiEndpoint.ForgotPassword, []);

    function handleGetToken() {
        resetPasswordFetch.doFetch("POST", [], { email }, false);
    }

    function handleShowResetForm() {
        setLoginState("resetPassword");
    }

    return (
        <>
            <h2 className="card-header">Request password reset</h2>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoFocus={true} />
                <button style={{ backgroundColor: "#945600" }} type="submit" onClick={handleGetToken}>Get reset token</button>
                <button style={{ marginLeft: ".5rem" }} type="submit" onClick={handleShowResetForm}>Already got a token?</button>
                {resetPasswordFetch.isPending && <p>Sending email...</p>}
                {!resetPasswordFetch.isPending && resetPasswordFetch.data === true && <p>Email was sent</p>}
                {resetPasswordFetch.error && <p>{resetPasswordFetch.error}</p>}
            </div>
        </>
    )
}