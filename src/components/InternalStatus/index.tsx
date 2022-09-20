import React from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import { Status } from './styles';

interface InternalStatusProps {
  theme: DefaultTheme;
  status: string;
}
const InternalStatus: React.FC<InternalStatusProps> = ({ status, theme }) => {
  const statusButtonConfig = [
    { status: 'HIRED', description: 'Contratado', color: theme?.colors.lightGreen },
    { status: 'WAITING_SIGNATURE', description: 'Aguardando assinatura', color: 'darkkhaki' },
    { status: 'ANALYZE', description: 'Em Análise', color: theme?.colors.auxPrimary },
    { status: 'REFUSED', description: 'Recusada', color: 'red' },
    { status: 'CANCELED', description: 'Cancelada', color: 'red' },
  ];

  const handleInternStatus = (internStatus: string) => {
    const statusConfig = statusButtonConfig
      .filter((item) => item.status === String(internStatus));
    if (!statusConfig[0]) {
      return (<></>);
    }
    const { description, color } = statusConfig[0];
    return (<Status flagColor={color}>{description}</Status>);
  };

  return handleInternStatus(status);
};

export default withTheme(InternalStatus);
