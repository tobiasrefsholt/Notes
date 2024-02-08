import { useEffect, useState } from "react";
import { FetchResponse, category } from "../../../types";
import CategoryDropdown from "../singleNote/categoryDropdown";
import useGetCategory from "../../../hooks/useGetCategory";
import useFetch, { ApiEndpoint } from "../../../hooks/useFetch";

type ChangeParentProps = {
    selectedCategory: category | null;
    categoriesFetch: FetchResponse<category[]>;
}

export default function CategoryEditChangeParent({ selectedCategory, categoriesFetch }: ChangeParentProps) {

    const changeParentFetch = useFetch(ApiEndpoint.UpdateCategory, []);
    const [currentParentCategory, setCurrentParentCategory] = useState<category>(useGetCategory(categoriesFetch.data, selectedCategory?.parentGuid || null))

    useEffect(() => {
        setCurrentParentCategory(useGetCategory(categoriesFetch.data, selectedCategory?.parentGuid || null));
    }, [selectedCategory]);

    function handleChangeParent(parentCategory: category) {
        if (!selectedCategory?.guid) return;

        const requestBody = {
            guid: selectedCategory.guid,
            parentGuid: parentCategory.guid
        }

        changeParentFetch.doFetch("POST", [], requestBody, true, () => {
            categoriesFetch.doFetch("GET");
        })
    }

    return (
        <div className="card">
            <h2>Parent</h2>
            <div className="card-content">
                <p>Change the parent category of {selectedCategory?.name}</p>
            </div>
            <div>
                <CategoryDropdown selectedCategory={currentParentCategory} categoriesFetch={categoriesFetch} excludeGuid={selectedCategory?.guid} action={handleChangeParent}/>
            </div>
        </div>
    )
}