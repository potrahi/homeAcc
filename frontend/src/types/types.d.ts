import { ReactNode } from "react";

export type OpenModalButtonProps = {
  contentId: string;
  children?: React.ReactNode;
  className?: string;
  payload?: SpendingType | null;
};
export type ModalContextType = {
  setModalContent: (content: ReactNode) => void;
  setModalPayload?: (payload: SpendingType | null) => void;
};
