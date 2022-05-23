import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const NavColor = styled.nav`
  background-color: ${(props) => props.theme.navBgColor};
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
mr-14
`;
const NavItemColor = styled.li`
  background-color: ${(props) => props.theme.navBgColor};
`;

const NavItem = tw(NavItemColor)`
  
`;
const HomeLogo = tw.img`
h-[30px]
`;

export default {
  NavColor,
  Nav,
  NavItems,
  NavItemsNotHome,
  NavItemColor,
  NavItem,
  HomeLogo,
};
