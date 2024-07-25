import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const dialog = useRef<HTMLDialogElement>(null);


    useEffect(() => {
        const modal = dialog.current;

        if (!modal) {
            return;
        }

        if (isOpen) {
            modal.showModal();
        }

        return () => {
            console.log('closing');
            modal.close();
        };
    }, [isOpen]);

    return createPortal(
        <dialog ref={dialog} onClose={onClose}>
            <button id="close-modal" className="close-button" onClick={onClose}>
                X
            </button>
            {children}
        </dialog>,
        document.getElementById('modal')!
    );
};

export default Modal;