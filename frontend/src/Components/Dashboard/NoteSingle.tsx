import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useNavigate, useParams } from 'react-router-dom';
import useFetch, { ApiEndpoint } from '../../hooks/useFetch';
import CategoryDropdown from './CategoryDropdown';
import { InsertNote, Note, category } from '../../types';
import { useDashboardContext } from '../../pages/Dashboard';
import getCategory from '../../hooks/useGetCategory';
import NoteSidebar from './NoteSidebar';
import GoBackIcon from '../SVGs/GoBackIcon';

export default function NoteSingle() {
    const { guid } = useParams();
    const { selectedCategory, setSelectedCategory, categoriesFetch, notesByCategoryFetch } = useDashboardContext();
    const [noteCategory, setNoteCategory] = useState<category | null>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string | undefined>();
    const noteFetch = useFetch<Note>(ApiEndpoint.GetNotes, []);
    const saveFetch = useFetch<boolean>(ApiEndpoint.UpdateNote, [guid, title, content], "Unable to save note");
    const deleteFetch = useFetch<boolean>(ApiEndpoint.DeleteNote, [guid], "Unable to delete note");
    const navigate = useNavigate();

    // Runs when loading new note
    useEffect(() => {
        if (!guid) return;
        noteFetch.doFetch("GET", [guid]);
    }, [guid]);

    // Runs when fetch response changes
    useEffect(() => {
        setTitle(noteFetch.data?.title || "");
        setContent(noteFetch.data?.content || "");
        const fetchedNoteCategory = getCategory(categoriesFetch.data, noteFetch.data?.categoryGuid || null);
        if (fetchedNoteCategory.guid !== selectedCategory?.guid)
            setSelectedCategory(fetchedNoteCategory);
        setNoteCategory(fetchedNoteCategory);
    }, [noteFetch.data?.guid])

    function handleKeyboardShortcuts(event: React.KeyboardEvent) {
        // Close on escape
        if (event.key === "Escape") {
            navigate("/");
        }

        // Save with ctrl + S
        if (event.ctrlKey && event.code == "KeyS") {
            event.preventDefault();
            handleSaveNote();
        }
    }

    function handleSaveNote() {
        if (!guid) return;
        const requestBody: InsertNote = {
            guid,
            title,
            content,
            categoryGuid: noteFetch.data?.categoryGuid
        }
        saveFetch.doFetch("POST", [], requestBody);
    }

    function handleDeleteNote() {
        if (!guid) return;
        deleteFetch.doFetch("POST", [guid], null, true, () => {
            categoriesFetch.doFetch("GET");
        })
    }

    function handleChangeCategory(category: category) {
        const requestBody: InsertNote = {
            guid: guid,
            categoryGuid: category.guid
        }
        saveFetch.doFetch("POST", [], requestBody);
        setNoteCategory(category);
        setSelectedCategory(category);
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

    return (
        <main className='dashboard-sigle-note' onKeyDown={(event) => handleKeyboardShortcuts(event)}>
            <NoteSidebar selectedCategory={selectedCategory} notesByCategoryFetch={notesByCategoryFetch} />
            {!deleteFetch.data && <div className='editor'>
                <div className="note-toolbar">
                    <div style={{ width: "2rem", height: "2rem" }} onClick={() => navigate("/")}>
                        <GoBackIcon color='#ffffff' />
                    </div>
                    {noteFetch.isPending && <HeaderInput title={"Loading note content..."} setTitle={setTitle} />}
                    {noteFetch.error && <HeaderInput title={noteFetch.error} setTitle={setTitle} />}
                    {!noteFetch.isPending && !noteFetch.error && <HeaderInput title={title} setTitle={setTitle} />}
                    <div className='buttons'>
                        {statusMessages}
                        <CategoryDropdown
                            selectedCategory={noteCategory}
                            categoriesFetch={categoriesFetch}
                            excludeGuid={undefined}
                            action={handleChangeCategory}
                        />
                        <button className="button button-primary" onClick={() => handleSaveNote()}>Save</button>
                        <button className="button button-secondary" onClick={() => handleDeleteNote()}>Delete</button>
                    </div>
                </div>
                <MDEditor value={content} onChange={setContent} visibleDragbar={false} autoFocus={true} data-color-mode='dark'/>
            </div>}
            {deleteFetch.data && <h1>Note was deleted</h1>}
        </main>
    );
}

type HeaderProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

function HeaderInput({ title, setTitle }: HeaderProps) {
    return (
        <input className='note-heading' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
    )
}