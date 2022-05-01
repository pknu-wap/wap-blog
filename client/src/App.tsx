import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import ArticleDetail from './pages/ArticleDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:articleId" element={<ArticleDetail />} />

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
