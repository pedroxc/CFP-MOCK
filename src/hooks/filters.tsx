import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getStorage, setStorage } from '../utils/storage';
import storage from '../utils/storage/keys';
import { useAuth } from './auth';

interface FilterContextData {
  companiesSelected: string[];
  setCompany(companiesId: string[]): void;
}

export const FiltersContext = createContext<FilterContextData>({} as FilterContextData);

export const FiltersProvider: React.FC = ({ children }) => {
  const [companiesSelected, setCompaniesSelected] = useState(['']);
  const { userCompanies } = useAuth();

  const setCompany = useCallback((companiesId: string[]) => {
    setCompaniesSelected(companiesId);
    setStorage(storage.companyFilter, JSON.stringify(companiesId));
  }, []);

  useEffect(() => {
    const companiesFilter = getStorage(storage.companyFilter);
    if (companiesFilter) {
      const formattedValue = JSON.parse(companiesFilter);
      setCompaniesSelected(formattedValue);
    } else {
      setCompaniesSelected(userCompanies.map((el) => el.id));
    }
  }, [userCompanies]);

  return (
    <FiltersContext.Provider
      value={{
        companiesSelected,
        setCompany,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export function useFilters(): FilterContextData {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFilters must be used within an FiltersProvider');
  }
  return context;
}
