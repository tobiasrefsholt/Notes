import { useEffect, useState } from "react";
import { NoteCompact, SortBy } from "../../../types"
import NoteTableRow from "./noteTableRow";
import { orderBy } from "lodash";
import NoteTableSortableHeader from "./NoteTableSortableHeader";

type NoteTableProps = {
    data: NoteCompact[];
}

export default function NoteTable({ data }: NoteTableProps) {

    const [sortBy, setSortBy] = useState<SortBy>({ key: "title", direction: "asc" });
    const [sortedData, setSortedData] = useState(data);

    useEffect(() => {
        const sortedDatas = orderBy(data, (a) => a[sortBy.key], [sortBy.direction]);
        setSortedData(sortedDatas);
    }, [data, sortBy.direction, sortBy.key]);

    return (
        <table>
            <thead>
                <tr>
                    <NoteTableSortableHeader sortBy={sortBy} keyName="title" setSortBy={setSortBy}>Title</NoteTableSortableHeader>
                    <NoteTableSortableHeader sortBy={sortBy} keyName="categoryName" setSortBy={setSortBy}>Category</NoteTableSortableHeader>
                    <NoteTableSortableHeader sortBy={sortBy} keyName="lastChanged" setSortBy={setSortBy}>Last Changed</NoteTableSortableHeader>
                    <NoteTableSortableHeader sortBy={sortBy} keyName="dateAdded" setSortBy={setSortBy}>Date Added</NoteTableSortableHeader>
                </tr>
            </thead>
            <tbody>
                {sortedData?.map((note) => (
                    <NoteTableRow key={note.guid} note={note} />
                ))}
            </tbody>
        </table>
    )
}