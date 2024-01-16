import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

type ApiResponse = {
    data: any | null;
    isPending: Boolean;
    error: string | null;
}

export default function useFetchData(apiPath: string, deps: React.DependencyList | undefined = undefined): ApiResponse {
    const [data, setData] = <any>useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = Cookies.get('token');
        fetch("http://localhost:5214" + apiPath, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
            .then((res) => {
                console.log(res)
                if(!res.ok) {
                    throw Error("Could not fetch resource");
                }
                return res.json();
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
    }, deps)

    return { data, isPending, error }
}