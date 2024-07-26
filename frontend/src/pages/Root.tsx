import { Link, Outlet } from "react-router-dom";
import ModalComponent from "../components/ModalComponent";
import SettingsButton from "../components/Settings/SettingsButton";
import './styles/Root.css';

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