import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { category, NoteCompact } from "../../types";
import NotesTable from "./NotesTable";

type NotesListProps = {
    selectedCategory: category | null;
}

export default function NotesList({ selectedCategory }: NotesListProps) {
    const { data, isPending, error, doFetch } = useFetch<NoteCompact[]>("/GetNotesByCategory", []);

    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""]);
    }, [selectedCategory])

    const headerText = selectedCategory !== null ? `${data?.length} Note(s) with category "${selectedCategory.name}"` : `${data?.length} Uncategorized note(s)`;

    return (
        <>
            <h1>
                {data && headerText}
                {isPending && <>Loading notes...</>}
                {error && <>{error}</>}
            </h1>
            {data && <NotesTable data={data} />}
        </>
    )
}