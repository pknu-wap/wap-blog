import { Link } from 'react-router-dom';
import useHeader from '../../hooks/common/useHeader';
import { useStore } from '../../store/store';
import useToggle from '../../hooks/common/useToggle';
import React, { useRef } from 'react';
import UserMenu from '../UserMenu';
import useLocalStorage from '../../hooks/common/useLocalStorage';
import S from './styled';
import WAPImage from '/img/WAPImg.png';
import DarkToggle from '../Common/DarkModeToggle';
import FormModal from '../Modal';

const Navigation = () => {
  const { user, onLoginClick, onLogout } = useHeader();
  const [userMenu, toggleUserMenu] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isDark, setIsLocalDark] = useLocalStorage('isDark', false);
  const { setIsDark } = useStore();

  const onOutsideClick = (e: React.MouseEvent) => {
    if (!ref.current?.contains(e.target as any)) {
      toggleUserMenu();
    }
  };

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
                  <S.NavItem>글쓰기</S.NavItem>
                </Link>
                <div ref={ref}>
                  <button onClick={toggleUserMenu}>{user.username}</button>
                </div>
              </>
            ) : (
              <>
                <FormModal />
              </>
            )}
          </S.NavItemsNotHome>
        </S.NavItems>
        {user && (
          <UserMenu
            visible={userMenu}
            username={user.username}
            onClose={onOutsideClick}
            onLogout={onLogout}
          />
        )}
      </S.Nav>
    </>
  );
};

export default Navigation;
