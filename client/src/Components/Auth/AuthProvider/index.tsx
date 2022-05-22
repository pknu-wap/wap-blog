import { useEffect } from 'react';
import { useQuery } from 'react-query';
import UserAPI from '../../../api/user';
import { useStore } from '../../../store/store';

const AuthProvider = () => {
  const { setUser } = useStore();
  const getCurrentUser = useQuery('getCurrentUser', UserAPI.getCurrentUser);
  const user = getCurrentUser.data ?? undefined;

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) return;
    setUser(user);
  }, [user, setUser]);
};

export default AuthProvider;
