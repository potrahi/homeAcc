import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { modalActions } from "../../store/modal";
import Modal from "../../components/UI/modal/Modal";
import Balance from "../../components/Balance";
import RealTimeDate from "../../components/RealTimeDate";
import SettingsButton from "../../components/settings/button/SettingsButton";
import SettingsForm from "../../components/settings/SettingsForm";
import SpendingTable from "../../components/spending/table/SpendingTable";
import SpendingDeleteDialog from "../../components/spending/SpendingDeleteDialog";
import SpendingForm from "../../components/spending/folder/SpendingForm";
import "./Home.css";

export default function Home() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);

    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const openModalWithContent = useCallback((content: React.ReactNode) => {
        setModalContent(content);
        dispatch(modalActions.openModal());
    }, [dispatch]);

    const handleOpenSettings = useCallback(() => {
        openModalWithContent(<SettingsForm />)
    }, [openModalWithContent]);

    const handleNewTransaction = useCallback(() => {
        openModalWithContent(<SpendingForm />);
    }, [openModalWithContent]);

    const handleEditDeleteSpending = useCallback((isDelete: boolean) => {
        openModalWithContent(isDelete ? <SpendingDeleteDialog /> : <SpendingForm />);
    }, [openModalWithContent]);

    const handleCloseModal = useCallback(() => {
        dispatch(modalActions.closeModal());
        setModalContent(null);
    }, [dispatch]);

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <SettingsButton onClick={handleOpenSettings} />
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
                    <SpendingTable onEditDeleteSpending={handleEditDeleteSpending} />
                </div>
                <button className="add-transaction-button" onClick={handleNewTransaction}>Add transaction</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>{modalContent}</Modal>
        </>
    );
}