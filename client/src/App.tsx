import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { useStore } from './store/store';

function App() {
  const { num, increaseNum, resetNum } = useStore();
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
