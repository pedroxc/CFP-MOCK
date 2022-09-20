import React, { useCallback } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';
import { withTheme, DefaultTheme } from 'styled-components';
import { openCCBDocument } from '../../services/MoneyPlus';
import { PrintButton, PrintText } from './styles';

interface PrintSolicitationProps {
  theme: DefaultTheme;
  status: string;
  proposalCode: string;
}

const PrintSolicitationCCB: React.FC<PrintSolicitationProps> = ({
  status, proposalCode, theme,
}) => {
  const isHired = () => status === 'HIRED';

  const handlePrint = useCallback(() => {
    openCCBDocument(proposalCode || '');
  }, [proposalCode]);

  return (
    <PrintButton
      disabled={!isHired()}
      onClick={handlePrint}
    >
      <AiOutlinePrinter
        color={isHired() ? (theme?.colors.darkBlue) : (theme?.colors.lightGray)}
        size={24}
      />
      <PrintText>Imprimir CCB</PrintText>
    </PrintButton>
  );
};

export default withTheme(PrintSolicitationCCB);
