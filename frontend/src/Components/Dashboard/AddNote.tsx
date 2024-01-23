import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InsertNote } from "../../types";
import useFetch from "../../hooks/useFetch";

type ApiResponse = {
    success: boolean;
    guid?: string;
}

export default function AddNote() {
    const [title, setTitle] = useState("");
    const addNoteFetch = useFetch<ApiResponse>("/CreateNote", [], "Failed while creating note");
    const navigate = useNavigate();

    const handleSaveNote = () => {
        const note: InsertNote = {
            content: "",
            title,
            categoryGuid: null,
        }
        addNoteFetch.doFetch("POST", [], note);
    }

    useEffect(() => {
        console.log("Useeffect")
        if (addNoteFetch.data?.success) {
            console.log("Redirect to " + addNoteFetch.data.guid)
            navigate("/note/" + addNoteFetch.data?.guid)
        }
    }, [addNoteFetch.isPending])

    return (
        <main className='add-task'>
            <>
                {
                    !addNoteFetch.isPending &&
                    <>
                        <h1>Create new note</h1>
                        <div style={{ marginBottom: "1rem" }}>
                            <input className='note-heading' type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled" />
                        </div>
                        <div className='toolbar-buttons'>
                            <button onClick={handleSaveNote}>Save</button>
                        </div>
                    </>
                }
                {
                    addNoteFetch.isPending &&
                    <div>Saving...</div>
                }
                {
                    addNoteFetch.error &&
                    <div>{addNoteFetch.error}</div>
                }
            </>
        </main>
    )
}