import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { NoteCompact, category } from "../../types";
import NoteListItem from "./NoteListItem";
import { useParams } from "react-router-dom";

type NoteSidebarProps = {
    selectedCategory: category | null;
}

export default function NoteSidebar({ selectedCategory }: NoteSidebarProps) {
    const { error, isPending, data, doFetch } = useFetch<NoteCompact[]>("/GetNotesByCategory", []);
    const {guid} = useParams();

    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""])
    }, [selectedCategory])

    return (
        <>
            {isPending && <strong>Loading notes...</strong>}
            {error && <strong>{error}</strong>}
            {
                data &&
                <>
                    <strong>Found {data.length} notes:</strong>
                    <hr />
                    <ul>
                        {data.map((item: NoteCompact) => (
                            <NoteListItem key={item.guid} guid={item.guid} title={item.title} active={item.guid === guid}/>
                        ))}
                    </ul>
                </>
            }
        </>
    )
}