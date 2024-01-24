import { useState } from "react";
import { FetchResponse, category } from "../../types";
import CategoryDropdown from "./CategoryDropdown";

type ChangeParentProps = {
    selectedCategory: category | null;
    categoriesFetch: FetchResponse<category[]>;
}

export default function CategoryEditChangeParent({ selectedCategory, categoriesFetch }: ChangeParentProps) {
    const [dropdownSelectedCategoryGuid, setDropdownSelectedCategoryGuid] = useState<string | null>();

    function dropdownAction(category:category) {
        setDropdownSelectedCategoryGuid(category.guid);
    }

    function handleSave() {
        
    }

    return (
        <div className="card">
            <h2>Change parent category</h2>
            <CategoryDropdown selectedCategory={selectedCategory} categoriesFetch={categoriesFetch} action={dropdownAction} />
            <button onClick={handleSave}>Save</button>
        </div>
    )
}