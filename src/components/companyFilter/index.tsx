import React from 'react';
import { MenuItem, InputLabel } from '@material-ui/core/';
import { useFilters } from '../../hooks/filters';
import { useAuth } from '../../hooks/auth';
import { CustomSelect, FilterContainer } from './styles';

interface CompanyItem {
  id: string;
  // eslint-disable-next-line camelcase
  common_name: string;
  name: string;
}

interface IEvent {
  target?: {
    value: unknown;
  }
}

const allOption = {
  id: 1,
  name: 'Todas',
};

const CompanyFilter: React.FC = () => {
  const { setCompany, companiesSelected } = useFilters();
  const { userCompanies } = useAuth();

  const handleChange = ({ target }: IEvent) => {
    const value = String(target?.value);
    setCompany(value === '1' ? userCompanies.map((el) => el.id) : [value]);
  };

  return (
    <FilterContainer variant="outlined">
      <InputLabel>Empresa</InputLabel>
      <CustomSelect
        label="Empresas"
        value={
          companiesSelected.length > 1 ? allOption.id : (companiesSelected[0] || '')
        }
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              borderRadius: 10,
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        <MenuItem key={allOption.id} value={allOption.id} style={{ fontSize: 14 }}>
          {allOption.name}
        </MenuItem>
        {userCompanies?.map((item: CompanyItem) => (
          <MenuItem key={item.id} value={item.id} style={{ fontSize: 14 }}>
            {item.common_name || item.name}
          </MenuItem>
        ))}
      </CustomSelect>
    </FilterContainer>
  );
};

export default CompanyFilter;
