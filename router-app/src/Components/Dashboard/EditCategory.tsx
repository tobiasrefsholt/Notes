import { Dispatch, useState } from "react";
import { category } from "../../types";

type EditCategoryProps = {
    selectedCategory: category | null;
    setShowEditCategory: Dispatch<React.SetStateAction<boolean>>;
}

export default function EditCategory({ selectedCategory, setShowEditCategory }: EditCategoryProps) {
    const [name, setName] = useState<string>(selectedCategory?.name || "");

    const rename = () => {
        setShowEditCategory(false);
    }

    return (
        <div className="card">
            <h2>Rename category</h2>
            <input type="text" value={name} onChange={((e) => setName(e.target.value))} id="" />
            <button onClick={rename}>Rename</button>
        </div>
    )
}