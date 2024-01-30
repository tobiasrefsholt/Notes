import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { FetchResponse, InsertNote, category } from "../../types";

type CreateNoteResponse = {
    success: boolean;
    guid?: string;
}

type NoteSidebarNewNoteProps = {
    selectedCategory: category | null;
    categoriesFetch: FetchResponse<category[]>
}

export default function NoteSidebarNewNote({selectedCategory, categoriesFetch}:NoteSidebarNewNoteProps) {
    const [title, setTitle] = useState("");
    const addNoteFetch = useFetch<CreateNoteResponse>("/CreateNote", [], "Failed while creating note");
    const navigate = useNavigate();

    const handleCreateNote = () => {
        if (!title) return;
        const note: InsertNote = {
            content: "",
            title,
            categoryGuid: selectedCategory?.guid || null,
        }
        addNoteFetch.doFetch("POST", [], note, true, () => {
            categoriesFetch.doFetch("GET");
        });
    }

    useEffect(() => {
        if (addNoteFetch.data?.success) {
            console.log("Redirect to " + addNoteFetch.data.guid)
            navigate("/note/" + addNoteFetch.data?.guid)
        }
    }, [addNoteFetch.isPending])

    return (
        <li className="note-list-item new-note-list-item">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
            <button onClick={handleCreateNote}>Create new note</button>
        </li>
    )
}