import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { withTheme, DefaultTheme } from 'styled-components';

import { GrClose } from 'react-icons/gr';
import Button from '../button';
import { acceptSolicitation, cancelSolicitation } from '../../services/Solicitations';
import {
  Title, ButtonWrapper, CloseButton, modalStyles,
} from './styles';

interface IActionRequest {
  data: {
    companyId?: string;
    solicitationId: string;
    userId: string;
  },
  action: string;
}

interface IModal {
  openModal: boolean;
  handleClose: VoidFunction;
  handleSuccess: (status: string) => void;
  modalData?: IActionRequest | null;
  theme: DefaultTheme
  setLoading: (loading: boolean) => void;
  loading: boolean;

}

const ConfirmActionModal: React.FC<IModal> = ({
  openModal, handleClose, handleSuccess, modalData, theme, setLoading, loading,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const actionsTitlesList = [
    { action: 'approve', title: 'Você deseja aprovar a solicitaçao?' },
    { action: 'cancel', title: 'Você deseja cancelar a solicitaçao?' },
  ];

  useEffect(() => {
    setIsOpen(openModal);
  }, [openModal]);

  const handleTitle = (actionName: string) => {
    const titleList = actionsTitlesList
      .filter((item) => item.action === String(actionName));
    if (!titleList[0]) {
      return (<></>);
    }
    const { title } = titleList[0];
    return (<Title>{title}</Title>);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    handleClose();
  }, [handleClose]);

  const approveSolicitation = useCallback(async () => {
    const { data } = modalData || {};
    const { data: result } = await acceptSolicitation(
      data?.companyId || '',
      data?.solicitationId || '',
      data?.userId || '',
    );
    if (result?.status) {
      handleSuccess(result.status);
    } else {
      closeModal();
    }
  }, [closeModal, handleSuccess, modalData]);

  const canceledSolicitation = useCallback(async () => {
    const { data } = modalData || {};
    const { data: result } = await cancelSolicitation(
      data?.solicitationId || '',
      data?.userId || '',
    );
    if (result?.status) {
      handleSuccess(result.status);
    } else {
      closeModal();
    }
  }, [closeModal, handleSuccess, modalData]);

  const handleAction = async (actionName: string) => {
    setLoading(true);
    if (actionName === 'approve') {
      await approveSolicitation();
    } else if (actionName === 'cancel') {
      await canceledSolicitation();
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={modalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
    >
      <CloseButton onClick={closeModal}>
        <GrClose size={22} />
      </CloseButton>
      {handleTitle(modalData?.action || '')}
      <ButtonWrapper>
        <Button
          background={theme.colors.lightGray}
          width="200px"
          disabled={loading}
          onClick={closeModal}
        >
          Não
        </Button>
        <Button
          type="submit"
          background={theme.colors.darkBlue}
          width="250px"
          disabled={loading}
          onClick={() => handleAction(modalData?.action || '')}
        >
          Sim
        </Button>
      </ButtonWrapper>
    </Modal>
  );
};

export default withTheme(ConfirmActionModal);
