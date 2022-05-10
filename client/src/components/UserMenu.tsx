import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface UserMenuProps {
  visible: boolean;
  username: string;
  onClose: (e: any) => void;
  onLogout: () => void;
}

const UserMenu = ({ visible, username, onClose, onLogout }: UserMenuProps) => {
  if (!visible) return null;
  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <UserMenuList onClick={onClose}>
        <UserMenuItem>
          <Link to={`/@${username}`}>내 블로그</Link>
        </UserMenuItem>
        <UserMenuItem>
          <Link to={`/setting`}>설정</Link>
        </UserMenuItem>
        <UserMenuItem>
          <div onClick={onLogout}>로그아웃</div>
        </UserMenuItem>
      </UserMenuList>
    </OutsideClickHandler>
  );
};

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

export default UserMenu;
