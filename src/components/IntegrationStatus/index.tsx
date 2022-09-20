import React from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import { Status } from './styles';

interface IntegrationStatusProps {
  theme: DefaultTheme;
  status: string;
}
const IntegrationStatus: React.FC<IntegrationStatusProps> = ({ status, theme }) => {
  const isReleasedOrCeded = () => status === 'Liberada' || status === 'Cedida';

  return (
    <Status color={isReleasedOrCeded() ? theme?.colors.lightGreen : 'white'}>
      {status}
    </Status>
  );
};

export default withTheme(IntegrationStatus);
