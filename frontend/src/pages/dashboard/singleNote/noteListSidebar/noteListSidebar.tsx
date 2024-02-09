import { useEffect, useState } from "react";
import { FetchResponse, NoteCompact, category } from "../../../../types";
import { useParams } from "react-router-dom";
import NewNoteCard from "../../../../components/newNoteCard/newNoteCard";
import SearchNotesCard from "../../../../components/searchNotesCard/searchNotesCard";
import ContentCard from "../../../../components/ui/contetCard";
import NoteListSidebarHeader from "./noteListSidebarHeader";
import NoteCardList from "./noteCardList";

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
            <NoteListSidebarHeader isPending={isPending} error={error} filteredNotes={filteredNotes} setSidebarOpen={setSidebarOpen} />
            <ContentCard style={{ backgroundColor: selectedCategory?.color + "10" }}>
                <ul className="note-card-list">
                    <SearchNotesCard search={search} setSearch={setSearch} selectedCategory={selectedCategory} />
                    <NewNoteCard selectedCategory={selectedCategory} notesByCategoryFetch={notesByCategoryFetch} useCategoryColor={false} />
                </ul>
            </ContentCard>
            <NoteCardList notes={filteredNotes} active={guid} />
        </div>
    )
}