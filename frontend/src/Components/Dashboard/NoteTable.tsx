import { useNavigate } from "react-router-dom";
import { NoteCompact } from "../../types"

type PostsTableProps = {
    data: NoteCompact[];
}

export default function NoteTable({ data }: PostsTableProps) {
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
                    <tr key={note.guid} onClick={() => navigate("/note/" + note.guid)}>
                        <td>
                            {note.title}
                        </td>
                        <td>
                            {note.categoryName}
                        </td>
                        <td>
                            <DisplayTimeSinceDate dateStr={note.lastChanged} />
                        </td>
                        <td>
                            <DisplayIsoDate dateStr={note.dateAdded} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

type DateProps = {
    dateStr: string;
}

function DisplayTimeSinceDate({ dateStr }: DateProps) {
    const currentDate = new Date();
    const date = convertUTCDateToLocalDate(new Date(dateStr));
    const difference = currentDate.getTime() - date.getTime();

    // Less than 1 minute
    if (difference < 60 * 1000) {
        return "Less than minute ago";
    }

    // Less than 1 hour
    if (difference < 60 * 60 * 1000) {
        return Math.floor(difference / 1000 / 60) + " minutes ago";
    }

    // Less than 24 hours
    if (difference < 24 * 60 * 60 * 1000) {
        return Math.floor(difference / 1000 / 60 / 60) + " hours ago";
    }

    // Less than 1 week
    if (difference < 7 * 24 * 60 * 60 * 1000) {
        return Math.floor(difference / 1000 / 60 / 60 / 24) + " days ago";
    }

    return date.toDateString();
}

function convertUTCDateToLocalDate(date: Date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

function DisplayIsoDate({ dateStr }: DateProps) {
    const date = new Date(dateStr);
    return date.toISOString().substring(0, 10);
}