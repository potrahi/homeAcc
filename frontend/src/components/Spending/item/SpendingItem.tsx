import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal";
import deleteIcon from "../../../assets/delete-icon.svg";
import editIcon from "../../../assets/edit-icon.svg"
import IconButton from "../../UI/button/IconButton";
import "./SpendingItem.css"

interface SpendingItemProps {
    id: string,
    username?: string,
    amount: number | string,
    created_at: string,
    onEditDelete: (isDelete: boolean) => void;
}

const SpendingItem: React.FC<SpendingItemProps> = ({ id, username, amount, created_at, onEditDelete }) => {
    const dispatch = useDispatch();

    const handleAction = (isDelete: boolean) => {
        dispatch(modalActions.setModalPayload({ id, username, amount, created_at }))
        onEditDelete(isDelete);
    }

    return (
        <>
            <td>{username}</td>
            <td>{amount}</td>
            <td>{created_at}</td>
            <td>
                <IconButton
                    onClick={() => handleAction(false)}
                    icon={editIcon}
                    altText="Edit"
                    className="edit-button"
                />
                <IconButton
                    onClick={() => handleAction(true)}
                    icon={deleteIcon}
                    altText="Delete"
                    className="delete-button"
                />
            </td>
        </>
    );
}

export default SpendingItem;