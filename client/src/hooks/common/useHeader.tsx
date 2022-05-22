import AuthAPI from '../../api/auth';
import { useStore } from '../../store/store';

// 나중에 로그인, 회원가입 Modal 띄울 때 쓸 것
const useHeader = () => {
  const { user, setUser } = useStore();

  // 이거는 나중에 클릭 시 Modal 띄울 예정
  const onLoginClick = () => {};

  const onLogout = async () => {
    await AuthAPI.logout();
    setUser(null);
    window.location.href = '/';
  };
  return { user, onLoginClick, onLogout };
};

export default useHeader;
