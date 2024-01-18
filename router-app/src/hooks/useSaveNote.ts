import { useEffect, useState } from "react";
import useBearerToken from "./useRefreshBearerToken"

type Note = {
    guid: string;
    content?: string;
    title?: string;
    tags?: string[];
    dateAdded?: Date;
}

export default function useSaveNote(deps: React.DependencyList | undefined) {
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveIsPending, setSaveIsPending] = useState(false);
    const [saveIsDone, setSaveIsDone] = useState(false);

    useEffect(()=>{
        setSaveError(null);
        setSaveIsPending(false);
        setSaveIsDone(false);
    }, deps)

    const save = (note: Note) => {
        useBearerToken().then((token) => {
            fetch("http://localhost:5214/UpdateNote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify(note || [])
            })
                .then((res) => {
                    console.log(res)
                    if (!res.ok) {
                        throw Error("Could not apply change");
                    }
                    return res.json();
                })
                .then((isSuccessful: boolean) => {
                    if (!isSuccessful) {
                        throw Error("Could not apply change");
                    }
                    setSaveError(null);
                    setSaveIsPending(false);
                    setSaveIsDone(true);
                })
                .catch(err => {
                    setSaveIsPending(false);
                    setSaveError(err.message);
                    setSaveIsDone(false);
                })
        })
    }

    return { saveError, saveIsPending, saveIsDone, save };
}