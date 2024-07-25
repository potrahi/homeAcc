import { Link, Outlet } from "react-router-dom";
import SpendingModal from "../components/Spending/SpendingModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Root() {

    const show = useSelector((state: RootState) => state.modal.isOpen);
    console.log(show);
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Outlet />
            {show && <SpendingModal />}
        </>
    );
}