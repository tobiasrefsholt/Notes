import { useNavigate } from "react-router-dom";
import { NoteCompact } from "../../types"

type PostsTableProps = {
    data: NoteCompact[];
}

export default function NoteTable({data}:PostsTableProps) {
    const navigate = useNavigate();
    return (
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
    )
}