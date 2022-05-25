import { ThemeProvider } from 'styled-components';
import { darkMode, lightMode } from './styles/theme';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import WritePage from './Pages/WritePage';
import SettingPage from './Pages/SettingPage';
import NotFoundPage from './Pages/NotFoundPage';
import SearchPage from './Pages/SearchPage';
import Core from './Components/Core';
import { useStore } from './store/store';
import Navigation from './Components/Navigation';
import BlogPage from './Pages/BlogPage';
import ArticleDetailPage from './Pages/ArticleDetailPage';

function App() {
  const { isDark } = useStore();

  return (
    <ThemeProvider theme={isDark ? darkMode : lightMode}>
      <Navigation />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/@:username" element={<BlogPage />} />
        <Route path="/@:username/:articleId" element={<ArticleDetailPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Core />
    </ThemeProvider>
  );
}

export default App;
