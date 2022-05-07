import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import useHeader from '../hooks/useHeader';
import DarkModeToggle from 'react-dark-mode-toggle';
import { useStore } from '../store/store';

const NavColor = styled.nav`
  background-color: ${props => props.theme.navBgColor};
`;

const Nav = tw(NavColor)`
p-5
w-full
fixed
top-0
`;
const NavItems = tw.ul`
flex
justify-between
items-center
`;
const NavItemsNotHome = tw(NavItems)`
w-[20%]
`;
const NavItemColor = styled.li`
  background-color: ${props => props.theme.navBgColor};
`;

const NavItem = tw(NavItemColor)`
  
`;

const Navigation = () => {
  const { user, onLoginClick, onLogout } = useHeader();
  const { isDark, setIsDark } = useStore();
  return (
    <>
      <Nav>
        <NavItems>
          <Link to="/">
            <NavItem>홈</NavItem>
          </Link>
          <NavItemsNotHome>
            <DarkModeToggle onChange={setIsDark} checked={isDark} />
            {user ? (
              <>
                <Link to="/write">
                  <NavItem>업로드</NavItem>
                </Link>
                <button onClick={onLogout}>{user.username}로그아웃</button>
                <Link to="/setting">
                  <NavItem>설정</NavItem>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <NavItem>로그인</NavItem>
                </Link>
                <Link to="/register">
                  <NavItem>회원가입</NavItem>
                </Link>
              </>
            )}
          </NavItemsNotHome>
        </NavItems>
      </Nav>
    </>
  );
};

export default Navigation;
