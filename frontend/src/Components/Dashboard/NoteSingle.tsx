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
    const { selectedCategory, setSelectedCategory, categoriesFetch } = useDashboardContext();
    const [noteCategory, setNoteCategory] = useState<category | null>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string | undefined>();
    const noteFetch = useFetch<Note>(ApiEndpoint.GetNotes, []);
    const saveFetch = useFetch<boolean>(ApiEndpoint.UpdateNote, [guid, title, content], "Unable to save note");
    const deleteFetch = useFetch<boolean>(ApiEndpoint.DeleteCategory, [guid], "Unable to delete note");
    const navigate = useNavigate();

    // Runs when loading new note
    useEffect(() => {
        if (!guid) return;
        noteFetch.doFetch("GET", [guid]);
        window.addEventListener("keydown", handleKeyboardShortcuts);
        return () => {
            window.removeEventListener("keydown", handleKeyboardShortcuts);
        }
    }, [guid]);

    // Runs when fetch response changes
    useEffect(() => {
        setTitle(noteFetch.data?.title || "");
        setContent(noteFetch.data?.content || "");
        const fetchedNoteCategory = getCategory(categoriesFetch.data, noteFetch.data?.categoryGuid || null);
        setSelectedCategory(fetchedNoteCategory);
        setNoteCategory(fetchedNoteCategory);
    }, [noteFetch.data])

    function handleKeyboardShortcuts(event: KeyboardEvent) {
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
        deleteFetch.doFetch("POST", [guid])
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
        <main className='dashboard-sigle-note'>
            <NoteSidebar selectedCategory={selectedCategory} categoriesFetch={categoriesFetch} />
            {!deleteFetch.data && <div className='editor'>
                <div className="note-toolbar">
                    <div style={{ width: "2rem", height: "2rem" }} onClick={() => navigate("/")}>
                        <GoBackIcon color='#ffffff' />
                    </div>
                    {noteFetch.isPending && <HeaderInput title={"Loading note content..."} setTitle={setTitle} />}
                    {noteFetch.error && <HeaderInput title={noteFetch.error} setTitle={setTitle} />}
                    {!noteFetch.isPending && !noteFetch.error && <HeaderInput title={title} setTitle={setTitle} />}
                    <div className='toolbar-buttons'>
                        {statusMessages}
                        <CategoryDropdown
                            selectedCategory={noteCategory}
                            categoriesFetch={categoriesFetch}
                            excludeGuid={undefined}
                            action={handleChangeCategory}
                        />
                        <button onClick={handleSaveNote}>Save</button>
                        <button onClick={handleDeleteNote}>Delete</button>
                    </div>
                </div>
                <MDEditor value={content} onChange={setContent} visibleDragbar={false} />
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