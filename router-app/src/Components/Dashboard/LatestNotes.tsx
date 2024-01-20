import { useEffect } from 'react';
import NotesListItem from './NotesListItem';
import useFetch from '../../hooks/useFetch';

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

    const { data: noteList, isPending, error, doFetch } = useFetch<noteCompact[]>("/GetNotes", [refreshTimestap]);

    useEffect(()=>{
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
                        <NotesListItem key={item.guid} guid={item.guid} title={item.title} categoryGuid={item.categoryGuid} categoryName={item.categoryName} dateAdded={item.dateAdded} lastChanged={item.lastChanged} />
                    ))}
                </ul>
            }
        </>
    );
}