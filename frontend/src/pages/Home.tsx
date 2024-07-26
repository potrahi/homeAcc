import { Link } from "react-router-dom";
import Balance from "../components/Balance";
import RealTimeDate from "../components/RealTimeDate";
import OpenModalButton from "../components/OpenModalButton";
import SettingsButton from "../components/Settings/SettingsButton";
import ModalComponent from "../components/ModalComponent";
import SpendingTable from "../components/Spending/SpendingTable";
import "./styles/Home.css";

export default function Home() {


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
                <OpenModalButton
                    className="add-transaction-button"
                    contentId="SpendingForm"
                >
                    <button>Add transaction</button>
                </OpenModalButton>
            </div>
            <ModalComponent />
        </>
    );
}