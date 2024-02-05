import { useEffect, useState } from "react";
import { FetchResponse, NoteCompact, category } from "../../types";
import NoteListItem from "./NoteListItem";
import { useParams } from "react-router-dom";
import CrossIcon from "../SVGs/CrossIcon";
import NoteSidebarNewNote from "./NoteSidebarNewNote";

type NoteSidebarProps = {
    categoriesFetch: FetchResponse<category[]>
    notesByCategoryFetch: FetchResponse<NoteCompact[]>
    selectedCategory: category | null;
}

export default function NoteSidebar({ selectedCategory, notesByCategoryFetch, categoriesFetch }: NoteSidebarProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { error, isPending, data, doFetch } = notesByCategoryFetch;
    const { guid } = useParams();

    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""]);
        setSidebarOpen(true);
    }, [selectedCategory, categoriesFetch.data])

    if (!sidebarOpen) return "";

    return (
        <div className='notes-sidebar'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                {isPending && <strong>Loading notes...</strong>}
                {error && <strong>{error}</strong>}
                {!isPending && data && <strong>Found {data.length} notes:</strong>}
                <div style={{ width: "1.5rem", height: "1.5rem" }} onClick={() => setSidebarOpen(false)}>
                    <CrossIcon color="rgba(255, 255, 255, 0.8)" />
                </div>
            </div>
            <ul>
                <NoteSidebarNewNote selectedCategory={selectedCategory} notesByCategoryFetch={notesByCategoryFetch} />
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