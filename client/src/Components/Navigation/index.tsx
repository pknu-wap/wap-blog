import { Link } from 'react-router-dom';
import useHeader from '../../hooks/common/useHeader';
import { useStore } from '../../store/store';
import useLocalStorage from '../../hooks/common/useLocalStorage';
import S from './styled';
import WAPImage from '/img/WAPImg.png';
import DarkToggle from '../Common/DarkModeToggle';
import FormModal from '../Modal';
import Button from '@mui/material/Button';
import UserMenu from '../UserMenu';

const Navigation = () => {
  const { user, onLoginClick, onLogout } = useHeader();
  const [isDark, setIsLocalDark] = useLocalStorage('isDark', false);
  const { setIsDark } = useStore();

  const onChange = () => {
    setIsLocalDark(!isDark);
    setIsDark(isDark);
  };

  return (
    <>
      <S.Nav>
        <S.NavItems>
          <Link to="/">
            <S.NavItem>
              <S.HomeLogo alt="WAPImg" src={WAPImage} />
            </S.NavItem>
          </Link>
          <S.NavItemsNotHome>
            <DarkToggle onChange={onChange} checked={isDark} />
            {user ? (
              <>
                <Link to="/write">
                  <S.BtnContainer>
                    <Button>글쓰기</Button>
                  </S.BtnContainer>
                </Link>

                <UserMenu username={user.username} onLogout={onLogout} />
              </>
            ) : (
              <>
                <FormModal />
              </>
            )}
          </S.NavItemsNotHome>
        </S.NavItems>
      </S.Nav>
    </>
  );
};

export default Navigation;
