import React, { useState } from 'react';
import gear from '../../assets/gear-icon.svg';
import './SettingsButton.css';

interface SettingsButtonProps {
    onClick: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 250);
        onClick();
    }

    return (
        <button
            className={`settings-button ${isClicked ? 'clicked' : ''}`}
            onClick={handleClick}
        >
            <img src={gear} alt="Settings" className="gear-icon" />
        </button>
    );
}

export default SettingsButton