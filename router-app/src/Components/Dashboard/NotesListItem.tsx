import { useNavigate } from "react-router-dom";

type NotesListItemProps = {
    guid: string;
    title: string;
    tags: string[];
}

export default function NotesListItem({ guid, title, tags }: NotesListItemProps) {
    const navigate = useNavigate();
    return (
        <li onClick={() => { navigate("/note/" + guid) }}>
            <h4>{title}</h4>
            <div className='sidebar-categories'>
                {tags.map((tag, index: number) => (
                    <span key={index}>{tag}</span>
                ))}
            </div>
        </li>
    )
}