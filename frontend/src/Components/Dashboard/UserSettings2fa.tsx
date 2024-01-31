import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch"
import QRCode from "react-qr-code";

type TwoFactorResponse = {
    sharedKey: string,
    recoveryCodesLeft: number,
    recoveryCodes: null | string[],
    isTwoFactorEnabled: boolean,
    isMachineRemembered: boolean
}


export default function UserSettings2fa() {
    const twoFactorFetch = useFetch<TwoFactorResponse>("/manage/2fa", []);
    const [twoFactorCode, setTwoFactorCode] = useState("");
    const [copyText, setCopyText] = useState("Copy secret");

    useEffect(() => {
        twoFactorFetch.doFetch("POST", [], {});
    }, []);

    const enable2fa = () => {
        twoFactorFetch.doFetch("POST", [], {
            enable: true,
            twoFactorCode
        })
    }

    const disable2fa = () => {
        twoFactorFetch.doFetch("POST", [], {
            enable: false
        })
    }

    async function handleCopySecret() {
        try {
            await navigator.clipboard.writeText(twoFactorFetch.data?.sharedKey || "");
            setCopyText("Copied secret!");
          } catch (err) {
            setCopyText("Failed to copy");
          }
    }

    return (
        <div className="card">
            <h2>Two factor authentication</h2>
            {twoFactorFetch.isPending && <p>Loading settings...</p>}
            {
                twoFactorFetch.data?.isTwoFactorEnabled === false &&
                <>
                    <div className="card-content">
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div style={{width: "50%"}}>
                                <button style={{marginBottom: "1rem"}} onClick={handleCopySecret}>{copyText}</button>
                                <label htmlFor="code-input">One time code:</label>
                                <input id="code-input" type="text" value={twoFactorCode} onChange={(e) => { setTwoFactorCode(e.target.value) }} />
                            </div>
                            <QRCode value={"otpauth://totp/mdNotes?secret=" + twoFactorFetch.data.sharedKey} style={{ width: "50%", height: "auto", maxWidth: "100%", padding: "1rem", backgroundColor: "white", borderRadius: ".5rem" }} />
                        </div>
                    </div>
                    <div>
                        <button onClick={enable2fa}>Enable</button>
                    </div>
                </>
            }
            {
                twoFactorFetch.data?.isTwoFactorEnabled === true &&
                <>
                    <div className="card-content">
                        <p>2fa is enabled. Good Stuff!</p>
                    </div>
                    <div>
                        <button onClick={disable2fa}>Disable</button>
                    </div>
                </>
            }
        </div>
    )
}