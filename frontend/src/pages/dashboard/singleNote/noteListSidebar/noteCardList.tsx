import NoteListItem from "../../../../components/noteListItem/noteListItem";
import { NoteCompact } from "../../../../types";

type NoteCardListProps = {
    notes: NoteCompact[] | null;
    active: string | undefined;
}

export default function NoteCardList({ notes, active }: NoteCardListProps) {
    return (
        <ul className="note-card-list">
            {
                notes &&
                <>
                    {notes.map((item: NoteCompact) => (
                        <NoteListItem key={item.guid} guid={item.guid} title={item.title} active={item.guid === active} />
                    ))}
                </>
            }
        </ul>
    )
}