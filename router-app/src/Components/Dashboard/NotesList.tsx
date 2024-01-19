type NotesListProps = {
    selectedCategory: category | null;
}

type category = {
    guid: string;
    parentGuid: string | null;
    name: string;
}

export default function NotesList({selectedCategory}:NotesListProps) {
    return (
        <h1>{selectedCategory !== null ? `Notes with category "${selectedCategory.name}"` : `Uncategorized notes`}</h1>
    )
}