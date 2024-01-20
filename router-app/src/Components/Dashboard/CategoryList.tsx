import { useEffect } from "react";
import { category } from "../../types";
import useFetch from "../../hooks/useFetch";

type CategoryListProps = {
    selectedCategory: category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<category | null>>;
    setShowAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
    lastUpdate: number;
}

export default function CategoryList({ selectedCategory, setSelectedCategory, setShowAddCategory, setShowEditCategory, lastUpdate }: CategoryListProps) {
    const { data: categories, isPending, error, doFetch } = useFetch<category[]>("/GetCategories", []);

    useEffect(() => {
        doFetch("GET");
    }, [lastUpdate])

    useEffect(() => {
        setShowAddCategory(false);
        setShowEditCategory(false);
    }, [selectedCategory])

    const handleSelectParentCategory = () => {
        if (categories === null) return;
        const target = categories.find((category) => selectedCategory?.parentGuid === category.guid) || null;
        setSelectedCategory(target);
    }

    return (
        <>
            {isPending && <span>Loading categories...</span>}
            {error && <span>{error}</span>}
            {
                categories &&
                <>
                    <div className="category-header">
                        <h1 onClick={handleSelectParentCategory}>{selectedCategory ? "↑ " + selectedCategory.name : "Browse categories"}</h1>
                        {selectedCategory && <button onClick={() => setShowEditCategory(true)}>Edit</button>}
                    </div>
                    <ul>
                        {categories
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