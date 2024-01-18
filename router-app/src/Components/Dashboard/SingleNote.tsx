import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import useFetchData from '../../hooks/useFetchData';
import { useParams } from 'react-router-dom';

type Note = {
    guid: string;
    content: string;
    title: string;
    tags: string[];
    dateAdded: Date;
}

export default function SingleNote() {
    const { guid } = useParams();
    const { data, isPending, error } = useFetchData<Note>("/GetNotes/" + guid, [guid]);

    const [title, setTitle] = useState<string | undefined>("Untitled");
    const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

    useEffect(() => {
        setTitle(data?.title);
        setValue(data?.content);
    }, [data])


    return (
        <>
            {isPending && <div>Loading note content...</div>}
            {error && <div>{error}</div>}
            {
                data &&
                <main className='dashboard-sigle-note'>
                    <div className="note-toolbar">
                        <input className='note-heading' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <div className='toolbar-buttons'>
                            <button>Save</button>
                            <button>Rename</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <MDEditor value={value} onChange={setValue} visibleDragbar={false} />
                </main>
            }
        </>
    );
}