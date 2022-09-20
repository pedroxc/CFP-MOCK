import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { GrClose } from 'react-icons/gr';
import { CloseButton, modalStyles } from './styles';

interface IModal {
  openModal: boolean;
  height?: string;
  width?: string;
  handleCloseModal: VoidFunction;
}

const ModalBox: React.FC<IModal> = ({
  openModal, width, height, handleCloseModal, children,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(openModal);
  }, [openModal]);

  const closeModal = () => {
    setIsOpen(false);
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={modalStyles(height || '600px', width || '500px')}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
    >
      <CloseButton onClick={closeModal}>
        <GrClose size={22} />
      </CloseButton>
      {children}
    </Modal>
  );
};

export default ModalBox;
