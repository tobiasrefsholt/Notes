import { useEffect } from 'react';
import NoteListItem from './NoteListItem';
import useFetch from '../../hooks/useFetch';

type noteCompact = {
    guid: string;
    title: string;
    categoryGuid: string;
    categoryName: string;
    dateAdded: Date;
    lastChanged: Date;
}

export default function SidebarLatestNotes() {

    const { data: noteList, isPending, error, doFetch } = useFetch<noteCompact[]>("/GetNotes", []);

    useEffect(() => {
        doFetch("GET");
    }, [])

    return (
        <>
            {isPending && <div>Loading notes...</div>}
            {error && <div>{error}</div>}
            {
                noteList &&
                <ul>
                    {noteList.map((item: noteCompact) => (
                        <NoteListItem key={item.guid} guid={item.guid} title={item.title} categoryName={item.categoryName} dateAdded={item.dateAdded} lastChanged={item.lastChanged} />
                    ))}
                </ul>
            }
        </>
    );
}