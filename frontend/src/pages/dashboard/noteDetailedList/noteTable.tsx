import { NoteCompact } from "../../../types"
import NoteTableRow from "./noteTableRow";

type PostsTableProps = {
    data: NoteCompact[];
    sortByKey: keyof NoteCompact;
    setSortByKey: React.Dispatch<React.SetStateAction<keyof NoteCompact>>;
    sortDirection: "asc" | "desc";
    setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

export default function NoteTable({ data, sortByKey, setSortByKey, sortDirection, setSortDirection }: PostsTableProps) {
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
                    <NoteTableRow note={note} />
                ))}
            </tbody>
        </table>
    )
}