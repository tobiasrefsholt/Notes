import { useDashboardContext } from "../../pages/Dashboard";
import CategoryEditDeleteCard from "./CategoryEditDeleteCard";
import CategoryEditRenameCard from "./CategoryEditRenameCard";
import CategoryEditChangeParent from "./CategoryEditChangeParent";
import CategoryEditAssignColor from "./CategoryEditAssignColor";

export default function CategoryEdit() {
    const { categoriesFetch, selectedCategory, setSelectedCategory } = useDashboardContext();

    if (!selectedCategory?.name) {
        return (
            <main>
                <h1>No selected category</h1>
            </main>
        )
    }

    return (
        <main>
            <h1>Edit category: "{selectedCategory?.name}"</h1>
            <section className="settings-grid">
                <CategoryEditAssignColor categoriesFetch={categoriesFetch} selectedCategory={selectedCategory} />
                <CategoryEditDeleteCard categoriesFetch={categoriesFetch} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CategoryEditRenameCard categoriesFetch={categoriesFetch} selectedCategory={selectedCategory} />
                <CategoryEditChangeParent categoriesFetch={categoriesFetch} selectedCategory={selectedCategory} />
            </section>
        </main>
    );
}