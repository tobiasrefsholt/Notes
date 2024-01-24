import { Dispatch, SetStateAction, useEffect } from "react";
import useFetch from "../../hooks/useFetch"
import { FetchResponse, category } from "../../types";
import { useNavigate } from "react-router-dom";

type DeleteCategoryProps = {
    selectedCategory: category | null;
    setSelectedCategory: Dispatch<SetStateAction<category | null>>;
    categoriesFetch: FetchResponse<category[]>
}

export default function CategoryEditDeleteCard({ selectedCategory, setSelectedCategory, categoriesFetch }: DeleteCategoryProps) {
    const deleteRequest = useFetch<boolean>("/DeleteCategory", [selectedCategory?.guid], "Unable to delete category");
    const navigate = useNavigate();

    useEffect(() => {
        if (!deleteRequest.data) return;
        const parentCategory = categoriesFetch?.data?.find((category) => selectedCategory?.parentGuid === category.guid) || null;
        setSelectedCategory(parentCategory);
        categoriesFetch.doFetch("GET");
    }, [deleteRequest.data])

    const handleDelete = () => {
        deleteRequest.doFetch("GET", [selectedCategory?.guid || ""]);
        navigate("/");
    }

    return (
        <div className="card">
            <h2>Delete category</h2>
            {deleteRequest.isPending && <p>Deleting...</p>}
            {deleteRequest.data && <p>Category was deleted.</p>}
            {deleteRequest.error && <p>{deleteRequest.error}</p>}
            {
                !deleteRequest.error &&
                !deleteRequest.isPending &&
                !deleteRequest.data &&
                <>
                    <p>When the category is deleted, all notes and subcategories will be moved to the parent category, or become top-level categories.</p>
                    <button onClick={handleDelete}>Delete</button>
                </>
            }
        </div>
    )
}