import React, { useState, useEffect, useCallback } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSolicitations } from '../../services/Solicitations';
import Cards from '../../components/Cards';
import { Container, Title, HeaderContainer } from './styles';
import { useFilters } from '../../hooks/filters';
import StatusFilter from '../../components/statusFilter';
import ModalBox from '../../components/modalDefault';
import ConfirmActionModal from '../../components/ConfirmActionModal';
import CancelReasonForm from '../../components/CancelReasonForm';
import EditBankDetailsForm from '../../components/EditBankDetailsForm';
import LoadingPage from '../LoadingPage';

interface ISolicitations {
  theme: DefaultTheme;
}

interface IRequestData {
  companyId?: string;
  solicitationId: string;
  userId: string;
}

interface IActionRequest {
  data: IRequestData,
  action: string;
}

interface IBankDetailsRequest {
  proposalCode?: string;
  employeeId: string;
}

const Solicitations: React.FC<ISolicitations> = () => {
  const [requestBankInfo, setRequestBankInfo] = useState<IBankDetailsRequest | null>();
  const [requestRefuseInfo, setRequestRefuseInfo] = useState<IRequestData | null>();
  const [actionData, setActionData] = useState<IActionRequest | null>();
  const [openEditBankModal, setEditBankModal] = useState(false);
  const [openRefuseModal, setRefuseModal] = useState(false);
  const [openConfirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, SetCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { companiesSelected } = useFilters();
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);
  const pageSize = 20;

  const fetchMoreData = async () => {
    const skip = currentPage * pageSize;
    const response = await getSolicitations(pageSize, skip, companiesSelected, status);
    SetCurrentPage(currentPage + 1);
    const newData = data.concat(response?.data?.solicitations);
    setData(newData);
    if (newData.length >= response?.data?.totalCount) {
      setHasMore(false);
    }
  };

  const initSolicitations = useCallback(async () => {
    setLoading(true);
    setData([]);
    const response = await getSolicitations(pageSize, 0, companiesSelected, status);
    setData(response?.data?.solicitations || []);
    SetCurrentPage(1);
    setHasMore(true);
    setLoading(false);
  }, [companiesSelected, status]);

  const openBankDetailsModal = useCallback((dataBankRequest: IBankDetailsRequest) => {
    setRequestBankInfo(dataBankRequest);
    setEditBankModal(true);
  }, []);

  const closeBankDetailsModal = useCallback(() => {
    setEditBankModal(false);
    setRequestBankInfo(null);
  }, []);

  const openRefuseReasonModal = useCallback((dataRefuseRequest: IRequestData) => {
    setRequestRefuseInfo(dataRefuseRequest);
    setRefuseModal(true);
  }, []);

  const closeRefuseReasonModal = useCallback(() => {
    setRefuseModal(false);
    setRequestRefuseInfo(null);
  }, []);

  const openConfirmActionModal = useCallback((dataActionRequest: IActionRequest) => {
    setActionData(dataActionRequest);
    setConfirmModal(true);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModal(false);
    setActionData(null);
  }, []);

  const handleActionsSuccess = useCallback(() => {
    closeConfirmModal();
    closeRefuseReasonModal();
    closeBankDetailsModal();
    initSolicitations();
  }, [closeBankDetailsModal, closeConfirmModal, closeRefuseReasonModal, initSolicitations]);

  useEffect(() => {
    initSolicitations();
  }, [initSolicitations]);

  return (
    <>
      {loading && <LoadingPage />}
      <Container>
        <HeaderContainer>
          <Title>Solicitações</Title>
          <StatusFilter selectStatus={(statusSelected) => setStatus(statusSelected)} />
        </HeaderContainer>
        <InfiniteScroll
          dataLength={data?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader=""
        >
          {data?.map((el: any) => (
            <Cards
              key={el?.solicitation}
              data={el}
              view="solicitations"
              openEditBankDetailsModal={(info) => openBankDetailsModal(info)}
              openRefuseModal={(info) => openRefuseReasonModal(info)}
              handleAction={(dataRequest) => openConfirmActionModal(dataRequest)}
            />
          ))}
        </InfiniteScroll>
        {!data.length && !loading && ('Nenhum resultado encontrado.')}
        <ModalBox
          openModal={openEditBankModal}
          handleCloseModal={closeBankDetailsModal}
        >
          <EditBankDetailsForm
            requestInfo={requestBankInfo}
            handleSuccess={handleActionsSuccess}
            setLoading={setLoading}
            loading={loading}
          />
        </ModalBox>
        <ModalBox
          openModal={openRefuseModal}
          handleCloseModal={closeRefuseReasonModal}
          height="350px"
        >
          <CancelReasonForm
            requestInfo={requestRefuseInfo}
            handleSuccess={handleActionsSuccess}
            setLoading={setLoading}
            loading={loading}
          />
        </ModalBox>
        <ConfirmActionModal
          openModal={openConfirmModal}
          handleClose={closeConfirmModal}
          modalData={actionData}
          handleSuccess={() => handleActionsSuccess()}
          setLoading={setLoading}
          loading={loading}
        />
      </Container>
    </>

  );
};

export default withTheme(Solicitations);
