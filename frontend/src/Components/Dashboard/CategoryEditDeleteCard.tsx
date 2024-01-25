import { Dispatch, SetStateAction } from "react";
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

    const handleDelete = () => {
        deleteRequest.doFetch("GET", [selectedCategory?.guid || ""], null, true, () => {
            console.log(deleteRequest.data)
            const parentCategory = categoriesFetch?.data?.find((category) => selectedCategory?.parentGuid === category.guid) || null;
            setSelectedCategory(parentCategory);
            categoriesFetch.doFetch("GET");
            navigate("/");
        });
    }

    const showContent = !deleteRequest.error && !deleteRequest.isPending && !deleteRequest.data;

    return (
        <div className="card">
            <h2>Delete category</h2>
            <div className="card-content">
                {deleteRequest.isPending && <p>Deleting...</p>}
                {deleteRequest.error && <p>{deleteRequest.error}</p>}
                {showContent && <p>When the category is deleted, all notes and subcategories will be moved to the parent category, or become top-level categories.</p>}
            </div>
            <div>
                {showContent && <button onClick={handleDelete}>Delete</button>}
            </div>
        </div>
    )
}