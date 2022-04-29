import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { useStore } from './store/zustand_';

function App() {
  const { num, increaseNum, resetNum } = useStore();
  return (
    <>
      <Routes>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/register" />
        <Route path="/write" />
      </Routes>
    </>
  );
}

export default App;
