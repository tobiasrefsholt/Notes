import { useState } from "react"
import CategoryList from "./CategoryList";
import NotesList from "./NotesList";
import AddCategory from "./AddCategory";
import { category } from "../../types";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

export default function Default() {
    const [selectedCategory, setSelectedCategory] = useState<category | null>(null);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(0);

    return (
        <main className="notes-browser">
            <section className="category-list">
                <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setShowAddCategory={setShowAddCategory} setShowEditCategory={setShowEditCategory} lastUpdate={lastUpdate} />
            </section>
            {
                !showAddCategory &&
                !showEditCategory &&
                <section className="notelist-details">
                    <NotesList selectedCategory={selectedCategory} />
                </section>
            }
            {
                showAddCategory &&
                <section>
                    <AddCategory selectedCategory={selectedCategory} setShowAddCategory={setShowAddCategory} setLastUpdate={setLastUpdate} />
                </section>
            }
            {
                showEditCategory &&
                <section className="category-settings">
                    <h1>Settings</h1>
                    <div className="settings-grid">
                        <EditCategory selectedCategory={selectedCategory} setShowEditCategory={setShowEditCategory} setLastUpdate={setLastUpdate} />
                        <DeleteCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setShowEditCategory={setShowEditCategory} setLastUpdate={setLastUpdate} />
                    </div>
                </section>
            }
        </main>
    )
}