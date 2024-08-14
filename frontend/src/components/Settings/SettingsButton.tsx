import React, { useState } from 'react';
import gear from '../../assets/gear-icon.svg';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal';
import './SettingsButton.css';

const SettingsButton: React.FC = () => {
    const dispatch = useDispatch();

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 250);
        dispatch(modalActions.setModalContent("SettingsForm"));
        dispatch(modalActions.openModal())
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