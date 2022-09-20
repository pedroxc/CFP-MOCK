import React, { useState } from 'react';
import { MenuItem } from '@material-ui/core/';
import { CustomSelect, FilterContainer, Label } from './styles';
import { useAuth } from '../../hooks/auth';

const optionList = [
  { id: 'all', name: 'Todos' },
  { id: 'user-requester', name: 'Minhas Solicitações' },
];

interface IOption {
  id: string;
  name: string;
}

interface IEvent {
  target?: {
    value: unknown;
  }
}

interface FilterProps {
  selectRequester(id: string): void;
}

const AnalystFilter: React.FC<FilterProps> = ({ selectRequester }) => {
  const [requesterId, setRequesterId] = useState('');
  const { userId } = useAuth();

  const handleChange = ({ target }: IEvent) => {
    const selectedId = String(target?.value) || '';
    setRequesterId(selectedId);
    selectRequester(selectedId === 'all' ? '' : userId);
  };

  return (
    <FilterContainer>
      <Label>Visualizar:</Label>
      <CustomSelect
        label="Status"
        value={requesterId || 'all'}
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
        {optionList?.map((item: IOption) => (
          <MenuItem key={item.id} value={item.id} style={{ fontSize: 14 }}>
            {item.name}
          </MenuItem>
        ))}
      </CustomSelect>
    </FilterContainer>
  );
};

export default AnalystFilter;
