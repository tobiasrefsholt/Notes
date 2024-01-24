import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { NoteCompact, category } from "../../types";
import NoteListItem from "./NoteListItem";

type NoteSidebarProps = {
    selectedCategory: category | null;
}

export default function NoteSidebar({ selectedCategory }: NoteSidebarProps) {
    const { error, isPending, data, doFetch } = useFetch<NoteCompact[]>("/GetNotesByCategory", []);

    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""])
    }, [selectedCategory])

    return (
        <>
            {isPending && <div>Loading notes...</div>}
            {error && <div>{error}</div>}
            {
                data &&
                <ul>
                    {data.map((item: NoteCompact) => (
                        <NoteListItem key={item.guid} guid={item.guid} title={item.title} />
                    ))}
                </ul>
            }
        </>
    )
}