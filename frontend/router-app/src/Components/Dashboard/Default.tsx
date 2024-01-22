import { useState } from "react"
import CategoryList from "./CategoryList";
import NotesList from "./NotesList";
import AddCategory from "./AddCategory";
import { category } from "../../types";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { useCategoriesContext } from "../../pages/Dashboard";

export default function Default() {
    const categoriesFetch = useCategoriesContext();
    const [selectedCategory, setSelectedCategory] = useState<category | null>(null);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showEditCategory, setShowEditCategory] = useState(false);

    return (
        <main className="notes-browser">
            <section className="category-list">
                <CategoryList categoriesFetch={categoriesFetch} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setShowAddCategory={setShowAddCategory} setShowEditCategory={setShowEditCategory} />
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
                    <AddCategory selectedCategory={selectedCategory} setShowAddCategory={setShowAddCategory} categoriesFetch={categoriesFetch} />
                </section>
            }
            {
                showEditCategory &&
                <section className="category-settings">
                    <h1>Settings</h1>
                    <div className="settings-grid">
                        <EditCategory selectedCategory={selectedCategory} setShowEditCategory={setShowEditCategory} categoriesFetch={categoriesFetch} />
                        <DeleteCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoriesFetch={categoriesFetch} />
                    </div>
                </section>
            }
        </main>
    )
}