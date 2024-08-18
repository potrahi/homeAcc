import React from "react";

interface IconButtonProps {
    onClick: () => void;
    icon: string;
    altText: string;
    className?: string;
    disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, altText, className = "", disabled = false }) => {
    return (
        <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
            <img src={icon} alt={altText} className={`${className}-icon`} />
        </button>
    );
}

export default IconButton; 