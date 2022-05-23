import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import S from './styled';
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
      <S.UserMenuList onClick={onClose}>
        <S.UserMenuItem>
          <Link to={`/@${username}`}>내 블로그</Link>
        </S.UserMenuItem>
        <S.UserMenuItem>
          <Link to={`/setting`}>설정</Link>
        </S.UserMenuItem>
        <S.UserMenuItem>
          <div onClick={onLogout}>로그아웃</div>
        </S.UserMenuItem>
      </S.UserMenuList>
    </OutsideClickHandler>
  );
};

export default UserMenu;
