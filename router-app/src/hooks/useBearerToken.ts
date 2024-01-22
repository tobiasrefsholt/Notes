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

    // Abort refresh if token has more than 30 min until expiration
    if (accessTokenExpires - 3600 / 2 > currentTimestamp) {
        console.log("Aborted token refresh");
        return localStorage.getItem('accessToken');
    };

    console.log("Fetching new token");

    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken === null) return null;

    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken: refreshToken })
    });

    if (!response.ok) {
        return null;
    }

    const data: loginSuccessfulResponse | loginFailedResponse = await response.json();

    if ("tokenType" in data) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('accessTokenExpires', (currentTimestamp + data.expiresIn * 1000).toString());
        localStorage.setItem('refreshToken', data.refreshToken);
        return data.accessToken;
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpires');
    localStorage.removeItem('refreshToken');
    return null;
}