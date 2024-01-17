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
    const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

    useEffect(() => {
        setValue(data?.content);
    }, [data?.content])

    return (
        <>
            {isPending && <div>Loading note content...</div>}
            {error && <div>{error}</div>}
            {
                data &&
                <div className='dashboard-sigle-note'>
                    <h1>{data.title}</h1>
                    <MDEditor value={value} onChange={setValue} />
                </div>
            }
        </>
    );
}