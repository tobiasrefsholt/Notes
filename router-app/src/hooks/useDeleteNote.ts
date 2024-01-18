import { useEffect, useState } from "react";
import useBearerToken from "./useRefreshBearerToken"

export default function useDeleteNote(deps: React.DependencyList | undefined) {
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deleteIsPending, setDeleteIsPending] = useState(false);
    const [deleteIsDone, setDeleteIsDone] = useState(false);

    useEffect(() => {
        setDeleteError(null);
        setDeleteIsPending(false);
        setDeleteIsDone(false);
    }, deps)

    const deleteNote = (guid: string) => {
        useBearerToken().then((token) => {
            fetch("http://localhost:5214/DeleteNote/" + guid, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            })
                .then((res) => {
                    console.log(res)
                    if (!res.ok) {
                        throw Error("Could delete note");
                    }
                    return res.json();
                })
                .then((isSuccessful: boolean) => {
                    if (!isSuccessful) {
                        throw Error("Could delete note");
                    }
                    setDeleteError(null);
                    setDeleteIsPending(false);
                    setDeleteIsDone(true);
                })
                .catch(err => {
                    setDeleteIsPending(false);
                    setDeleteError(err.message);
                    setDeleteIsDone(false);
                })
        })
    }

    return { deleteError, deleteIsPending, deleteIsDone, deleteNote };
}