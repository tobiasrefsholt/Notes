import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBearerToken from "../../hooks/useRefreshBearerToken";

type Note = {
    content: string;
    title: string;
    tags: string[];
    dateAdded: Date;
    lastChanged: Date;
}

type ApiResponse = {
    success: boolean;
    guid?: string;
}

export default function AddNote() {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSaveNote = () => {
        setIsPending(true);
        console.log("Creating new note");
        const date = new Date();

        const note: Note = {
            content: "",
            title,
            tags,
            dateAdded: date,
            lastChanged: date
        }

        useBearerToken().then((token) => {
            fetch("http://localhost:5214/CreateNote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify(note)
            })
                .then((res) => {
                    console.log(res)
                    if (!res.ok) {
                        throw Error("Could not fetch resource");
                    }
                    return res.json();
                })
                .then((data: ApiResponse) => {
                    if (!data.success) {
                        setIsPending(false);
                        setError("Server Error");
                        return;
                    }
                    setError(null);
                    setIsPending(false);
                    navigate("/note/" + data.guid);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                })
        })
    }

    return (
        <main className='add-task'>
            <>
                {
                    !isPending &&
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
                    isPending &&
                    <div>Saving...</div>
                }
                {
                    error &&
                    <div>{error}</div>
                }
            </>

        </main>
    )
}