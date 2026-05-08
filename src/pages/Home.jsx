import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../utils/translations';

const Home = ({ lang }) => {
  const [filter, setFilter] = useState('all');
  const t = translations[lang].home;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    const revealElements = document.querySelectorAll('.section-header, .artist-card, .timeline-node, .about-text, .story-section, .gallery-item, .section');
    revealElements.forEach(el => {
      el.classList.add('reveal-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const galleryItems = [
    { type: 'cinema', img: '/images/posters/elle3bma3aelkubar.jpg' },
    { type: 'cinema', img: '/images/posters/raafatelhagan.jpg' },
    { type: 'cinema', img: '/images/posters/cairo30.jpg' },
    { type: 'music', img: '/images/Egyptian Art Icons/ummkulthom.png' },
    { type: 'cinema', img: '/images/Egyptian Art Icons/mahmoudabdelaziz.png' },
    { type: 'cinema', img: '/images/Egyptian Art Icons/ahmadzaky2.png' },
  ];

  const artistImages = [
    "/images/Egyptian Art Icons/abdelhalem.png",
    "/images/Egyptian Art Icons/fatenhamama.png",
    "/images/Egyptian Art Icons/soaadhosny.png"
  ];

  return (
    <>
      <header id="home" className="hero">
        <div className="hero-bg">
          <img src="/images/Egyptian Art Icons/ummkulthom.png" alt="أم كلثوم" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="title">{t.heroTitle}</h1>
          <p className="subtitle">{t.heroSubtitle}</p>
          <button onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })} className="btn-primary" style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>{t.heroBtn} <i className={`fas ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i></button>
        </div>
      </header>

      <section id="timeline" className="section timeline-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.timelineTitle}</h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>

            <div className="timeline-nodes">
              <div className="timeline-node">
                <div className="node-point"></div>
                <div className="node-year">1940</div>
                <div className="node-content">
                  <p>{lang === 'ar' ? 'تأسيس الموسيقى الحديثة' : 'Establishment of Modern Music'}</p>
                </div>
              </div>

              <div className="timeline-node">
                <div className="node-point"></div>
                <div className="node-year">1950</div>
                <div className="node-content">
                  <p>{lang === 'ar' ? 'العصر الذهبي للسينما الرومانسية' : 'Golden Age of Romantic Cinema'}</p>
                </div>
              </div>

              <div className="timeline-node">
                <div className="node-point"></div>
                <div className="node-year">1960</div>
                <div className="node-content">
                  <p>{lang === 'ar' ? 'من مصر إلى العالمية' : 'From Egypt to Global Fame'}</p>
                </div>
              </div>

              <div className="timeline-node">
                <div className="node-point"></div>
                <div className="node-year">1970</div>
                <div className="node-content">
                  <p>{lang === 'ar' ? 'ثورة الكوميديا والمسرح' : 'Comedy and Theater Revolution'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="artists" className="section artists-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.artistsTitle}</h2>
          </div>

          <div className="artists-grid">
            {t.artists.map((artist, index) => (
              <div key={index} className="artist-card" style={{ transitionDelay: `${index * 0.15}s` }}>
                <div className="card-image">
                  <img src={artistImages[index]} alt={artist.name} />
                </div>
                <div className="card-content">
                  <h3>{artist.name}</h3>
                  <p>{artist.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section gallery-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.galleryTitle}</h2>
          </div>

          <div className="gallery-filters">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t.galleryAll}</button>
            <button className={`filter-btn ${filter === 'cinema' ? 'active' : ''}`} onClick={() => setFilter('cinema')}>{t.galleryCinema}</button>
            <button className={`filter-btn ${filter === 'music' ? 'active' : ''}`} onClick={() => setFilter('music')}>{t.galleryMusic}</button>
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className={`gallery-item ${item.type} ${filter !== 'all' && filter !== item.type ? 'hide' : ''}`}
                style={{
                  display: filter !== 'all' && filter !== item.type ? 'none' : 'block',
                  opacity: filter !== 'all' && filter !== item.type ? 0 : 1,
                  transform: filter !== 'all' && filter !== item.type ? 'scale(0.8)' : 'scale(1)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease'
                }}
              >
                <img src={item.img} alt={t.gallery[index].title} />
                <div className="item-overlay"><span>{t.gallery[index].title}</span></div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/cinema" className="btn-primary">{t.seeMoreCinema} <i className="fas fa-film"></i></Link>
            <Link to="/music" className="btn-primary">{t.seeMoreMusic} <i className="fas fa-music"></i></Link>
            <Link to="/films" className="btn-primary">{t.seeMoreFilms} <i className="fas fa-video"></i></Link>
          </div>
        </div>
      </section>

      <section className="section story-section" style={{ backgroundColor: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{ color: 'var(--accent)' }}>{t.aboutTitle}</h2>
          </div>
          <div className="about-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p className="about-text" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              {t.aboutText}
            </p>
            <div style={{ marginTop: '40px' }}>
              <Link to="/about" className="btn-primary">{t.aboutBtn} <i className={`fas ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i></Link>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', opacity: '0.1', width: '300px' }}>
        </div>
      </section>

      <section id="about" className="section quote-section">
        <div className="container">
          <div className="about-content">
            <p className="about-text">{t.quote}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
