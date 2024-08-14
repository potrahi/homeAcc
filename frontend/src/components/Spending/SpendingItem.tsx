import { useDispatch } from "react-redux";
import type { SpendingType } from "../../types/spending";
import { modalActions } from "../../store/modal";
import editIcon from "../../assets/edit-icon.svg"
import deleteIcon from "../../assets/delete-icon.svg";
import "./SpendingItem.css"

export default function SpendingItem({ id, username, amount, created_at }: SpendingType) {
    const dispatch = useDispatch();

    const handleClick = (modalContext: string) => {
        dispatch(modalActions.setModalContent(modalContext));
        dispatch(modalActions.setModalPayload({ id, username, amount, created_at }));
        dispatch(modalActions.openModal())
    }

    return (
        <tr>
            <td>{username}</td>
            <td>{amount}</td>
            <td>{created_at}</td>
            <td>
                <button className="edit-button" onClick={() => handleClick("SpendingForm")}>
                    <img src={editIcon} alt="Edit" className="edit-icon" />
                </button>
                <button className="delete-button" onClick={() => handleClick("DeleteConfirmation")}>
                    <img src={deleteIcon} alt="Delete" className="delete-icon" />
                </button>
            </td>
        </tr>
    );
}