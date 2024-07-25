import React, { useCallback, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { modalActions } from '../../store/modal';
import './styles/Modal.css';

type ModalProps = {
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);

    const handleClose = useCallback(() => {
        dispatch(modalActions.closeModal());
    }, [dispatch]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={handleClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
