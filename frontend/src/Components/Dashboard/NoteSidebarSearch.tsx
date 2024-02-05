type Props = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function NoteSidebarSearch({search, setSearch}:Props) {
    return (
        <div className="note-list-item new-note-list-item">
            <strong>Search by title:</strong><br />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}