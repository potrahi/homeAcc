import { useDispatch } from "react-redux";
import { modalActions } from "../store/modal";
import RealTimeDate from "../components/RealTimeDate";
import SpendingTable from "../components/Spending/SpendingTable";

export default function Home() {
    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(modalActions.openModal());
    };

    return (
        <section>
            <ul>
                <li>Date: {<RealTimeDate />}</li>
                <li>Balance:</li>
            </ul>
            <SpendingTable />
            <button id="modal" onClick={openModal}>Add transaction</button>
        </section>
    );
}