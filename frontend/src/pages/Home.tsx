import { useDispatch } from "react-redux";
import { modalActions } from "../store/modal";
import RealTimeDate from "../components/RealTimeDate";
import SpendingTable from "../components/Spending/SpendingTable";
import "./Home.css";

export default function Home() {
    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(modalActions.openModal());
    };

    return (
        <section id="home">
            <ul>
                <li>Date: {<RealTimeDate />}</li>
                <li>Balance:</li>
            </ul>
            <div id="spending-table-container">
                <SpendingTable />
            </div>
            <button id="modal-button" onClick={openModal}>Add transaction</button>
        </section>
    );
}