import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useDashboardContext } from "../../pages/Dashboard";
import { useNavigate } from "react-router-dom";

type newCategoryRequest = {
    parentGuid: string | null;
    name: string;
}

type apiData = {
    success: boolean;
    guid: string;
}

export default function CategoryAdd() {
    const { categoriesFetch, selectedCategory, setSelectedCategory } = useDashboardContext();
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const saveCategory = useFetch<apiData>("/CreateCategory", [selectedCategory], "Could on create category");

    const navigate = useNavigate();

    const handleAddCategory = () => {
        const newCategory: newCategoryRequest = {
            parentGuid: selectedCategory ? selectedCategory.guid : null,
            name: newCategoryName
        }

        const refreshCategories = () => {
            categoriesFetch.doFetch("GET", [], undefined, true, () => {
                if (! saveCategory.data?.success) return;
                const category = categoriesFetch.data?.find((category) => category.guid == saveCategory.data?.guid);
                if (category) setSelectedCategory(category);
                navigate("/");
            });
        }

        saveCategory.doFetch("POST", [], newCategory, true, refreshCategories);
    }

    return (
        <main className="add-category">
            {saveCategory.isPending && <h1>Loading...</h1>}
            {saveCategory.error && <h1>{saveCategory.error}</h1>}
            {
                !saveCategory.data &&
                <>
                    <h1>Create category</h1>
                    <input className='note-heading' type='text' value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Untitled" />
                    <div>
                        <button onClick={handleAddCategory}>Add</button>
                        <button onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </>
            }
        </main>
    );
}