import SpendTable from "../components/SpendTable";
import SpendForm from "../components/SpendForm";
import Modal from "../components/UI/Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/modal";
import RealTimeDate from "../components/RealTimeDate";

export default function Home() {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.modal.isOpen);

    console.log(show);

    const openModal = () => {
        dispatch(modalActions.openModal());
    };

    const closeModal = () => {
        dispatch(modalActions.closeModal());
    };

    return (
        <section>
            <ul>
                <li>Date: {<RealTimeDate />}</li>
                <li>Balance:</li>
            </ul>
            <SpendTable />
            <button id="modal" onClick={openModal}>Add transaction</button>

            <Modal isOpen={show} onClose={closeModal}>
                <SpendForm />
            </Modal>
        </section>
    );
}