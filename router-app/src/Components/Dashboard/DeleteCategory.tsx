import { Dispatch } from "react";
import useFetch from "../../hooks/useFetch"
import { category } from "../../types";

type DeleteCategoryProps = {
    selectedCategory: category | null;
    setSelectedCategory: Dispatch<React.SetStateAction<category | null>>;
    setShowEditCategory: Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteCategory({ selectedCategory, setSelectedCategory, setShowEditCategory }: DeleteCategoryProps) {
    const { error, isPending, data: isSuccess, doFetch } = useFetch<boolean>("GET", ["DeleteCategory",], [selectedCategory?.guid], "Unable to delete category");

    const handleDelete = () => {
        /* doFetch(); */
        setShowEditCategory(false);
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
                <>
                    <p>When the category is deleted, all notes and subcategories will be moved to the parent category, or become top-level categories.</p>
                    <button onClick={handleDelete}>Delete</button>
                </>
            }
        </div>
    )
}