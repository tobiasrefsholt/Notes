import { useEffect } from "react";
import { FetchResponse, category } from "../../types";

type CategoryListProps = {
    categoriesFetch: FetchResponse<category[]>;
    selectedCategory: category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<category | null>>;
    setShowAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryList({ categoriesFetch, selectedCategory, setSelectedCategory, setShowAddCategory, setShowEditCategory }: CategoryListProps) {

    useEffect(() => {
        setShowAddCategory(false);
        setShowEditCategory(false);
    }, [selectedCategory])

    const handleSelectParentCategory = () => {
        if (categoriesFetch.data === null) return;
        const target = categoriesFetch.data.find((category) => selectedCategory?.parentGuid === category.guid) || null;
        setSelectedCategory(target);
    }

    return (
        <>
            {categoriesFetch.isPending && <span>Loading categories...</span>}
            {categoriesFetch.error && <span>{categoriesFetch.error}</span>}
            {
                categoriesFetch.data &&
                <>
                    <strong onClick={handleSelectParentCategory}>{selectedCategory ? "↑ " + selectedCategory.name : "Browse categories"}</strong>
                    <hr />
                    <ul>
                        {categoriesFetch.data
                            .filter((category) => category.parentGuid === (selectedCategory?.guid || null))
                            .map((category) => (
                                <li key={category.guid} onClick={() => setSelectedCategory(category)}>{category.name}</li>
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