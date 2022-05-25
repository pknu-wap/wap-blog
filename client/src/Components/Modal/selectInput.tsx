import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface ISelect {
  setIsLoginModal: React.Dispatch<React.SetStateAction<string>>;
}

export default function BasicSelect({ setIsLoginModal }: ISelect) {
  const [isLogin, setIsLogin] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setIsLogin(event.target.value as string);
    setIsLoginModal(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Subscribe</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={isLogin}
          label="loginForm"
          onChange={handleChange}
        >
          <MenuItem value="login">로그인</MenuItem>
          <MenuItem value="register">회원가입</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
