import { useEffect, useState } from "react";
import { FetchResponse, NoteCompact, category } from "../../../../types";
import NoteListItem from "../../../../components/noteListItem/noteListItem";
import { useParams } from "react-router-dom";
import CrossIcon from "../../../../components/icons/crossIcon";
import NewNoteCard from "../../../../components/newNoteCard/newNoteCard";
import SearchNotesCard from "../../../../components/searchNotesCard/searchNotesCard";

type NoteSidebarProps = {
    notesByCategoryFetch: FetchResponse<NoteCompact[]>
    selectedCategory: category | null;
}

export default function NoteListSidebar({ selectedCategory, notesByCategoryFetch }: NoteSidebarProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { error, isPending, data } = notesByCategoryFetch;
    const { guid } = useParams();

    const [search, setSearch] = useState<string>("");
    const [filteredNotes, setFilteredNotes] = useState<NoteCompact[] | null>(null);

    // Fetch data and reset seaech on load and category change
    useEffect(() => {
        setSidebarOpen(true);
        setSearch("");
    }, [selectedCategory?.guid])

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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong>Actions</strong>
                <div style={{ width: "1.5rem", height: "1.5rem" }} onClick={() => setSidebarOpen(false)}>
                    <CrossIcon color="rgba(255, 255, 255, 0.8)" />
                </div>
            </div>
            <ul>
                <SearchNotesCard search={search} setSearch={setSearch} selectedCategory={selectedCategory} />
                <NewNoteCard selectedCategory={selectedCategory} notesByCategoryFetch={notesByCategoryFetch} />
            </ul>
            <div style={{}}>
                {isPending && <strong>Loading notes...</strong>}
                {error && <strong>{error}</strong>}
                {!isPending && filteredNotes && <strong>Found {filteredNotes.length} notes:</strong>}
            </div>
            <ul>
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