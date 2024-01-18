import { useEffect, useState } from "react";
import useBearerToken from "./useRefreshBearerToken";

type ApiResponse<T> = {
    data: T | null;
    isPending: Boolean;
    error: string | null;
}

export default function useFetchData<T>(apiPath: string, deps: React.DependencyList | undefined = undefined): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        useBearerToken().then((token) => {
            fetch("http://localhost:5214" + apiPath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
            })
                .then((res) => {
                    console.log(res)
                    if (!res.ok) {
                        throw Error("Could not fetch resource");
                    }
                    return <T>res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                })
        })
    }, deps)

    return { data, isPending, error }
}