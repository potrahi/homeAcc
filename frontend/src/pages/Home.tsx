import { Link } from "react-router-dom";
import Balance from "../components/Balance";
import RealTimeDate from "../components/RealTimeDate";
import SettingsButton from "../components/Settings/SettingsButton";
import ModalComponent from "../components/ModalComponent";
import SpendingTable from "../components/Spending/SpendingTable";
import "./Home.css";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/modal";

export default function Home() {
    const dispatch = useDispatch()

    const handleNewTransaction = () => {
        dispatch(modalActions.setModalContent("SpendingForm"));
        dispatch(modalActions.openModal())
    }

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <SettingsButton />
            </nav>
            <div className="main-content">
                <div className="info-container">
                    <div className="real-time-container">
                        <RealTimeDate />
                    </div>
                    <div className="balance-container">
                        <Balance />
                    </div>
                </div>
                <div className="table-container">
                    <SpendingTable />
                </div>
                <button className="add-transaction-button" onClick={handleNewTransaction}>Add transaction</button>
            </div>
            <ModalComponent />
        </>
    );
}