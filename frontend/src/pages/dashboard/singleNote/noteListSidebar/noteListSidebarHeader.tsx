import React from "react";
import CrossIcon from "../../../../components/icons/crossIcon";
import { NoteCompact } from "../../../../types";

type NotesListHeaderProps = {
    isPending: boolean;
    error: string | null;
    filteredNotes: NoteCompact[] | null;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NoteListSidebarHeader({ isPending, error, filteredNotes, setSidebarOpen }: NotesListHeaderProps) {
    return (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{}}>
                {isPending && <strong>Loading notes...</strong>}
                {error && <strong>{error}</strong>}
                {!isPending && filteredNotes && <strong>Found {filteredNotes.length} notes</strong>}
            </div>
            <div style={{ width: "1.5rem", height: "1.5rem"}} onClick={() => setSidebarOpen(false)}>
                <CrossIcon color="rgba(255, 255, 255, 0.8)" />
            </div>
        </div>
    );
};