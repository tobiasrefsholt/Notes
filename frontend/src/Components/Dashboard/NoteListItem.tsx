import { useNavigate } from "react-router-dom";

type NotesListItemProps = {
    guid: string;
    title: string;
    categoryName?: string;
}

export default function NoteListItem({ guid, title, categoryName = undefined }: NotesListItemProps) {
    const navigate = useNavigate();
    return (
        <li onClick={() => { navigate("/note/" + guid) }}>
            <h4 className="list-item-header">{title}</h4>
            {categoryName && <span className="sidebar-category">{categoryName}</span>}
        </li>
    )
}