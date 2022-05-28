import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import S from './styled';

interface IMenu {
  username: string;
  onLogout: () => void;
}

export default function UserMenu({ username, onLogout }: IMenu) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <S.BtnContainer>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {username}
        </Button>
      </S.BtnContainer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link to={`/@${username}`}>
          <MenuItem onClick={handleClose}>내 블로그</MenuItem>
        </Link>
        <Link to={`/setting`}>
          <MenuItem onClick={handleClose}>설정</MenuItem>
        </Link>
        <MenuItem onClick={onLogout}>로그아웃</MenuItem>
      </Menu>
    </div>
  );
}
