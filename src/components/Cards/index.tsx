import React, { useCallback, useEffect, useState } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import {
  AiOutlinePaperClip,
} from 'react-icons/ai';
import { BsCheck2, BsPencilSquare } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { TiCancel } from 'react-icons/ti';
import { IoDocumentTextOutline } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';

import {
  Container,
  StatusWarpper,
  DischargeStatus,
  StatusSecondLine,
  ActionButtons,
  ButtonWrapper,
  InfoColumn,
} from './styles';
import { useAuth } from '../../hooks/auth';
import InternalStatus from '../InternalStatus';
import IntegrationStatus from '../IntegrationStatus';
import PrintSolicitationCCB from '../PrintSolicitationCCB';
import CardDates from '../CardDates';
import CardSolicitationInfo from '../CardSolicitationInfo';
import CardEmployeeInfo from '../CardEmployeeInfo';
import EditBankDetailsButton from '../EditBankDetailsButton';
import { IBankDetails } from '../../models/IBankDetails';

interface IRequestData {
  companyId?: string;
  solicitationId: string;
  userId: string;
}

interface IActionRequest {
  data: IRequestData,
  action: string
}

interface ICards {
  data: any;
  theme: DefaultTheme,
  view: string,
  handleAction?: (data: IActionRequest) => void;
  openEditBankDetailsModal?: (bankDetailsInfo: {
    employeeId: string,
    proposalCode?: string,
    bankDetails?: IBankDetails;
  }) => void;
  openRefuseModal?: (refuseReasonInfo: IRequestData) => void;
  openSignSolicitation?: (data: any) => void;
}

const Cards: React.FC<ICards> = ({
  data,
  openEditBankDetailsModal,
  openRefuseModal,
  openSignSolicitation,
  handleAction,
  theme,
  view,
}) => {
  const [solicitationStatus, setSolicitationStatus] = useState(data?.solicitation_status);
  const [integrationStatus] = useState(data?.status_integration_name);
  const { isSales, isAdmin, userId } = useAuth();

  useEffect(() => {
    setSolicitationStatus(data?.solicitation_status);
  }, [data]);
  const isHired = () => solicitationStatus === 'HIRED';
  const isAnalyze = () => solicitationStatus === 'ANALYZE';
  const isRefused = () => solicitationStatus === 'REFUSED';
  const isCanceled = () => solicitationStatus === 'CANCELED';
  const isWaitingAssign = () => solicitationStatus === 'WAITING_SIGNATURE';
  const isPending = () => integrationStatus === 'Pendente Pagamento';
  const isReleased = () => integrationStatus === 'Liberada';
  const hasPayment = () => data?.simulation_has_payment;

  const views = {
    solicitations: 'solicitations',
    employees: 'employees',
  };

  const openEditBankDetails = useCallback(() => {
    if (openEditBankDetailsModal) {
      openEditBankDetailsModal({
        employeeId:
          view === views.solicitations ? data?.employee_id : data?.id,
        proposalCode: data?.solicitation_codigo_proposta_mp || '',
        bankDetails: data?.bank_details || {},
      });
    }
  }, [data, openEditBankDetailsModal]);

  const approveSolicitation = useCallback(async () => {
    const requestData = {
      companyId: data?.company_id || '',
      solicitationId: data?.solicitation || '',
      userId,
    };
    if (handleAction) {
      handleAction({ data: requestData, action: 'approve' });
    }
  }, [data?.company_id, data?.solicitation, handleAction, userId]);

  const refuseSolicitation = useCallback(async () => {
    if (openRefuseModal) {
      openRefuseModal({
        solicitationId: data?.solicitation || '',
        userId,
      });
    }
  }, [data?.solicitation, openRefuseModal, userId]);

  const canceledSolicitation = useCallback(async () => {
    if (handleAction) {
      handleAction({ data: { solicitationId: data?.solicitation || '', userId }, action: 'cancel' });
    }
  }, [data?.solicitation, handleAction, userId]);

  const signSolicitation = useCallback(async () => {
    if (openSignSolicitation) {
      openSignSolicitation(data);
    }
  }, [data, openSignSolicitation]);

  const ActionButtonsList = [
    {
      name: 'Aprovar',
      icon: <BsCheck2 size={25} />,
      background: true,
      action: approveSolicitation,
      displayRule: isAnalyze() && !isSales() && !isPending(),
    },
    {
      name: 'Recusar',
      icon: <CgClose size={25} />,
      action: refuseSolicitation,
      displayRule: isAnalyze() && !isPending(),

    },
    {
      name: 'Cancelar',
      icon: <TiCancel size={25} />,
      action: canceledSolicitation,
      displayRule: isHired() && isReleased() && isAdmin() && !isPending(),
    },
    {
      name: 'Editar dados bancários',
      icon: <BsPencilSquare size={25} />,
      action: openEditBankDetails,
      displayRule: isPending(),
    },
    {
      name: 'Assinar proposta',
      icon: <IoDocumentTextOutline size={25} />,
      action: signSolicitation,
      displayRule: isWaitingAssign() && !isPending() && (isAdmin() || isSales()),
    },
  ];

  return (
    <Container>
      <InfoColumn>
        <CardDates
          createAt={
            view === views.solicitations ? data?.solicitation_created_at : data.created_at
          }
          actionAt={data?.approver_created_at}
          admissionAt={data?.admission_date}
          isRefused={isRefused()}
        />
        {view === views.solicitations && (
          <CardSolicitationInfo data={data} />
        )}
        {view === views.employees && (
          <CardEmployeeInfo data={data} />
        )}
      </InfoColumn>
      <StatusWarpper>
        {hasPayment() && (
          <DischargeStatus>
            <AiOutlinePaperClip />
            Empréstimo possui quitação
          </DischargeStatus>
        )}
        {view === views.solicitations && (
          <>
            <StatusSecondLine>
              <InternalStatus status={solicitationStatus} />
              {integrationStatus && !isCanceled() && !isRefused() && !isAnalyze() && (
                <IntegrationStatus status={integrationStatus} />
              )}
              <PrintSolicitationCCB
                status={solicitationStatus}
                proposalCode={data?.solicitation_codigo_proposta_mp}
              />
            </StatusSecondLine>
            <ButtonWrapper>
              {ActionButtonsList.map(({
                name, icon, action, background, displayRule,
              }) => (
                displayRule && (
                  <ActionButtons
                    key={name}
                    onClick={action}
                    backgroundColor={background ? theme.colors.darkBlue : ''}
                    data-tip={name}
                    data-background-color={theme.colors.background}
                    data-place="bottom"
                    data-type="light"
                    data-effect="solid"
                    data-text-color={theme.colors.darkBlue}
                  >
                    {icon}
                  </ActionButtons>
                )
              ))}
            </ButtonWrapper>
          </>
        )}
        {view === views.employees && (
          <EditBankDetailsButton handleAction={openEditBankDetails} />
        )}
      </StatusWarpper>
      <ReactTooltip />
    </Container>
  );
};

export default withTheme(Cards);
