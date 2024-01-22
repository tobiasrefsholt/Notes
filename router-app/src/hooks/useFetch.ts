import { useEffect, useState } from "react";
import useBearerToken from "./useBearerToken";

export default function useFetch<fetchResponse>(apiEndpoint: string, deps: React.DependencyList | undefined, fetchError: string | null = null) {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState<fetchResponse | null>(null);

    useEffect(() => {
        setError(null);
        setIsPending(false);
        setData(null);
    }, deps)

    const doFetch = (fetchMethod: "GET" | "POST", urlParameters: string[] = [], requestBody: object | null = null, requireAuthentication: boolean = true) => {
        const path = process.env.REACT_APP_BACKEND_URL + apiEndpoint + urlParameters.map((part) => "/" + part).join("");
        setIsPending(true);
        useBearerToken().then((token) => {
            if (requireAuthentication && token === null) {
                console.log("Not autheticated");
                setError("Not autheticated");
                setIsPending(false);
                setData(null);
            }
            fetch(path, {
                method: fetchMethod,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: requestBody !== null ? JSON.stringify(requestBody) : undefined
            })
                .then((res) => {
                    console.log(res);
                    if (!res.ok)
                        throw Error(fetchError || "Could not fetch resource");
                    return res.json();
                })
                .then((data: fetchResponse) => {
                    setError(null);
                    setIsPending(false);
                    setData(data);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                    setData(null);
                })
        })
    }

    return { error, isPending, data, doFetch };
}