import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const BannerColor = styled.div`
  background-color: ${(props) => props.theme.bannerColor};
`;

const BannerComponent = tw(BannerColor)`
flex
justify-center
items-center
w-full
py-2
bg-yellow-300
text-white
text-4xl
shadow-inner
mb-8
mt-10
`;

const BannerImg = tw.img`
box-border
h-[250px]
pt-10
`;

const Banner = () => {
  return (
    <>
      <BannerComponent>
        <BannerImg alt="WAPBannerImg" src="img/WAPImg.png" />
      </BannerComponent>
    </>
  );
};

export default Banner;
