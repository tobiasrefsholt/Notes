import { useNavigate } from "react-router-dom";

type NotesListItemProps = {
    guid: string;
    title: string;
    active: boolean;
    categoryName?: string;
}

export default function NoteListItem({ guid, title, active, categoryName = undefined }: NotesListItemProps) {
    const navigate = useNavigate();
    const className = active ? "note-list-item selected" : "note-list-item";
    return (
        <li className={className} onClick={() => { navigate("/note/" + guid) }}>
            <strong className="list-item-header">{title}</strong><br />
            {categoryName && <span className="sidebar-category">{categoryName}</span>}
        </li>
    )
}