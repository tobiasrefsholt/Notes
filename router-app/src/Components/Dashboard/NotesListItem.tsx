type NotesListItemProps = {
    title: string;
    tags: string[];
}

export default function NotesListItem({ title, tags }: NotesListItemProps) {
    return (
        <li>
            <h4>{title}</h4>
            <div className='sidebar-categories'>
                {tags.map((tag, index:number) => (
                    <span key={index}>{tag}</span>
                ))}
            </div>
        </li>
    )
}