import S from './styled';
import WAPImage from '/img/WAPImg.png';

const Banner = () => {
  return (
    <>
      <S.BannerComponent>
        <S.BannerImg alt="WAPBannerImg" src={WAPImage} />
      </S.BannerComponent>
    </>
  );
};

export default Banner;
