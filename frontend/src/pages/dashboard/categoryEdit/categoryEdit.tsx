import { useDashboardContext } from "../dashboard";
import CategoryEditDeleteCard from "./categoryEditDeleteCard";
import CategoryEditRenameCard from "./categoryEditRenameCard";
import CategoryEditChangeParent from "./categoryEditChangeParent";
import CategoryEditAssignColor from "./categoryEditAssignColor";
import GoBackIcon from "../../../components/icons/goBackIcon";
import { useNavigate } from "react-router-dom";

export default function CategoryEdit() {
    const { categoriesFetch, selectedCategory, setSelectedCategory } = useDashboardContext();
    const navigate = useNavigate();

    if (!selectedCategory?.name) {
        return (
            <main>
                <h1>No selected category</h1>
            </main>
        )
    }

    return (
        <main>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginLeft: "1rem" }}>
                <div style={{ width: "2rem", height: "2rem" }} onClick={() => navigate("/")}>
                    <GoBackIcon color='#ffffff' />
                </div>
                <h1>Edit category: "{selectedCategory?.name}"</h1>
            </div>
            <section className="settings-grid">
                <CategoryEditAssignColor categoriesFetch={categoriesFetch} selectedCategory={selectedCategory} />
                <CategoryEditDeleteCard categoriesFetch={categoriesFetch} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CategoryEditRenameCard categoriesFetch={categoriesFetch} selectedCategory={selectedCategory} />
                <CategoryEditChangeParent categoriesFetch={categoriesFetch} selectedCategory={selectedCategory} />
            </section>
        </main>
    );
}