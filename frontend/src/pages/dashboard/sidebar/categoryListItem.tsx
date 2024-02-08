import { category } from "../../../types"

type CategoryListItemProps = {
    category: category;
    setSelectedCategory: React.Dispatch<React.SetStateAction<category | null>>;
}

export default function CategoryListItem({ category, setSelectedCategory }: CategoryListItemProps) {
    const styles = { borderLeftColor: category.color, backgroundColor: category.color + 10 };
    return (
        <li style={styles} onClick={() => setSelectedCategory(category)}>
            {category.name}
        </li>
    )
}