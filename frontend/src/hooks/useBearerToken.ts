type loginSuccessfulResponse = {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}

type loginFailedResponse = {
    type: string;
    title: string;
    status: number;
    detail: string;
}

export default async function useBearerToken(): Promise<string | null> {
    const accessTokenExpires = +<string>localStorage.getItem("accessTokenExpires") || 0;
    const currentTimestamp = new Date().getTime();
    const refreshToken = localStorage.getItem("refreshToken");

    // Abort refresh if token has more than 30 min until expiration
    if (accessTokenExpires > currentTimestamp) {
        return localStorage.getItem('accessToken');
    };

    try {
        // Throw error if refresh token is missing
        if (!refreshToken)
            throw Error();

        // Fetch new access token
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken: refreshToken })
        });

        // Throw error if response is not ok
        if (!response.ok)
            throw Error();

        const data: loginSuccessfulResponse | loginFailedResponse = await response.json();

        // Trow error if token is missing from response
        if (!("tokenType" in data))
            throw Error();

        // If successful, set localstorage and return token.
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('accessTokenExpires', (currentTimestamp + data.expiresIn * 1000).toString());
        localStorage.setItem('refreshToken', data.refreshToken);
        return data.accessToken;
    } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpires');
        localStorage.removeItem('refreshToken');
        return null;
    }
}