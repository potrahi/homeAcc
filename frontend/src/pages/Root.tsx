import { ReactNode, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../components/UI/Modal";
import { RootState } from "../store";
import { ModalContextType } from "../types/types";
import './styles/Root.css';

export default function Root() {
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const [modalContent, setModalContent] = useState<ReactNode>(null);

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Outlet context={{ setModalContent } as ModalContextType} />
            {isOpen && <Modal>{modalContent}</Modal>}
        </>
    );
}