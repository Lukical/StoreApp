import styled from "./Modal.module.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    return (
        <div className={`${styled['overlay']} ${!isOpen ? styled['hide'] : ''} `} onClick={onClose}>
            {children}
        </div>
    )
}
export default Modal;