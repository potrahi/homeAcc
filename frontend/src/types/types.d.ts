import { ReactNode } from 'react';

export type ModalContextType = {
    setModalContent: (content: ReactNode) => void;
}
