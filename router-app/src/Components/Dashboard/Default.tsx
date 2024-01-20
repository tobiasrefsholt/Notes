import { useState } from "react"
import CategoryList from "./CategoryList";
import NotesList from "./NotesList";
import AddCategory from "./AddCategory";
import { category } from "../../types";

export default function Default() {
    const [selectedCategory, setSelectedCategory] = useState<category | null>(null);
    const [showAddCategory, setShowAddCategory] = useState(false);

    return (
        <main className="notes-browser">
            <section className="category-list">
                <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setShowAddCategory={setShowAddCategory} />
            </section>
            {
                !showAddCategory &&
                <section className="notelist-details">
                    <NotesList selectedCategory={selectedCategory} />
                </section>
            }
            {
                showAddCategory &&
                <section>
                    <AddCategory selectedCategory={selectedCategory} setShowAddCategory={setShowAddCategory} />
                </section>
            }
        </main>
    )
}