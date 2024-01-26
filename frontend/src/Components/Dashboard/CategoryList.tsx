import { FetchResponse, category } from "../../types";
import { useNavigate } from "react-router-dom";
import EditIcon from "../SVGs/EditIcon";

type CategoryListProps = {
    categoriesFetch: FetchResponse<category[]>;
    selectedCategory: category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<category | null>>;
}

export default function CategoryList({ categoriesFetch, selectedCategory, setSelectedCategory }: CategoryListProps) {

    const navigate = useNavigate();

    const handleSelectParentCategory = () => {
        if (categoriesFetch.data === null) return;
        const target = categoriesFetch.data.find((category) => selectedCategory?.parentGuid === category.guid) || null;
        setSelectedCategory(target);
    }

    function handleNoteOnClick(category: category) {
        setSelectedCategory(category);
    }

    return (
        <>
            {categoriesFetch.isPending && <span>Loading categories...</span>}
            {categoriesFetch.error && <span>{categoriesFetch.error}</span>}
            {
                categoriesFetch.data &&
                <>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                        <strong onClick={handleSelectParentCategory}>{selectedCategory?.guid ? "↑ " + selectedCategory.name : "Browse categories"}</strong>
                        {selectedCategory && <div onClick={() => navigate("/edit-category")} style={{width: "1rem", height: "1rem"}}>
                            <EditIcon color="rgba(255, 255, 255, 0.8)" />
                        </div>}
                    </div>
                    <hr />
                    <ul>
                        {categoriesFetch.data
                            .filter((category) => category.parentGuid === (selectedCategory?.guid || null))
                            .map((category) => (
                                <li key={category.guid} onClick={() => handleNoteOnClick(category)}>{category.name}</li>
                            ))}
                        <li className="new-category-button" onClick={() => navigate("/add-category")}>
                            {selectedCategory?.guid ? "Create subcategory" : "Create top level category"}
                        </li>
                    </ul>
                </>
            }
        </>
    )
}