import { CirclePicker } from "react-color";
import { category, FetchResponse } from "../../types";
import { useState } from "react";
import useFetch, { ApiEndpoint } from "../../hooks/useFetch";

type Props = {
    selectedCategory: category | null;
    categoriesFetch: FetchResponse<category[]>
}

export default function CategoryEditAssignColor({ selectedCategory, categoriesFetch }: Props) {
    const [hex, setHex] = useState(selectedCategory?.color || "#fff");
    const updateCategoryFetch = useFetch<boolean>(ApiEndpoint.UpdateCategory, []);

    function handleChangeColor(color:string) {
        setHex(color);
        if (!selectedCategory?.guid) return;
        updateCategoryFetch.doFetch("POST", [], {guid: selectedCategory.guid, color}, true, () => {
            categoriesFetch.doFetch("GET");
        });
    }

    return (
        <div className="card">
            <h2>Category color</h2>
            <div className="card-content">
                {updateCategoryFetch.error && <p>{updateCategoryFetch.error}</p>}
                {updateCategoryFetch.isPending && <p>Saving changes...</p>}
                {updateCategoryFetch.data && <p>Color was changed successfully</p>}
                <CirclePicker color={hex} onChangeComplete={(color) => handleChangeColor(color.hex)} />
            </div>
            <div>
            </div>
        </div>
    )
}