import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Core from './components/Core';

import ArticleDetailPage from './pages/ArticlePage';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import WritePage from './pages/WritePage';
import SettingPage from './pages/SettingPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        {/* 지울 예정 */}
        <Route path="/:articleId" element={<ArticleDetailPage />} />

        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/@:username" element={<BlogPage />} />
        <Route path="/@:username/:articleId" element={<ArticlePage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Core />
    </>
  );
}

export default App;
