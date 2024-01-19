import useFetchData from "../../hooks/useFetchData";

type category = {
    guid: string;
    parentGuid: string | null;
    name: string;
}

type CategoryListProps = {
    selectedCategory: category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<category | null>>
}

export default function CategoryList({ selectedCategory, setSelectedCategory }: CategoryListProps) {
    const { data: categories, isPending, error } = useFetchData<category[]>("/GetCategories", []);

    const handleSelectCateegory = () => {
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
                    <h1>Browse categories</h1>
                    <div onClick={handleSelectCateegory}>
                        <strong>{selectedCategory ? "↑ " + selectedCategory.name : "Root"}</strong>
                    </div>
                    <ul>
                        {categories
                            .filter((category) => category.parentGuid === (selectedCategory?.guid || null))
                            .map((category) => (
                                <li key={category.guid} onClick={() => setSelectedCategory(category)}>{category.name}</li>
                            ))}
                    </ul>
                </>
            }
        </>
    )
}