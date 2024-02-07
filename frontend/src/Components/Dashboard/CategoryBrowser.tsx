import { useDashboardContext } from "../../pages/Dashboard";
import NoteTable from "./NoteTable";
import { useEffect, useState } from "react";
import NoteSidebarNewNote from "./NoteSidebarNewNote";
import NoteSidebarSearch from "./NoteSidebarSearch";
import { NoteCompact } from "../../types";

export default function CategoryBrowser() {
    const { selectedCategory, notesByCategoryFetch } = useDashboardContext();
    const { data, isPending, error } = notesByCategoryFetch;
    const [search, setSearch] = useState<string>("");
    const [filteredNotes, setFilteredNotes] = useState<NoteCompact[] | null>(null);

    // Update search result on input change and on load
    useEffect(() => {
        if (!search) {
            setFilteredNotes(data);
            return;
        }
        const result = data?.filter((note) => note.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) || null;
        setFilteredNotes(result);
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
                <NoteSidebarNewNote selectedCategory={selectedCategory} notesByCategoryFetch={notesByCategoryFetch} />
                <NoteSidebarSearch search={search} setSearch={setSearch} selectedCategory={selectedCategory} />
            </ul>
            <section className="notelist-details">
                {filteredNotes && <NoteTable data={filteredNotes} />}
            </section>
        </main>
    )
}