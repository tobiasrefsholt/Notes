import { category } from "../../types";

type Props = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
    selectedCategory: category | null;
}

export default function SearchNotesCard({ search, setSearch, selectedCategory }: Props) {

    function handleClearSearch(): void {
        setSearch("");
    }

    return (
        <li className="note-list-item new-note-list-item">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Escape") handleClearSearch() }}
                placeholder={`Search ${selectedCategory?.name || "Uncategorized"}`}
            />
            {search && <button className="button button-primary" onClick={() => handleClearSearch()}>Clear search</button>}
        </li>
    )
}