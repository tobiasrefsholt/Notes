import { Dispatch, SetStateAction, useEffect } from "react";
import useFetch from "../../hooks/useFetch"
import { category } from "../../types";

type DeleteCategoryProps = {
    selectedCategory: category | null;
    setSelectedCategory: Dispatch<SetStateAction<category | null>>;
    setShowEditCategory: Dispatch<SetStateAction<boolean>>;
    setLastUpdate: Dispatch<SetStateAction<number>>;
}

export default function DeleteCategory({ selectedCategory, setSelectedCategory, setShowEditCategory, setLastUpdate }: DeleteCategoryProps) {
    console.log(selectedCategory?.guid);
    const { error, isPending, data: isSuccess, doFetch } = useFetch<boolean>("/DeleteCategory", [selectedCategory?.guid], "Unable to delete category");

    useEffect(() => {
        if (!isSuccess) return;
        const timestamp = new Date().getTime();
        setLastUpdate(timestamp);
        setSelectedCategory(null);
    }, [isSuccess])

    const handleDelete = () => {
        doFetch("GET", [selectedCategory?.guid || ""]);
    }

    return (
        <div className="card">
            <h2>Delete category</h2>
            {isPending && <p>Deleting...</p>}
            {isSuccess && <p>Category was deleted.</p>}
            {error && <p>{error}</p>}
            {
                !error &&
                !isPending &&
                !isSuccess &&
                <>
                    <p>When the category is deleted, all notes and subcategories will be moved to the parent category, or become top-level categories.</p>
                    <button onClick={handleDelete}>Delete</button>
                </>
            }
        </div>
    )
}