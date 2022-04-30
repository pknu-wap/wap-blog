import { Suspense } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import ArticleAPI from '../api/article';
import Articles from '../components/Articles';
import Loading from '../components/Loading';

const Home = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Articles />
      </Suspense>
    </>
  );
};

export default Home;
