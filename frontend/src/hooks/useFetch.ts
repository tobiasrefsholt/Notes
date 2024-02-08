import { useContext, useEffect, useState } from "react";
import useBearerToken from "./useBearerToken";
import GlobalStateContext from "../context/globalStateContext";

export enum ApiEndpoint {
    Register = "/register",
    Login = "/login",
    Refresh = "/refresh",
    ConfirmEmail = "/confirmEmail",
    ResendConfirmationEmail = "/resendConfirmationEmail",
    ForgotPassword = "/forgotPassword",
    ResetPassword = "/resetPassword",
    ManageTwoFactor = "/manage/2fa",
    ManageInfo = "/manage/info",
    GetNotes = "/GetNotes",
    GetNotesByCategory = "/GetNotesByCategory",
    CreateNote = "/CreateNote",
    UpdateNote = "/UpdateNote",
    DeleteNote = "/DeleteNote",
    GetCategories = "/GetCategories",
    CreateCategory = "/CreateCategory",
    DeleteCategory = "/DeleteCategory",
    UpdateCategory = "/UpdateCategory"
}

export default function useFetch<fetchResponse>(apiEndpoint: ApiEndpoint, deps: React.DependencyList | undefined, fetchError: string | null = null) {
    const {globalState, setGlobalState} = useContext(GlobalStateContext)!;
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState<fetchResponse | null>(null);
    
    useEffect(() => {
        setError(null);
        setIsPending(false);
        setData(null);
    }, deps)
    
    const doFetch = (
        fetchMethod: "GET" | "POST",
        urlParameters: string[] = [],
        requestBody: object | null = null,
        requireAuthentication: boolean = true,
        callback: () => void | undefined = () => { }
        ) => {
            const path = import.meta.env.VITE_BACKEND_URL + apiEndpoint + urlParameters.map((part) => "/" + part).join("");
            setIsPending(true);
            useBearerToken().then((token) => {
            if (requireAuthentication && token === null) {
                console.log("Not autheticated");
                setError("Not autheticated");
                setIsPending(false);
                setData(null);
                setGlobalState({...globalState, isLoggedIn: false});
                return;
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
                    const contentType = res.headers.get("content-type");
                    const isJsonResponse = contentType && (
                        (contentType.indexOf("application/json") !== -1) ||
                        (contentType.indexOf("application/problem+json") !== -1)
                    );

                    if (!res.ok && isJsonResponse) {
                        console.log("Response is in JSON");
                        return res.json().then((errorData) => {
                            throw errorData;
                        });
                    }

                    if (!res.ok && !isJsonResponse) {
                        console.log("Response is in Text");
                        return res.text().then((errorData) => {
                            throw errorData;
                        });
                    }

                    if (isJsonResponse)
                        return res.json();

                    return true;
                })
                .then((data: fetchResponse) => {
                    setError(null);
                    setIsPending(false);
                    setData(data);
                })
                .catch(error => {
                    setError(fetchError || "Could not fetch resource");
                    setIsPending(false);
                    setData(error);
                    console.log(error);
                })
                .finally(() => callback())
        })
    }

    return { error, isPending, data, doFetch };
}