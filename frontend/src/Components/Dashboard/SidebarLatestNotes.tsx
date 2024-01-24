import { useEffect } from 'react';
import NoteListItem from './NoteListItem';
import useFetch from '../../hooks/useFetch';
import { NoteCompact } from '../../types';

export default function SidebarLatestNotes() {

    const { data: noteList, isPending, error, doFetch } = useFetch<NoteCompact[]>("/GetNotes", []);

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
                    {noteList.map((item: NoteCompact) => (
                        <NoteListItem key={item.guid} guid={item.guid} title={item.title} categoryName={item.categoryName} />
                    ))}
                </ul>
            }
        </>
    );
}