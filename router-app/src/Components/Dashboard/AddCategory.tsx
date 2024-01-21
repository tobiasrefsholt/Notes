import { Dispatch, SetStateAction, useState } from "react";
import { FetchResponse, category } from "../../types";
import useFetch from "../../hooks/useFetch";

type AddCategoryProps = {
    selectedCategory: category | null;
    setShowAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
    categoriesFetch: FetchResponse<category[]>;
}

type newCategoryRequest = {
    parentGuid: string | null;
    name: string;
}

type apiData = {
    success: boolean;
    guid: string;
}

export default function AddCategory({ selectedCategory, setShowAddCategory, categoriesFetch }: AddCategoryProps) {
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const saveCategory = useFetch<apiData>("/CreateCategory", [selectedCategory], "Could on create category");

    const handleAddCategory = () => {
        const newCategory: newCategoryRequest = {
            parentGuid: selectedCategory ? selectedCategory.guid : null,
            name: newCategoryName
        }

        saveCategory.doFetch("POST", [], newCategory);
        categoriesFetch.doFetch("GET");
        setShowAddCategory(false);
    }

    return (
        <>
            {saveCategory.isPending && <h1>Loading...</h1>}
            {saveCategory.error && <h1>{saveCategory.error}</h1>}
            {
                !saveCategory.data &&
                <>
                    <h1>Create category</h1>
                    <input className='note-heading' type='text' value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Untitled" />
                    <div>
                        <button onClick={handleAddCategory}>Add</button>
                        <button onClick={() => setShowAddCategory(false)}>Cancel</button>
                    </div>
                </>
            }
        </>
    );
}