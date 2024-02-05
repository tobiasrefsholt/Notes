import { useEffect, useState } from "react";
import { FetchResponse, NoteCompact, category } from "../../types";
import NoteListItem from "./NoteListItem";
import { useParams } from "react-router-dom";
import CrossIcon from "../SVGs/CrossIcon";
import NoteSidebarNewNote from "./NoteSidebarNewNote";
import NoteSidebarSearch from "./NoteSidebarSearch";

type NoteSidebarProps = {
    categoriesFetch: FetchResponse<category[]>
    notesByCategoryFetch: FetchResponse<NoteCompact[]>
    selectedCategory: category | null;
}

export default function NoteSidebar({ selectedCategory, notesByCategoryFetch, categoriesFetch }: NoteSidebarProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { error, isPending, data, doFetch } = notesByCategoryFetch;
    const { guid } = useParams();

    const [search, setSearch] = useState<string>("");
    const [filteredNotes, setFilteredNotes] = useState<NoteCompact[] | null>(null);

    // Fetch data and reset seaech on load and category change
    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""]);
        setSidebarOpen(true);
        setSearch("");
    }, [selectedCategory, categoriesFetch.data])

    // Update search result on input change and on load
    useEffect(() => {
        if (!search) {
            setFilteredNotes(data);
            return;
        }
        const result = data?.filter((note) => note.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) || null;
        setFilteredNotes(result);
    }, [data, search])

    if (!sidebarOpen) return "";

    return (
        <div className='notes-sidebar'>
            <NoteSidebarSearch search={search} setSearch={setSearch}  />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                {isPending && <strong>Loading notes...</strong>}
                {error && <strong>{error}</strong>}
                {!isPending && filteredNotes && <strong>Found {filteredNotes.length} notes:</strong>}
                <div style={{ width: "1.5rem", height: "1.5rem" }} onClick={() => setSidebarOpen(false)}>
                    <CrossIcon color="rgba(255, 255, 255, 0.8)" />
                </div>
            </div>
            <ul>
                <NoteSidebarNewNote selectedCategory={selectedCategory} notesByCategoryFetch={notesByCategoryFetch} />
                {
                    filteredNotes &&
                    <>
                        {filteredNotes.map((item: NoteCompact) => (
                            <NoteListItem key={item.guid} guid={item.guid} title={item.title} active={item.guid === guid} />
                        ))}
                    </>
                }
            </ul>
        </div>
    )
}