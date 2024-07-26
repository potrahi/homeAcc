import React from 'react';
import OpenModalButton from '../OpenModalButton';
import './styles/SettingsButton.css';
import gear from '../../assets/gear-svgrepo-com.svg';

const SettingsButton: React.FC = () => {

    return (
        <OpenModalButton contentId="SettingsForm">
            <button className="settings-button">
                <img src={gear} alt="Settings" className="gear-icon" />
            </button>
        </OpenModalButton>
    );
}

export default SettingsButton