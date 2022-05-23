import styled from 'styled-components';

const UserMenuList = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 1rem;
  right: 4rem;
`;

const UserMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  height: 2rem;
  width: 6rem;
  background-color: #fff;
  border: 1px solid #000;
  color: black;
`;

export default {
  UserMenuList,
  UserMenuItem,
};
