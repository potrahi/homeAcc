import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { modalActions } from "../../store/modal";
import DeleteDialog from "../UI/DeleteDialog";
import { deleteSpending } from "../../api/spending";

const SpendingDeleteDialog: React.FC = () => {
    const dispatch = useDispatch();
    const payload = useSelector((state: RootState) => state.modal.payload);

    const handleCloseModal = () => {
        dispatch(modalActions.closeModal());
    }

    return (
        <DeleteDialog
            item={payload}
            deleteFunction={deleteSpending}
            queryKey={["spendings"]}
            onSuccess={handleCloseModal}
            onCancel={handleCloseModal}
            itemName="spending item"
        />
    );
};

export default SpendingDeleteDialog;
