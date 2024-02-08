import { useNavigate } from "react-router-dom";
import EditIcon from "../../../components/icons/editIcon";
import { category } from "../../../types";
import getCategory from "../../../hooks/useGetCategory";

type CategoryListHeaderProps = {
    categories: category[];
    selectedCategory: category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<category | null>>;
}

export default function CategoryListHeader({ categories, selectedCategory, setSelectedCategory }: CategoryListHeaderProps) {
    const navigate = useNavigate();

    const handleSelectParentCategory = () => {
        const target: category = categories.find((category) => selectedCategory?.parentGuid === category.guid) || getCategory(categories, null);
        setSelectedCategory(target);
    }

    const styles = { display: "flex", justifyContent: "space-between", alignItems: "baseline" };
    const headerText = selectedCategory?.guid ? "↑ " + selectedCategory.name : "Browse categories"

    return (
        <div style={styles}>
            <strong onClick={handleSelectParentCategory}>{headerText}</strong>
            {
                selectedCategory?.guid &&
                <div onClick={() => navigate("/edit-category")} style={{ width: "1rem", height: "1rem" }}>
                    <EditIcon color="rgba(255, 255, 255, 0.8)" />
                </div>
            }
        </div>
    );
}