import 'react-responsive-modal/styles.css';
import { ReactNode } from 'react';
import { Modal as ModalLib } from 'react-responsive-modal';

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  children?: ReactNode;
  center?: boolean;
}

function Modal({ isOpen, onCancel, children, center = true }: ModalProps) {
  return (
    <ModalLib
      classNames={{
        overlay: 'app-overlay-modal',
        modal: 'app-modal',
      }}
      open={isOpen}
      onClose={onCancel}
      center={center}
    >
      {children}
    </ModalLib>
  );
}

export default Modal;
