import { FetchResponse, category } from "../../../types";
import { useNavigate } from "react-router-dom";
import CategoryListHeader from "./categoryListHeader";
import CategoryListItem from "./categoryListItem";

type CategoryListProps = {
    categoriesFetch: FetchResponse<category[]>;
    selectedCategory: category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<category | null>>;
}

export default function CategoryList({ categoriesFetch, selectedCategory, setSelectedCategory }: CategoryListProps) {

    const { data: categories, isPending, error } = categoriesFetch;
    const filteredCategories = categories?.filter((category) => category.parentGuid === (selectedCategory?.guid || null));
    const navigate = useNavigate();

    return (
        <>
            {isPending && <span>Loading categories...</span>}
            {error && <span>{error}</span>}
            {
                categories &&
                <>
                    <CategoryListHeader categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    <ul>
                        {filteredCategories && filteredCategories.map((category) => (
                            <CategoryListItem key={category.guid} category={category} setSelectedCategory={setSelectedCategory} />
                        ))}
                        <li style={{ backgroundColor: "#ffffff0c" }} onClick={() => navigate("/add-category")}>
                            {selectedCategory?.guid ? "Create subcategory" : "Create top level category"}
                        </li>
                    </ul>
                </>
            }
        </>
    )
}