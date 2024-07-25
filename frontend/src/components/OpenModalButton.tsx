import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ModalContextType } from "../types/types";
import { useOutletContext } from "react-router-dom";
import { modalActions } from "../store/modal";

type OpenModalButtonProps = {
    modalContent: React.ReactNode;
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ modalContent }) => {
    const dispatch = useDispatch();
    const { setModalContent } = useOutletContext<ModalContextType>();

    const openModal = useCallback(() => {
        setModalContent(modalContent);
        dispatch(modalActions.openModal());
    }, [dispatch, setModalContent, modalContent]);

    return (
        <button id="modal-button" onClick={openModal}>Add transaction</button>
    )
}

export default OpenModalButton;