import { category } from "../types";

export default function getCategory(categories:category[] | null, guid: string | null) : category {
    return categories?.find((category) => category.guid === guid) || {
        guid: null,
        parentGuid: null,
        name: "Uncategorized",
        color: "#ffffff"
    };
}