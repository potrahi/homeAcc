import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RootState } from "../store";
import { modalActions } from "../store/modal";
import { deleteSpending } from "../api/spending";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal: React.FC = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const payload = useSelector((state: RootState) => state.modal.payload);

    const mutation = useMutation<string, Error, string>({
        mutationFn: (id: string) => deleteSpending(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spendings"] });
            dispatch(modalActions.closeModal());
        },
        onError: (error: Error) => {
            alert(error.message);
        }
    })

    const handleDelete = () => {
        if (payload && payload.id) {
            mutation.mutate(payload.id);
        }
    };

    const handleCancel = () => {
        dispatch(modalActions.closeModal());
    };

    return (
        <div className="delete-confirmation">
            <p>Are you sure you want to delete this spending item?</p>
            <div className="buttons">
                <button onClick={handleDelete} className="delete-button">
                    {mutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
                <button onClick={handleCancel} className="cancel-button">
                    Cancel
                </button>
            </div>
            {mutation.isError && <div className="error">Error deleting item. Please try again.</div>}

        </div>
    );
};

export default DeleteConfirmationModal;
