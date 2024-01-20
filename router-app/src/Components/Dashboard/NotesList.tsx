import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

type NotesListProps = {
    selectedCategory: category | null;
}

type category = {
    guid: string;
    parentGuid: string | null;
    name: string;
}

type noteCompact = {
    guid: string;
    title: string;
    categoryGuid: string;
    categoryName: string;
    dateAdded: string;
    lastChanged: string;
}

export default function NotesList({ selectedCategory }: NotesListProps) {
    const { data, isPending, error, doFetch } = useFetch<noteCompact[]>("/GetNotesByCategory", []);

    useEffect(() => {
        doFetch("GET", [selectedCategory?.guid || ""]);
    }, [selectedCategory])

    const navigate = useNavigate();

    return (
        <>
            <h1>{selectedCategory !== null ? `${data?.length} Note(s) with category "${selectedCategory.name}"` : `${data?.length} Uncategorized note(s)`}</h1>
            {isPending && <span>Loading notes...</span>}
            {error && <span>{error}</span>}
            {
                data && !error && !isPending &&
                <table>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Last Changed</th>
                            <th>Date Added</th>
                        </tr>
                        {data?.map((note) => (
                            <tr key={note.dateAdded} onClick={() => navigate("/note/" + note.guid)}>
                                <td>
                                    {note.title}
                                </td>
                                <td>
                                    {note.categoryName}
                                </td>
                                <td>
                                    {note.lastChanged}
                                </td>
                                <td>
                                    {note.dateAdded}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}