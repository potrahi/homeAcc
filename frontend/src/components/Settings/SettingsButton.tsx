import React, { useState } from 'react';
import OpenModalButton from '../OpenModalButton';
import './SettingsButton.css';
import gear from '../../assets/gear-svgrepo-com.svg';

const SettingsButton: React.FC = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 250);
    }

    return (
        <OpenModalButton contentId="SettingsForm">
            <button
                className={`settings-button ${isClicked ? 'clicked' : ''}`}
                onClick={handleClick}
            >
                <img src={gear} alt="Settings" className="gear-icon" />
            </button>
        </OpenModalButton>
    );
}

export default SettingsButton