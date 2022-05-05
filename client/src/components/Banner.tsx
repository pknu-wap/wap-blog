import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const BannerColor = styled.span`
  background-color: ${props => props.theme.bannerColor};
`;

const BannerComponent = tw(BannerColor)`
flex
justify-center
items-center
w-full
py-16
bg-yellow-300
text-white
text-4xl
shadow-inner
mb-8
mt-10
`;

const Banner = () => {
  return (
    <>
      <BannerComponent>BANNER</BannerComponent>
    </>
  );
};

export default Banner;
