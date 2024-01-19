import { useState } from "react"
import CategoryList from "./CategoryList";
import NotesList from "./NotesList";

type category = {
    guid: string;
    parentGuid: string | null;
    name: string;
}

export default function Default() {
    const [selectedCategory, setSelectedCategory] = useState<category | null>(null);

    return (
        <main className="notes-browser">
            <section className="category-list">
                <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </section>
            <section className="notelist-details">
                <NotesList selectedCategory={selectedCategory} />
            </section>
        </main>
    )
}