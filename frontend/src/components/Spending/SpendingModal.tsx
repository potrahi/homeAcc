import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { modalActions } from "../../store/modal";
import SpendingForm from "./SpendingForm";
import Modal from "../UI/Modal";
import { RootState } from "../../store";

export default function SpendingModal() {
    const dispatch = useDispatch();
    const show = useSelector((state: RootState) => state.modal.isOpen);

    const closeModal = () => {
        dispatch(modalActions.closeModal());
    };

    return (
        <Modal isOpen={show} onClose={closeModal}>
            <SpendingForm />
        </Modal>
    )
}