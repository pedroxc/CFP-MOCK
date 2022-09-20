import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from '../../components/Cards';
import EditBankDetailsForm from '../../components/EditBankDetailsForm';
import ModalBox from '../../components/modalDefault';
import { useFilters } from '../../hooks/filters';
import { IBankDetails } from '../../models/IBankDetails';
import { getEmployees } from '../../services/Employee';
import { Container, Title, HeaderContainer } from './styles';

interface IBankDetailsRequest {
  bankDetails?: IBankDetails;
  employeeId: string;
}

const Employees: React.FC = () => {
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
    const response = await getEmployees(pageSize, 0, companiesSelected);
    setData(response?.data?.employees || []);
    setCurrentPage(1);
    setHasMore(true);
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
        <Title>Funcionários</Title>
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
            view="employees"
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

export default Employees;
