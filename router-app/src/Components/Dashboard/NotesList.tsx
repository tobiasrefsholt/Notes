import useFetchData from "../../hooks/useFetchData";
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
    const { data, isPending, error } = useFetchData<noteCompact[]>("/GetNotesByCategory/" + selectedCategory?.guid || "null", [selectedCategory?.guid])

    const navigate = useNavigate();

    return (
        <>
            <h1>{selectedCategory !== null ? `Notes with category "${selectedCategory.name}"` : `Uncategorized notes`}</h1>
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
                            <tr key={note.categoryGuid} onClick={() => navigate("/note/" + note.guid)}>
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