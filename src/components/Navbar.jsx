import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { translations } from '../utils/translations';

const Navbar = ({ theme, toggleTheme, lang, toggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logoSrc = theme === 'dark-mode' ? '/images/logo/whitelogo.png' : '/images/logo/brownlogo.png';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <img src={logoSrc} alt="حكاية الفن" className="logo-img" style={{ height: '70px' }} />
        </Link>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>{t.home}</Link></li>
          <li><Link to="/music" onClick={() => setIsMenuOpen(false)}>{t.music}</Link></li>
          <li><Link to="/cinema" onClick={() => setIsMenuOpen(false)}>{t.cinema}</Link></li>
          <li><Link to="/films" onClick={() => setIsMenuOpen(false)}>{t.films}</Link></li>          
          <li><Link to="/games" onClick={() => setIsMenuOpen(false)}>{t.games}</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>{t.about}</Link></li>
        </ul>

        <div className="nav-actions">
          <button onClick={toggleLang} className="lang-toggle" aria-label="تبديل اللغة">
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          
          <button onClick={toggleTheme} className="theme-toggle" aria-label="تبديل المظهر">
            {theme === 'dark-mode' ? (
              <i className="fas fa-sun" style={{ color: '#fbb14f' }}></i>
            ) : (
              <i className="fas fa-moon" style={{ color: '#5a291e' }}></i>
            )}
          </button>
          
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="القائمة">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
