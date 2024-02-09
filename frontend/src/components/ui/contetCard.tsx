type ContentCardProps = {
    children: React.ReactNode;
    style: React.CSSProperties;
}

export default function ContentCard({ children, style }: ContentCardProps) {
    const defaultStyle = { backgroundColor: "black", padding: "1rem", borderRadius: "1rem" };
    return (
        <div style={{...defaultStyle, ...style}}>
            {children}
        </div>
    );
}