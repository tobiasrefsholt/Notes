import CategoryList from "./CategoryList";
import NotesList from "./NotesList";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { useDashboardContext } from "../../pages/Dashboard";

export default function Default() {
    const {categoriesFetch, selectedCategory, setSelectedCategory, showAddCategory, setShowAddCategory, showEditCategory, setShowEditCategory } = useDashboardContext();

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