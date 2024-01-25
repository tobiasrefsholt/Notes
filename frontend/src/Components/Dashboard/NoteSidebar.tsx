import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { FetchResponse, NoteCompact, category } from "../../types";
import NoteListItem from "./NoteListItem";
import { useParams } from "react-router-dom";
import CrossIcon from "../SVGs/CrossIcon";
import NoteSidebarNewNote from "./NoteSidebarNewNote";

type NoteSidebarProps = {
    selectedCategory: category | null;
    categoriesFetch: FetchResponse<category[]>
}

export default function NoteSidebar({ selectedCategory, categoriesFetch }: NoteSidebarProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { error, isPending, data, doFetch } = useFetch<NoteCompact[]>("/GetNotesByCategory", []);
    const { guid } = useParams();

    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""]);
        setSidebarOpen(true);
    }, [selectedCategory])

    if (!sidebarOpen) return "";

    return (
        <div className='notes-sidebar'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                {isPending && <strong>Loading notes...</strong>}
                {error && <strong>{error}</strong>}
                {data && <strong>Found {data.length} notes:</strong>}
                <div style={{ width: "1.5rem", height: "1.5rem" }} onClick={() => setSidebarOpen(false)}>
                    <CrossIcon color="rgba(255, 255, 255, 0.8)" />
                </div>
            </div>
            <hr />
            <ul>
                <NoteSidebarNewNote selectedCategory={selectedCategory} categoriesFetch={categoriesFetch} />
                {
                    data &&
                    <>
                        {data.map((item: NoteCompact) => (
                            <NoteListItem key={item.guid} guid={item.guid} title={item.title} active={item.guid === guid} />
                        ))}
                    </>
                }
            </ul>
        </div>
    )
}