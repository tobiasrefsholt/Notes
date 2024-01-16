import useFetchData from '../../hooks/useFetchData';
import NotesListItem from './NotesListItem';

type noteCompact = {
    guid: string;
    title: string;
    tags: string[];
    dateAdded: Date;
}

export default function NotesList() {

    const {data: noteList, isPending, error } = useFetchData("/GetNotes", []);

    return (
        <>
            {isPending && <div>Loading notes...</div>}
            {error && <div>{error}</div>}
            <ul>
                {noteList.map((item:noteCompact) => (
                    <NotesListItem key={item.guid} title={item.title} tags={item.tags} />
                ))}
            </ul>
        </>
    );
}