import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Music from './pages/Music';
import Cinema from './pages/Cinema';
import Films from './pages/Films';
import About from './pages/About';
import Games from './pages/Games';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark-mode');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ar');

  useEffect(() => {
    document.body.className = `${theme} ${lang}-lang`;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar' ? 'عرض تاني' : 'Second Show';
    localStorage.setItem('theme', theme);
    localStorage.setItem('lang', lang);
  }, [theme, lang]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark-mode' ? 'light-mode' : 'dark-mode');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />
      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/music" element={<Music lang={lang} />} />
        <Route path="/cinema" element={<Cinema lang={lang} />} />
        <Route path="/films" element={<Films lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/games" element={<Games lang={lang} />} />
      </Routes>
      <Footer theme={theme} lang={lang} />
    </Router>
  );
}

export default App;
