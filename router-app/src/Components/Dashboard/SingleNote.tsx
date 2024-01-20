import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useParams } from 'react-router-dom';
import useSaveNote from '../../hooks/useSaveNote';
import useDeleteNote from '../../hooks/useDeleteNote';
import useFetch from '../../hooks/useFetch';

type Note = {
    guid: string;
    title?: string;
    content?: string;
    CategoryGuid?: string | null;
    CategoryName?: string | null;
    dateAdded?: Date;
    LastChanged?: Date;
}

export default function SingleNote() {
    const { guid } = useParams();
    const { data, isPending, error, doFetch } = useFetch<Note>("/GetNotes", []);

    useEffect(()=>{
        if (!guid) return;
        doFetch("GET", [guid]);
    }, [guid])

    const [title, setTitle] = useState<string | undefined>("");
    const [value, setValue] = useState<string | undefined>("");

    useEffect(() => {
        setTitle(data?.title);
        setValue(data?.content);
    }, [data])

    const { saveError, saveIsPending, saveIsDone, save } = useSaveNote([guid, title, value]);

    const saveChanges = () => {
        if (!guid) return;
        save({
            guid,
            title,
            content: value
        })
    }

    const { deleteError, deleteIsPending, deleteIsDone, deleteNote } = useDeleteNote([guid, title, value]);

    const handleDeleteNote = () => {
        if (!guid) return;
        deleteNote(guid);
    }

    const statusMessages = (
        <>
            {saveIsPending && <span>Saving...</span>}
            {saveError && <span>{saveError}</span>}
            {saveIsDone && <span>Successfully saved</span>}
            {deleteIsPending && <span>Deleting note...</span>}
            {deleteError && <span>{deleteError}</span>}
        </>
    )

    const editView = (
        <>
            <div className="note-toolbar">
                <input className='note-heading' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className='toolbar-buttons'>
                    {statusMessages}
                    <button onClick={saveChanges} disabled={(isPending || saveIsDone).valueOf()}>Save</button>
                    <button onClick={handleDeleteNote}>Delete</button>
                </div>
            </div>
            <MDEditor value={value} onChange={setValue} visibleDragbar={false} />
        </>
    )

    return (
        <>
            <main className='dashboard-sigle-note'>
                {isPending && <div>Loading note content...</div>}
                {error && <div>{error}</div>}
                {deleteIsDone && <h1>Note was deleted</h1>}
                {data && !deleteIsDone && !error && editView}
            </main>
        </>
    );
}