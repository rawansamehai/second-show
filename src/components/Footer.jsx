import { Link } from 'react-router-dom';
import { translations } from '../utils/translations';

const Footer = ({ theme, lang }) => {
  const logoSrc = theme === 'dark-mode' ? '/images/logo/whitelogo.png' : '/images/logo/brownlogo.png';
  const t = translations[lang].home;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logoSrc} alt="حكاية الفن" style={{ height: '70px' }} />
          </div>

          <p className="footer-quote">{t.heroTitle}</p>

          <div className="social-icons">
            <a href="https://www.facebook.com/share/18Z2NXmGMv/" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/3rdtany?igsh=N2NrbWljeW55YWl0" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@3rd_tany?_r=1&_t=ZS-961z5AbyKJu" target="_blank" rel="noreferrer"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p> {new Date().getFullYear()}&copy; {lang === 'ar' ? 'حكاية الفن. جميع الحقوق محفوظة.' : 'Art Tale. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
