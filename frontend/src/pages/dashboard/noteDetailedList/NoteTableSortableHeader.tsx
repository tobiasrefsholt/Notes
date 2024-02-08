import React from "react";
import { NoteCompact, SortBy } from "../../../types";

type NoteTableSortableHeaderProps = {
    children: React.ReactNode;
    sortBy: SortBy;
    keyName: keyof NoteCompact;
    setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
}

export default function noteTableHeader({ children, sortBy, keyName, setSortBy }: NoteTableSortableHeaderProps) {

    const isSorted = sortBy.key === keyName;

    function handleSortChange() {
        // If the column is already sorted, reverse the direction
        if (isSorted) {
            setSortBy({ key: keyName, direction: sortBy.direction === "asc" ? "desc" : "asc" });
            return
        }

        // If the column is not sorted, sort it in ascending order
        setSortBy({ key: keyName, direction: "asc" });
    }

    return (
        <th onClick={() => handleSortChange()}>
            {children}
            {isSorted && <SortArrow direction={sortBy.direction} />}
        </th>
    )
}

function SortArrow({ direction }: { direction: "asc" | "desc" }) {
    return (
        <span> {direction === "asc" ? "▲" : "▼"}</span>
    )
}