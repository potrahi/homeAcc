import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { OpenModalButtonProps } from "../types/types";
import { modalActions } from "../store/modal";
import "./OpenModalButton.css";

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ contentId, children }) => {
    const dispatch = useDispatch();

    const openModal = useCallback(() => {
        if (contentId) {
            dispatch(modalActions.setModalContent(contentId));
            dispatch(modalActions.openModal());
        } else {
            console.error("No context found");
        }
    }, [dispatch, contentId]);

    return (
        <div className="modal-button-container" onClick={openModal}>
            {children}
        </div>
    )
}

export default OpenModalButton;