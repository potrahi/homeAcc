import { useSelector } from "react-redux";
import SettingsForm from "./Settings/SettingsForm";
import SpendingForm from "./Spending/SpendingForm";
import Modal from "./UI/Modal";
import { RootState } from "../store";
import DeleteConfirmation from "./DeleteConfirmation";

type ModalContentKey = keyof typeof MODAL_CONTENT;

const MODAL_CONTENT = {
    SpendingForm: <SpendingForm />,
    SettingsForm: <SettingsForm />,
    DeleteConfirmation: <DeleteConfirmation />
};

const ModalComponent = () => {
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const contentId = useSelector((state: RootState) => state.modal.contentId) as ModalContentKey | null;

    if (isOpen && contentId !== null) {
        return <Modal>{MODAL_CONTENT[contentId]}</Modal>
    }
}

export default ModalComponent;
