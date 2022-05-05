import { Suspense } from 'react';
import ArticleList from '../components/article/ArticleList';
import Banner from '../components/Banner';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { properties } from '../config/properties';

const Home = () => {
  const handleGithubLogin = async () => {
    window.location.href = properties.BASE_URL + '/auth/signin/github';
  };
  const handleGoogleLogin = async () => {
    window.location.href = properties.BASE_URL + '/auth/signin/google';
  };
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
        <div>
          <button onClick={handleGithubLogin}>깃허브</button>
        </div>
        <div>
          <button onClick={handleGoogleLogin}>구글</button>
        </div>
        <ArticleList />
      </Suspense>
    </>
  );
};

export default Home;
