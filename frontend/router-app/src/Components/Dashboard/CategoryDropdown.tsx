import { useEffect, useState } from "react";
import { FetchResponse, InsertNote, Note, category } from "../../types"
import useFetch from "../../hooks/useFetch";

type CategoryDropdownProps = {
    note: Note | null;
    categoriesFetch: FetchResponse<category[]>
}

export default function CategoryDropdown({ note, categoriesFetch }: CategoryDropdownProps) {

    const [selectedCategory, setSelectedCategory] = useState<category | undefined>();
    const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
    const updateCategory = useFetch<boolean>("/UpdateNote", [note]);

    useEffect(() => {
        if (note?.categoryGuid !== null) {
            setSelectedCategory(getCategory(note?.categoryGuid || null));
        }
        const uncategorized: category = {
            guid: null,
            parentGuid: null,
            name: "Uncategorized"
        }
        setSelectedCategory(uncategorized);
        console.log(note);
    }, [note])

    function handleSelectCategory(guid: string | null) {
        const category = getCategory(guid);
        setSelectedCategory(category);
    }

    function getCategory(guid: string | null) {
        return categoriesFetch.data?.find((category) => category.guid === guid) || {
            guid: null,
            parentGuid: null,
            name: "Uncategorized"
        };
    }

    function handleUpdateCategory() {
        if (!note || !selectedCategory) return;
        note.categoryGuid = selectedCategory.guid;
        note.categoryName = selectedCategory.name;
        setDropdownIsOpen(false);
        const requestBody: InsertNote = {
            guid: note.guid,
            categoryGuid: selectedCategory.guid
        }
        updateCategory.doFetch("POST", [], requestBody);
    }

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
                {updateCategory.error && <>{updateCategory.error}</>}
                {updateCategory.isPending && <>Changing category...</>}
                {
                    !updateCategory.error &&
                    !updateCategory.isPending &&
                    (note?.categoryName || "Ungategorized")
                }
            </button>
            {
                dropdownIsOpen &&
                selectedCategory &&
                <div className="dropdown-content">
                    <strong onClick={() => handleSelectCategory(selectedCategory.parentGuid)}>
                        {selectedCategory.guid == null ? "Top level" : "↑" + getCategory(selectedCategory.guid)?.name}
                    </strong>
                    <ul>
                        {categoriesFetch.data
                            ?.filter((category) => category.parentGuid === selectedCategory?.guid)
                            .map((category) => (
                                <li key={category.guid} onClick={() => handleSelectCategory(category.guid)}>{category.name}</li>
                            ))}
                    </ul>
                    <button onClick={() => handleUpdateCategory()}>Set category</button>
                </div>
            }
        </div>
    )
}