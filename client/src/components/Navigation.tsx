import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const NavColor = styled.nav`
  background-color: ${props => props.theme.navBgColor};
`;

const Nav = tw(NavColor)`
px-5
my-5
py-5
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
  return (
    <>
      <Nav>
        <NavItems>
          <Link to="/">
            <NavItem>홈</NavItem>
          </Link>
          <NavItemsNotHome>
            <Link to="/login">
              <NavItem>로그인</NavItem>
            </Link>
            <Link to="/register">
              <NavItem>회원가입</NavItem>
            </Link>
            <Link to="/profile">
              <NavItem>프로필</NavItem>
            </Link>
          </NavItemsNotHome>
        </NavItems>
      </Nav>
    </>
  );
};

export default Navigation;
