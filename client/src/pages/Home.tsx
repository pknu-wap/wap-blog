import { Suspense } from 'react';
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
