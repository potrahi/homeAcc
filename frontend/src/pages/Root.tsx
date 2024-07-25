import { Link, Outlet } from "react-router-dom";
import SpendingModal from "../components/Spending/SpendingModal";

export default function Root() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <SpendingModal />
            <Outlet />
        </div>
    );
}