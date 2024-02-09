import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch, { ApiEndpoint } from "../../hooks/useFetch";
import { FetchResponse, InsertNote, NoteCompact, category } from "../../types";

type CreateNoteResponse = {
    success: boolean;
    guid?: string;
}

type NoteSidebarNewNoteProps = {
    selectedCategory: category | null;
    notesByCategoryFetch: FetchResponse<NoteCompact[]>
    useCategoryColor?: boolean;
}

export default function NewNoteCard({ selectedCategory, notesByCategoryFetch, useCategoryColor = true }: NoteSidebarNewNoteProps) {
    const [title, setTitle] = useState("");
    const addNoteFetch = useFetch<CreateNoteResponse>(ApiEndpoint.CreateNote, [], "Failed while creating note");
    const navigate = useNavigate();

    const bgColor = (selectedCategory?.color && useCategoryColor)
        ? selectedCategory?.color + "10"
        : "ffffff0c";

    const handleCreateNote = () => {
        if (!title) return;
        const note: InsertNote = {
            content: "",
            title,
            categoryGuid: selectedCategory?.guid || null,
        }
        addNoteFetch.doFetch("POST", [], note, true, () => {
            notesByCategoryFetch.doFetch("POST", [], { guid: selectedCategory?.guid || null, includeSubcategories: false });
        });
        setTitle("");
    }

    useEffect(() => {
        if (addNoteFetch.data?.success) {
            console.log("Redirect to " + addNoteFetch.data.guid)
            navigate("/note/" + addNoteFetch.data?.guid)
        }
    }, [addNoteFetch.isPending])


    return (
        <li className="note-list-item new-note-list-item" style={{ backgroundColor: bgColor }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleCreateNote() }}
                placeholder={"Add new note"}
            />
            {title && <button className="button button-primary" style={{marginTop: ".5rem"}} onClick={() => handleCreateNote()}>Create new note</button>}
        </li>
    )
}