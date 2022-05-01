import { Suspense } from 'react';
import Articles from '../components/Articles';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Articles />
      </Suspense>
    </>
  );
};

export default Home;
