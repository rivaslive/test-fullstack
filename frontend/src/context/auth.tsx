import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import PATHS from 'utils/paths';
import storage from 'services/storage';
import fetch from 'services/fetchInstance';
import useQueryFetch from 'hooks/useQueryFetch';
import {RequestBookItemProps} from 'components/Molecules/CardRequestBook';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'librarian';
}

interface UserReq {
  email: string;
  password?: string;
}

interface LoginReturn {
  data: User | null;
  error: string | null;
}

interface AuthContextProps {
  user: User | null;
  error: string | null;
  loading: boolean;
  login: (values: UserReq) => Promise<LoginReturn>;
  logout: () => void;
  refetchReqBooks: () => void;
  requestBooks: RequestBookItemProps[]
}

const defaultValue: AuthContextProps = {
  user: null,
  error: null,
  loading: true,
  requestBooks: [],
  refetchReqBooks: () => {},
  login: () => Promise.resolve({ data: null, error: null }),
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultValue);

interface AuthProviderProps {
  children: ReactNode;
}

const storageKey = '@auth';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filters = useMemo(() => {
    return [
      {
        key: 'state',
        value: 'requested',
      },
      {
        key: 'student',
        value: user?.id,
      }
    ]
  }, [user?.id])

  const { data, getData } = useQueryFetch<RequestBookItemProps[]>({
    path: PATHS.REQUEST_BOOKS,
    skip: !user,
    filters
  })

  const onLogin = useCallback(async (values: UserReq) => {
    let textError = '';
    setError('');
    setIsLoading(true);
    try {
      const { data } = await fetch.post<User | null>('/auth/signIn', values);
      setIsLoading(false);
      setUser(data);
      storage.set(storageKey, data, true);
      return { data, error: null };
    } catch (err: any) {
      // eslint-disable-next-line no-console
      textError = err?.response?.data?.message || err?.message || '';
      setError(textError);
    }
    setIsLoading(false);
    return { data: null, error: textError };
  }, []);

  const onLogout = useCallback(() => {
    setError('');
    setUser(null);
    storage.remove(storageKey);
  }, []);

  useEffect(() => {
    const user = storage.get(storageKey, true);
    if (user) {
      setUser(user as User);
    }
    setIsLoading(false);
  }, []);

  const output = useMemo(() => {
    return {
      user,
      error,
      logout: onLogout,
      login: onLogin,
      loading: isLoading,
      refetchReqBooks: getData,
      requestBooks: data || [],
    };
  }, [user, error, isLoading, onLogin, onLogout, data, getData]);

  return <AuthContext.Provider value={output}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
