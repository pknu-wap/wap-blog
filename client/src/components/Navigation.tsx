import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import useHeader from '../hooks/useHeader';

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
  return (
    <>
      <Nav>
        <NavItems>
          <Link to="/">
            <NavItem>홈</NavItem>
          </Link>
          {user ? (
            <NavItemsNotHome>
              <button onClick={onLogout}>{user.username}로그아웃</button>
              <Link to="/profile">
                <NavItem>프로필</NavItem>
              </Link>
            </NavItemsNotHome>
          ) : (
            <NavItemsNotHome>
              <Link to="/login">
                <NavItem>로그인</NavItem>
              </Link>
              <Link to="/register">
                <NavItem>회원가입</NavItem>
              </Link>
            </NavItemsNotHome>
          )}
        </NavItems>
      </Nav>
    </>
  );
};

export default Navigation;
