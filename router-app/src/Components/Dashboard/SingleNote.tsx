import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import CategoryDropdown from './CategoryDropdown';
import { InsertNote, Note } from '../../types';
import { useCategoriesContext } from '../../pages/Dashboard';

export default function SingleNote() {
    const { guid } = useParams();
    const categoriesFetch = useCategoriesContext();
    const noteFetch = useFetch<Note>("/GetNotes", []);
    const saveFetch = useFetch<boolean>("/UpdateNote", [], "Unable to save note");
    const deleteFetch = useFetch<boolean>("/DeleteNote", [], "Unable to delete note");

    const [title, setTitle] = useState<string | undefined>();
    const [content, setContent] = useState<string | undefined>();

    useEffect(() => {
        if (!guid) return;
        noteFetch.doFetch("GET", [guid]);
    }, [guid])

    useEffect(() => {
        setTitle(noteFetch.data?.title);
        setContent(noteFetch.data?.content);
    }, [noteFetch.data])

    const handleSaveNote = () => {
        if (!guid) return;
        const requestBody: InsertNote = {
            guid,
            title,
            content,
            categoryGuid: noteFetch.data?.categoryGuid
        }
        saveFetch.doFetch("POST", [], requestBody);
    }

    const handleDeleteNote = () => {
        if (!guid) return;
        deleteFetch.doFetch("GET", [guid])
    }

    const statusMessages = (
        <>
            {saveFetch.isPending && <span>Saving...</span>}
            {saveFetch.error && <span>{saveFetch.error}</span>}
            {saveFetch.data && <span>Successfully saved</span>}
            {deleteFetch.isPending && <span>Deleting note...</span>}
            {deleteFetch.error && <span>{deleteFetch.error}</span>}
        </>
    )

    const editView = (
        <>
            <div className="note-toolbar">
                <input className='note-heading' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className='toolbar-buttons'>
                    {statusMessages}
                    <CategoryDropdown note={noteFetch.data} categoriesFetch={categoriesFetch} />
                    <button onClick={handleSaveNote} disabled={(noteFetch.isPending || (saveFetch.data || false)).valueOf()}>Save</button>
                    <button onClick={handleDeleteNote}>Delete</button>
                </div>
            </div>
            <MDEditor value={content} onChange={setContent} visibleDragbar={false} />
        </>
    )

    return (
        <>
            <main className='dashboard-sigle-note'>
                {noteFetch.isPending && <div>Loading note content...</div>}
                {noteFetch.error && <div>{noteFetch.error}</div>}
                {deleteFetch.data && <h1>Note was deleted</h1>}
                {noteFetch.data && !deleteFetch.data && !noteFetch.error && editView}
            </main>
        </>
    );
}