import { ReactNode } from 'react';

export type OpenModalButtonProps = {
    contentId: React.ReactNode;
    children?: React.ReactNode;
}
export type ModalContextType = {
    setModalContent: (content: ReactNode) => void;
}
