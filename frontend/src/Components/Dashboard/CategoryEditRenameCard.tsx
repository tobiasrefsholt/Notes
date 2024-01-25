import { useState } from "react";
import { FetchResponse, category } from "../../types";
import useFetch from "../../hooks/useFetch";

type EditCategoryProps = {
    selectedCategory: category | null;
    categoriesFetch: FetchResponse<category[]>
}

export default function CategoryEditRenameCard({ selectedCategory, categoriesFetch }: EditCategoryProps) {
    const renameFetch = useFetch("/UpdateCategory", []);
    const [name, setName] = useState<string>(selectedCategory?.name || "");

    const rename = () => {
        if (!selectedCategory?.guid) return;
        const requestBody = {
            guid: selectedCategory.guid,
            name
        }
        renameFetch.doFetch("POST", [], requestBody, true, () => {
            categoriesFetch.doFetch("GET");
        })
    }

    return (
        <div className="card">
            <h2>Rename category</h2>
            <div className="card-content">
                <input type="text" value={name} onChange={((e) => setName(e.target.value))} id="" />
            </div>
            <div>
                <button onClick={rename}>Rename</button>
            </div>
        </div>
    )
}