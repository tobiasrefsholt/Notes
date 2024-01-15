import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type noteCompact = {
    guid: string;
    title: string;
    tags: string[];
    dateAdded: Date;
}

export default function NotesList() {

    const [noteList, setNoteList]: any = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        fetch("http://localhost:5214/GetNotes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setNoteList(data);
            })
    }, [])

    return (
        <ul>
            {noteList.map((item:noteCompact) => (
                <li key={item.guid}>
                    <h4>{item.title}</h4>
                    <span>{item.tags}</span>
                </li>
            ))}
        </ul>
    );
}