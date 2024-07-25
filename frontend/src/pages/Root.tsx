import { Link, Outlet } from "react-router-dom";
import './styles/Root.css';
import SettingsButton from "../components/OpenSettingsButton";
import ModalComponent from "../components/ModalComponent";

export default function Root() {
    console.log("test")

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <SettingsButton />
            </nav>
            <Outlet />
            <ModalComponent />
        </>
    );
}