import useFetchData from '../../hooks/useFetchData';
import NotesListItem from './NotesListItem';

type noteCompact = {
    guid: string;
    title: string;
    categoryGuid: string;
    categoryName: string;
    dateAdded: Date;
    lastChanged: Date;
}

type timestampProps = {
    refreshTimestap: number;
}

export default function LatestNotes({refreshTimestap}:timestampProps) {

    const { data: noteList, isPending, error } = useFetchData<noteCompact[]>("/GetNotes", [refreshTimestap]);

    return (
        <>
            {isPending && <div>Loading notes...</div>}
            {error && <div>{error}</div>}
            {
                noteList &&
                <ul>
                    {noteList.map((item: noteCompact) => (
                        <NotesListItem key={item.guid} guid={item.guid} title={item.title} categoryGuid={item.categoryGuid} categoryName={item.categoryName} dateAdded={item.dateAdded} lastChanged={item.lastChanged} />
                    ))}
                </ul>
            }
        </>
    );
}