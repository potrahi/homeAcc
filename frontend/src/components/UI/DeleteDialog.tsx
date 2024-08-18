import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpendingType } from "../../types/spending";
import "./DeleteDialog.css";

interface DeleteConfirmationProps {
    item: SpendingType | null;
    deleteFunction: (id: string) => Promise<void>;
    queryKey: string[];
    onSuccess?: () => void;
    onCancel?: () => void;
    itemName?: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
    item, deleteFunction, queryKey, onSuccess, onCancel, itemName
}) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => deleteFunction(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            if (onSuccess) onSuccess();
        },
        onError: (error: Error) => {
            alert(error.message);
        }
    })

    const handleDelete = () => {
        if (item && item.id) {
            mutation.mutate(item.id);
        }
    };

    return (
        <div className="delete-confirmation">
            <p>Are you sure you want to delete this {itemName}?</p>
            <div className="buttons">
                <button onClick={handleDelete} className="delete-button">
                    {mutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
                <button onClick={onCancel} className="cancel-button">
                    Cancel
                </button>
            </div>
            {mutation.isError && <div className="error">Error deleting {itemName}. Please try again.</div>}
        </div>
    );
};

export default DeleteConfirmation;
