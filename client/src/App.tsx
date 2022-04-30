import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import ArticleDetail from './pages/ArticleDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:articleId" element={<ArticleDetail />} />
      </Routes>
    </>
  );
}

export default App;
