import { useDispatch } from "react-redux";
import type { SpendingType } from "../../types/spending";
import { modalActions } from "../../store/modal";


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
                <button onClick={() => handleClick("SpendingForm")}>Edit</button>
                <button onClick={() => handleClick("DeleteConfirmation")}>Delete</button>
            </td>
        </tr>
    );
}