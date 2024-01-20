import { useState } from "react";
import { category } from "../../types";
import useFetch from "../../hooks/useFetch";

type AddCategoryProps = {
    selectedCategory: category | null;
    setShowAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

type newCategoryRequest = {
    parentGuid: string | null;
    name: string;
}

type apiData = {
    success: boolean;
    guid: string;
}

export default function AddCategory({ selectedCategory, setShowAddCategory }: AddCategoryProps) {
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const { error, isPending, data, doFetch } = useFetch<apiData>("POST", ["CreateCategory"], [], "Could on create category");

    const handleAddCategory = () => {
        const newCategory: newCategoryRequest = {
            parentGuid: selectedCategory ? selectedCategory.guid : null,
            name: newCategoryName
        }

        doFetch(newCategory);
        setShowAddCategory(false);
    }

    return (
        <>
            {isPending && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {
                !data &&
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