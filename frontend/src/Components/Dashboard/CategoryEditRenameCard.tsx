import { useState } from "react";
import { FetchResponse, category } from "../../types";

type EditCategoryProps = {
    selectedCategory: category | null;
    categoriesFetch: FetchResponse<category[]>
}

export default function CategoryEditRenameCard({ selectedCategory, categoriesFetch }: EditCategoryProps) {
    const [name, setName] = useState<string>(selectedCategory?.name || "");

    const rename = () => {
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