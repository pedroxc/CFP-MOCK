import React, { useState } from 'react';
import { MenuItem } from '@material-ui/core/';
import { CustomSelect, FilterContainer, Label } from './styles';

const statusList = [
  { id: 'all', name: 'Todos' },
  { id: 'HIRED', name: 'Contratado' },
  { id: 'ANALYZE', name: 'Em Análise' },
  { id: 'REFUSED', name: 'Recusado' },
  { id: 'CANCELED', name: 'Cancelada' },
  { id: 'WAITING_SIGNATURE', name: 'Aguardando assinatura' },
];

interface StatusItem {
  id: string;
  name: string;
}

interface IEvent {
  target?: {
    value: unknown;
  }
}

interface StatuProps {
  selectStatus(status: string): void;
}

const StatusFilter: React.FC<StatuProps> = ({ selectStatus }) => {
  const [statusSelected, setStatus] = useState('');

  const handleChange = ({ target }: IEvent) => {
    const statusId = String(target?.value) || '';
    setStatus(statusId);
    selectStatus(statusId !== 'all' ? statusId : '');
  };

  return (
    <FilterContainer>
      <Label>Visualizar:</Label>
      <CustomSelect
        label="Status"
        value={statusSelected || 'all'}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              width: 180,
              borderRadius: 10,
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          getContentAnchorEl: null,
        }}
        disableUnderline
      >
        {statusList?.map((item: StatusItem) => (
          <MenuItem key={item.id} value={item.id} style={{ fontSize: 14 }}>
            {item.name}
          </MenuItem>
        ))}
      </CustomSelect>
    </FilterContainer>
  );
};

export default StatusFilter;
