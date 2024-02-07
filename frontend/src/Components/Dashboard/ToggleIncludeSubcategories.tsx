type Props = {
    includeSubcategories: boolean;
    setIncludeSubcategories: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToggleIncludeSubcategories({ includeSubcategories, setIncludeSubcategories }: Props) {
    return (
        <button
            className="button button-secondary"
            onClick={() => setIncludeSubcategories(!includeSubcategories)}
        >
            {includeSubcategories ? "Hide subcategories" : "Show subcategories"}
        </button>
    )
}