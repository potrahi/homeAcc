import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal';
import { RootState } from '../../store';

type ModalProps = {
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const dispatch = useDispatch();
    const show = useSelector((state: RootState) => state.modal.isOpen);
    const modalRef = useRef<HTMLDialogElement>(null);

    const onClose = useCallback(() => {
        dispatch(modalActions.closeModal());
    }, [dispatch]);

    useEffect(() => {
        const modal = modalRef.current;
        if (modal) {
            modal.addEventListener('close', onClose);
        }

        if (show) {
            modal?.showModal();
        } else {
            modal?.close();
        }

        return () => {
            if (modal) {
                modal.removeEventListener('close', onClose);
            }
        };
    }, [onClose, show]);

    return (
        <dialog ref={modalRef} onClose={onClose}>
            <button id="close-modal" className="close-button" onClick={onClose}>
                X
            </button>
            {children}
        </dialog>
    );
};

export default Modal;
