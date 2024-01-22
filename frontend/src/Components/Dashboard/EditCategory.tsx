import { Dispatch, SetStateAction, useState } from "react";
import { FetchResponse, category } from "../../types";

type EditCategoryProps = {
    selectedCategory: category | null;
    setShowEditCategory: Dispatch<SetStateAction<boolean>>;
    categoriesFetch: FetchResponse<category[]>
}

export default function EditCategory({ selectedCategory, setShowEditCategory, categoriesFetch }: EditCategoryProps) {
    const [name, setName] = useState<string>(selectedCategory?.name || "");

    const rename = () => {
        setShowEditCategory(false);
        categoriesFetch.doFetch("GET");
    }

    return (
        <div className="card">
            <h2>Rename category</h2>
            <input type="text" value={name} onChange={((e) => setName(e.target.value))} id="" />
            <button onClick={rename}>Rename</button>
        </div>
    )
}