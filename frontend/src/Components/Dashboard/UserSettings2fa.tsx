import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch"

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

    return (
        <div className="card">
            <h2>Two factor authentication</h2>
            {twoFactorFetch.isPending && <p>Loading settings...</p>}
            {
                twoFactorFetch.data?.isTwoFactorEnabled === false &&
                <>
                    <div className="card-content">
                        <p><strong>2fa is not enabled</strong></p>
                        <p>Shared key: <br />{twoFactorFetch.data.sharedKey}</p>
                        <label htmlFor="code-input">One time code:</label>
                        <input id="code-input" type="text" value={twoFactorCode} onChange={(e) => { setTwoFactorCode(e.target.value) }} />
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