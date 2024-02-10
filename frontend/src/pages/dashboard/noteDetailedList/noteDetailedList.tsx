import { useDashboardContext } from "../dashboard";
import NoteTable from "./noteTable";
import { useEffect, useState } from "react";
import NewNoteCard from "../../../components/newNoteCard/newNoteCard";
import SearchNotesCard from "../../../components/searchNotesCard/searchNotesCard";
import { NoteCompact } from "../../../types";
import ToggleIncludeSubcategories from "../../../components/toggleIncludeSubcategories/toggleIncludeSubcategories";

export default function NoteDetailedList() {
    const { selectedCategory, notesByCategoryFetch, includeSubcategories, setIncludeSubcategories } = useDashboardContext();
    const { data, isPending, error } = notesByCategoryFetch;
    const [search, setSearch] = useState<string>("");
    const [filteredNotes, setFilteredNotes] = useState<NoteCompact[] | null>(null);

    // Update search result on input change and on load
    useEffect(() => {
        const filteredData = data?.filter((note) => note.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) || null;
        setFilteredNotes(filteredData);
    }, [data, search])

    const headerText = selectedCategory !== null ? `${data?.length} Note(s) in category "${selectedCategory.name}"` : `${data?.length} Uncategorized note(s)`;

    return (
        <main className="category-browser">
            <h1>
                {filteredNotes && headerText}
                {isPending && <>Loading notes...</>}
                {error && <>{error}</>}
            </h1>
            <ul className="category-browser-toolbar">
                <NewNoteCard selectedCategory={selectedCategory} notesByCategoryFetch={notesByCategoryFetch} />
                <SearchNotesCard search={search} setSearch={setSearch} selectedCategory={selectedCategory} />
                <div style={{ marginLeft: "auto" }}>
                    <ToggleIncludeSubcategories includeSubcategories={includeSubcategories} setIncludeSubcategories={setIncludeSubcategories} />
                </div>
            </ul>
            <section className="notelist-details">
                {filteredNotes && <NoteTable data={filteredNotes} />}
            </section>
        </main>
    )
}