import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from '../../components/Cards';
import EditBankDetailsForm from '../../components/EditBankDetailsForm';
import ModalBox from '../../components/modalDefault';
import { useFilters } from '../../hooks/filters';
import { IBankDetails } from '../../models/IBankDetails';
import { getEmployees } from '../../services/Employee';
import { getSolicitations } from '../../services/Solicitations';
import { Container, Title, HeaderContainer } from './styles';

interface IBankDetailsRequest {
  bankDetails?: IBankDetails;
  employeeId: string;
}

const PendingPayment: React.FC = () => {
  const [requestBankInfo, setRequestBankInfo] = useState<IBankDetailsRequest | null>();
  const [openEditBankModal, setEditBankModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { companiesSelected } = useFilters();

  const fetchMoreData = async () => {
    const skip = currentPage * pageSize;
    const response = await getEmployees(pageSize, skip, companiesSelected);
    setCurrentPage(currentPage + 1);
    const newData = data.concat(response?.data?.employees);
    setData(newData);
    if (newData.length >= response?.data?.totalCount) {
      setHasMore(false);
    }
  };

  const openBankDetailsModal = useCallback((dataBankRequest: IBankDetailsRequest) => {
    setRequestBankInfo(dataBankRequest);
    setEditBankModal(true);
  }, []);

  const closeBankDetailsModal = useCallback(() => {
    setEditBankModal(false);
    setRequestBankInfo(null);
  }, []);

  const initSolicitations = useCallback(async () => {
    setLoading(true);
    setData([]);
    const response = await getSolicitations(
      pageSize, 0, companiesSelected, '', '', '11',
    );
    setData(response?.data?.solicitations || []);
    setCurrentPage(1);
    if (response?.data?.solicitations.length >= response?.data?.totalCount) {
      setHasMore(false);
    }
    setLoading(false);
  }, [companiesSelected]);

  const handleActionsSuccess = useCallback(() => {
    closeBankDetailsModal();
    initSolicitations();
  }, [closeBankDetailsModal, initSolicitations]);

  useEffect(() => {
    initSolicitations();
  }, [initSolicitations]);

  return (
    <Container>
      <HeaderContainer>
        <Title>Pendente de Pagamento</Title>
      </HeaderContainer>
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader=""
      >
        {data?.map((item: any) => (
          <Cards
            key={item?.id}
            data={item}
            view="solicitations"
            openEditBankDetailsModal={(info) => openBankDetailsModal(info)}
          />
        ))}
      </InfiniteScroll>
      {loading && ('Carregando...')}
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
    </Container>
  );
};

export default PendingPayment;
