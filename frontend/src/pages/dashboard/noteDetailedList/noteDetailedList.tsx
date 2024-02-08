import { useDashboardContext } from "../dashboard";
import NoteTable from "./noteTable";
import { useEffect, useState } from "react";
import NewNoteCard from "../../../components/newNoteCard/newNoteCard";
import SearchNotesCard from "../../../components/searchNotesCard/searchNotesCard";
import { NoteCompact } from "../../../types";
import { orderBy } from "lodash";

export default function NoteDetailedList() {
    const { selectedCategory, notesByCategoryFetch } = useDashboardContext();
    const { data, isPending, error } = notesByCategoryFetch;
    const [search, setSearch] = useState<string>("");
    const [filteredNotes, setFilteredNotes] = useState<NoteCompact[] | null>(null);
    const [sortByKey, setSortByKey] = useState<keyof NoteCompact>("title");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    // Update search result on input change and on load
    useEffect(() => {
        const filteredData = data?.filter((note) => note.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) || null;
        const sortedData = orderBy(filteredData, (a) => a[sortByKey], [sortDirection]);
        setFilteredNotes(sortedData);
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
            </ul>
            <section className="notelist-details">
                {filteredNotes && <NoteTable data={filteredNotes} sortByKey={sortByKey} setSortByKey={setSortByKey} sortDirection={sortDirection} setSortDirection={setSortDirection} />}
            </section>
        </main>
    )
}