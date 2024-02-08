import { DisplayIsoDate, DisplayTimeSinceDate } from "../../../components/date/dateFormat";
import { NoteCompact } from "../../../types"
import { useNavigate } from "react-router-dom";

type NoteTableRowProps = {
    note: NoteCompact;
}

export default function NoteTableRow({note}:NoteTableRowProps) {
    const navigate = useNavigate();
    return (
        <tr onClick={() => navigate("/note/" + note.guid)}>
            <td>
                {note.title}
            </td>
            <td>
                {note.categoryName || "Uncategorized"}
            </td>
            <td>
                <DisplayTimeSinceDate dateStr={note.lastChanged} />
            </td>
            <td>
                <DisplayIsoDate dateStr={note.dateAdded} />
            </td>
        </tr>
    )
}