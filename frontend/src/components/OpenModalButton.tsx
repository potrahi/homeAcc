import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { OpenModalButtonProps } from "../types/types";
import { modalActions } from "../store/modal";

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
        <div onClick={openModal}>
            {children ? children : <button id="modal-button">Add transaction</button>}
        </div>
    )
}

export default OpenModalButton;