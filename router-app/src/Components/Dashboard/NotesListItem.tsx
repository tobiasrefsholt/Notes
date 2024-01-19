import { useNavigate } from "react-router-dom";

type NotesListItemProps = {
    guid: string;
    title: string;
    categoryGuid: string;
    categoryName: string;
    dateAdded: Date;
    lastChanged: Date;
}

export default function NotesListItem({ guid, title, categoryGuid, categoryName }: NotesListItemProps) {
    const navigate = useNavigate();
    return (
        <li onClick={() => { navigate("/note/" + guid) }}>
            <h4 className="list-item-header">{title}</h4>
            <span className="sidebar-category">{categoryName}</span>
        </li>
    )
}