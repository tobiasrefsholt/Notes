import { useEffect, useState } from "react";
import { FetchResponse, category } from "../../types"
import getCategory from "../../hooks/useGetCategory";

type CategoryDropdownProps = {
    selectedCategory: category | null;
    categoriesFetch: FetchResponse<category[]>;
    excludeGuid: string | null | undefined;
    action: (category: category) => void;
}

export default function CategoryDropdown({ selectedCategory, categoriesFetch, excludeGuid, action }: CategoryDropdownProps) {
    const [selectedListItem, setSelectedListItem] = useState(JSON.parse(JSON.stringify(selectedCategory)));
    const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (selectedListItem !== null) {
            return;
        }
        setSelectedListItem(getCategory(null, null));
    }, [selectedListItem]);

    function handleSelectCategory(guid: string | null) {
        const category = getCategory(categoriesFetch.data, guid);
        setSelectedListItem(category);
    }

    function handleUpdateCategory() {
        if (!selectedListItem || (selectedListItem.guid === excludeGuid)) return;
        setDropdownIsOpen(false);
        action(selectedListItem);
    }

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
                {
                    (selectedCategory?.name || "Ungategorized")
                }
            </button>
            {
                dropdownIsOpen &&
                selectedListItem &&
                <div className="dropdown-content">
                    <strong onClick={() => handleSelectCategory(selectedListItem.parentGuid)}>
                        {selectedListItem.guid == null ? "Top level" : "↑" + getCategory(categoriesFetch.data, selectedListItem.guid)?.name}
                    </strong>
                    <ul>
                        {categoriesFetch.data
                            ?.filter((category) => (category.parentGuid === selectedListItem?.guid))
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