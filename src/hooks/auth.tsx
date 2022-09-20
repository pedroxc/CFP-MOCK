import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { isExpired, decodeToken } from 'react-jwt';
import contaFuturoApi from '../services/config/ContaFuturoApi';
import path from '../services/config/paths';
import { MenuItem } from '../models/MenuItem';
import storage from '../utils/storage/keys';
import { deleteStorage, getStorage, setStorage } from '../utils/storage';
import { toastError } from '../utils/toast/config';
import messages from '../utils/toast/messages';

interface SignInCredentials {
  email: string;
  password: string;
}
interface ResignInCredentials {
  email: string;
  password: string;
}

interface SignInResponse {
  companies: any;
  token: string;
  menu: MenuItem[];
}

interface IToken {
  exp?: number;
  sub?: string;
}

interface IResponse {
  status: string;
}

interface AuthContextData {
  userEmail: string;
  userToken: string;
  userId: string;
  userRole: string;
  menuItems: MenuItem[];
  userCompanies: {
    id: string;
    // eslint-disable-next-line camelcase
    common_name: string;
    name: string;
  }[];
  signIn(credentials: SignInCredentials): Promise<IResponse>;
  resignIn(credentials: ResignInCredentials): Promise<IResponse>;
  isAdmin(): boolean,
  isSales(): boolean,
  isRH(): boolean,
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [userEmail, setEmail] = useState('');
  const [userToken, setToken] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [userCompanies, setCompanies] = useState([]);
  const [menuItems, setMenu] = useState<MenuItem[]>([]);
  const roles = {
    admin: 'ADMIN',
    commercial: 'ANALYST',
    rh: 'RH',
  };

  const isAdmin = () => userRole === roles.admin;
  const isSales = () => userRole === roles.commercial;
  const isRH = () => userRole === roles.rh;

  const validToken = (token: string) => {
    if (isExpired(token)) {
      toastError(messages.user.sessionExpired);
      deleteStorage();
      window.location.reload();
    } else {
      const tokenData: IToken | null = decodeToken(token);
      if (tokenData?.sub) {
        // eslint-disable-next-line camelcase
        const { role, user_id } = JSON.parse(tokenData?.sub);
        setUserRole(role);
        setUserId(user_id);
      }
    }
  };

  const validUserData = useCallback(() => {
    const menuStorage = getStorage(storage.menu);
    const tokenStorage = getStorage(storage.token);
    const emailStorage = getStorage(storage.email);
    const companiesStorage = getStorage(storage.companies);

    if (menuStorage && emailStorage && tokenStorage && companiesStorage) {
      setMenu(JSON.parse(menuStorage));
      setEmail(emailStorage);
      setToken(tokenStorage);
      setCompanies(JSON.parse(companiesStorage));
      validToken(tokenStorage);
    } else {
      deleteStorage();
    }
  }, []);

  const signIn = useCallback(async ({ email, password }): Promise<IResponse> => {
    try {
      const response = await contaFuturoApi.post(path.contaFuturoApi.login, {
        email,
        password,
      });

      const { companies, token, menu }: SignInResponse = response.data;

      if (token) {
        setStorage(storage.email, email);
        setStorage(storage.companies, JSON.stringify(companies));
        setStorage(storage.token, token);
        setStorage(storage.menu, JSON.stringify(menu));
        setMenu(menu);
        setToken(token);
        setEmail(email);
        setCompanies(companies);
        validToken(token);
      }

      return { status: 'logged' };
    } catch (error) {
      toastError(messages.user.signError);
      return { status: 'notLogged' };
    }
  }, []);

  const resignIn = useCallback(async ({ email, password }): Promise<IResponse> => {
    try {
      const response = await contaFuturoApi.post(path.contaFuturoApi.login, {
        email,
        password,
      });

      const { companies, token, menu }: SignInResponse = response.data;

      if (token) {
        setStorage(storage.email, email);
        setStorage(storage.companies, JSON.stringify(companies));
        setStorage(storage.token, token);
        setStorage(storage.menu, JSON.stringify(menu));
        setMenu(menu);
        setToken(token);
        setEmail(email);
        setCompanies(companies);
        validToken(token);
      }

      return { status: 'logged' };
    } catch (error) {
      toastError(messages.user.resignError);
      return { status: 'notLogged' };
    }
  }, []);

  useEffect(() => {
    validUserData();
  }, [validUserData]);

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        userToken,
        userId,
        userRole,
        menuItems,
        userCompanies,
        signIn,
        resignIn,
        isAdmin,
        isSales,
        isRH,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
