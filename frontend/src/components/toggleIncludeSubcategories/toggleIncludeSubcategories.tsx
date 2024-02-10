type Props = {
    includeSubcategories: boolean;
    setIncludeSubcategories: React.Dispatch<React.SetStateAction<boolean>>;
    style?: React.CSSProperties;
}

export default function ToggleIncludeSubcategories({ includeSubcategories, setIncludeSubcategories, style = {} }: Props) {
    return (
        <button
            className="button button-primary"
            onClick={() => setIncludeSubcategories(!includeSubcategories)}
            style={style}
        >
            {includeSubcategories ? "Hide subcategories" : "Show subcategories"}
        </button>
    )
}