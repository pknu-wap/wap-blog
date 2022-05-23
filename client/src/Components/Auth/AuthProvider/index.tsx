import { useEffect } from 'react';
import useGetCurrentUser from '../../../hooks/query/auth/useGetCurrentUser';
import { useStore } from '../../../store/store';

const AuthProvider = () => {
  const { setUser } = useStore();
  const { data: getCurrentUser } = useGetCurrentUser();
  const user = getCurrentUser ?? undefined;

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) return;
    setUser(user);
  }, [user, setUser]);
};

export default AuthProvider;
