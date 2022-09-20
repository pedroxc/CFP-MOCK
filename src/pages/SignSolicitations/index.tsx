import React, { useState, useEffect, useCallback } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSolicitations } from '../../services/Solicitations';
import { Container, Title, HeaderContainer } from './styles';
import { useFilters } from '../../hooks/filters';
import AnalystFilter from '../../components/AnalystFilter';
import { useAuth } from '../../hooks/auth';
import Cards from '../../components/Cards';
import SignSolicitation from '../../components/SignSolicitation';
import ModalBox from '../../components/modalDefault';
import LoadingPage from '../LoadingPage';

interface ISolicitations {
  theme: DefaultTheme;
}

const Solicitations: React.FC<ISolicitations> = () => {
  const [data, setData] = useState([]);
  const [requestSign, setRequestSign] = useState<any | null>();
  const pageSize = 20;
  const [currentPage, SetCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { companiesSelected } = useFilters();
  const [loading, setLoading] = useState(false);
  const [requesterId, setRequesterId] = useState('');
  const [openSignModal, setSignModal] = useState(false);
  const { isSales } = useAuth();

  const fetchMoreData = async () => {
    const skip = currentPage * pageSize;
    const response = await getSolicitations(pageSize, skip, companiesSelected, 'WAITING_SIGNATURE', requesterId);

    SetCurrentPage(currentPage + 1);
    const newData = data.concat(response?.data?.solicitations);
    setData(newData);
    if (newData.length >= response?.data?.totalCount) {
      setHasMore(false);
    }
  };

  const initSolicitations = useCallback(async () => {
    setLoading(true);
    const response = await getSolicitations(pageSize, 0, companiesSelected, 'WAITING_SIGNATURE', requesterId);

    setData(response?.data?.solicitations || []);
    SetCurrentPage(1);
    setHasMore(true);
    setLoading(false);
  }, [companiesSelected, requesterId]);

  const signModal = useCallback((signData) => {
    setRequestSign(signData);
    setSignModal(true);
  }, []);

  const handleActionsSuccess = useCallback(() => {
    setSignModal(false);
    initSolicitations();
  }, [initSolicitations]);

  useEffect(() => {
    initSolicitations();
  }, [initSolicitations]);

  return (
    <>
      {loading && <LoadingPage />}
      <Container>
        <HeaderContainer>
          <Title>Assinar Solicitação</Title>
          {isSales() && (
            <AnalystFilter selectRequester={(userId) => setRequesterId(userId)} />
          )}
        </HeaderContainer>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader=""
        >
          {data?.map((el: any) => (
            <Cards
              key={el?.solicitation}
              data={el}
              view="solicitations"
              openSignSolicitation={(signData) => signModal(signData)}
            />
          ))}
        </InfiniteScroll>
        {loading && ('Carregando...')}
        {!data.length && !loading && ('Nenhum resultado encontrado.')}
      </Container>
      <ModalBox
        width="575px"
        height="650px"
        openModal={openSignModal}
        handleCloseModal={() => setSignModal(false)}
      >
        <SignSolicitation
          data={requestSign}
          handleSuccess={handleActionsSuccess}
          setLoading={(loadingStatus) => setLoading(loadingStatus)}
          loading={loading}
        />
      </ModalBox>
    </>
  );
};

export default withTheme(Solicitations);
