import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { useStore } from './zustand_';

const Container = tw.div`
h-screen
w-full
flex
flex-col
justify-center
items-center
`;

const TextColor = styled.h1`
  :hover {
    color: ${props => props.theme.accentColor};
  }
`;

const Text = tw(TextColor)`
  text-4xl
`;

const Btn = tw.button`
  border-2
  border-stone-900
  py-2
  px-4
  rounded-md
  hover:text-blue-500
  hover:border-red-400
`;

function App() {
  const { num, increaseNum, resetNum } = useStore();
  return (
    <>
      <Container>
        <Text>hi</Text>
        <Text>{num}</Text>
        <Btn onClick={increaseNum}>PLUS</Btn>
        <Btn onClick={resetNum}>RESET</Btn>
      </Container>
    </>
  );
}

export default App;
