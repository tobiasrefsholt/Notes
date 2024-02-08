import { CSSProperties } from "react";

type IconProps = {
    color: string;
    pointerOnHover?: true;
}

export default function CrossIcon({color, pointerOnHover = true}:IconProps) {
    const style:CSSProperties = pointerOnHover ? {cursor: "pointer"} : {};
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          style={style}
        >
          <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 5L5 19M5 5l4.5 4.5M12 12l7 7"
          ></path>
        </svg>
      );
}