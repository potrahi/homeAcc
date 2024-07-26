import RealTimeDate from "../components/RealTimeDate";
import SpendingTable from "../components/Spending/SpendingTable";
import Balance from "../components/Balance";
import OpenModalButton from "../components/OpenModalButton";
import "./styles/Home.css";

export default function Home() {

    console.log("test")

    return (
        <section id="home">
            <ul>
                <li id="time-item">{<RealTimeDate />}</li>
                <li>{<Balance />}</li>
            </ul>
            <div id="spending-table-container">
                <SpendingTable />
            </div>
            <OpenModalButton contentId="SpendingForm">
                <button id="modal-button">Add transaction</button>
            </OpenModalButton>
        </section>
    );
}