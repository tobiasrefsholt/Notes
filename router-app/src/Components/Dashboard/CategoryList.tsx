import useFetchData from "../../hooks/useFetchData";
import { category } from "../../types";

type CategoryListProps = {
    selectedCategory: category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<category | null>>;
    setShowAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryList({ selectedCategory, setSelectedCategory, setShowAddCategory }: CategoryListProps) {
    const { data: categories, isPending, error } = useFetchData<category[]>("/GetCategories", []);

    const handleSelectParentCategory = () => {
        if (categories === null) return;
        const target = categories.find((category) => selectedCategory?.parentGuid === category.guid) || null;
        setSelectedCategory(target);
        setShowAddCategory(false)
    }

    return (
        <>
            {isPending && <span>Loading categories...</span>}
            {error && <span>{error}</span>}
            {
                categories &&
                <>
                    {/* <h1>Browse categories</h1> */}
                    <div onClick={handleSelectParentCategory}>
                        <h1>{selectedCategory ? "↑ " + selectedCategory.name : "Browse categories"}</h1>
                    </div>
                    <ul>
                        {categories
                            .filter((category) => category.parentGuid === (selectedCategory?.guid || null))
                            .map((category) => (
                                <li key={category.guid} onClick={() => {
                                    setSelectedCategory(category)
                                    setShowAddCategory(false);
                                }}>{category.name}</li>
                            ))}
                        <li className="new-category-button" onClick={() => setShowAddCategory(true)}>
                            {selectedCategory?.guid ? "Create subcategory" : "Create top level category"}
                        </li>
                    </ul>
                </>
            }
        </>
    )
}