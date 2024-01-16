import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useSelectedNote } from '../../pages/Dashboard';
import Cookies from 'js-cookie';
import useFetchData from '../../hooks/useFetchData';

type Note = {
    guid: string;
    content: string;
    title: string;
    tags: string[];
    dateAdded: Date;
}

export default function SingleNote() {
    const { selectedNote } = useSelectedNote();
    console.log(selectedNote);
    const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
    const { data, isPending, error } = useFetchData("/GetNotes/" + selectedNote, [selectedNote]);
    const { title, content }: Note = data;

    /* if (!selectedNote) return (
        <h1>No selected note</h1>
    ) */

    return (
        <div className='dashboard-sigle-note'>
            <h1>{title}</h1>
            <MDEditor value={value} onChange={setValue} />
        </div>
    );
}