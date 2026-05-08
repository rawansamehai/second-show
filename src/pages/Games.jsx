import { useEffect, useState } from 'react';
import { translations } from '../utils/translations';

const Games = ({ lang }) => {
  const t = translations[lang].games;
  const [purchasing, setPurchasing] = useState({});

  const handleBuy = (id) => {
    setPurchasing(prev => ({ ...prev, [id]: true }));
    // Reset after some time if needed, but for now just show it
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.game-card, .section-header');
    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const games = [
    {
      id: 1,
      title: lang === 'ar' ? 'بلاتوه' : 'Plateau',
      description: lang === 'ar' ? 'لعبة ممتعة تجمع العائلة والأصدقاء في أجواء سينمائية مصرية أصيلة.' : 'A fun game that brings family and friends together in an authentic Egyptian cinematic atmosphere.',
      price: lang === 'ar' ? '250 ج.م' : '250 EGP',
      image: '/images/games/plateau/plateau.png',
      features: lang === 'ar' ? ['+12 سنة', '2-6 لاعبين', '45 دقيقة'] : ['+12 years', '2-6 players', '45 mins']
    },
    {
      id: 2,
      title: lang === 'ar' ? 'حزر فزر' : 'Hazar Fazar',
      description: lang === 'ar' ? 'اختبر معلوماتك الفنية في لعبة الأسئلة والألغاز عن الفن المصري.' : 'Test your artistic knowledge in a game of questions and puzzles about Egyptian art.',
      price: lang === 'ar' ? '180 ج.م' : '180 EGP',
      image: '/images/games/hazarfazar/hazarfazar.png',
      features: lang === 'ar' ? ['+8 سنوات', '2+ لاعبين', '30 دقيقة'] : ['+8 years', '2+ players', '30 mins']
    }
  ];

  return (
    <div className="page-container" style={{ paddingTop: '100px', minHeight: 'calc(100vh - 80px)' }}>
      <section className="section games-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.title}</h2>
            <p className="section-subtitle">{t.subtitle}</p>
          </div>

          <div className="games-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px', 
            marginTop: '50px' 
          }}>
            {games.map((game) => (
              <div key={game.id} className="game-card">
                <div className="game-image" style={{ 
                  height: '350px', 
                  backgroundColor: 'rgba(251, 177, 79, 0.05)', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}>
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                      transition: 'transform 0.4s ease'
                    }}
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/2a1a12/f5e9dc?text=' + game.title }}
                  />
                </div>
                <div className="game-info" style={{ padding: '25px' }}>
                  <h3 style={{ color: 'var(--accent)', fontSize: '1.8rem', marginBottom: '10px' }}>{game.title}</h3>
                  <p style={{ color: 'var(--text)', marginBottom: '20px', lineHeight: '1.6' }}>{game.description}</p>
                  
                  <div className="game-features" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {game.features.map((feature, i) => (
                      <span key={i} style={{ 
                        fontSize: '0.8rem', 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        border: '1px solid var(--accent)', 
                        color: 'var(--accent)' 
                      }}>
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text)' }}>{game.price}</span>
                    <button 
                      className="btn-primary" 
                      style={{ padding: '10px 20px', fontSize: '0.9rem', minWidth: '140px' }}
                      onClick={() => handleBuy(game.id)}
                      disabled={purchasing[game.id]}
                    >
                      {purchasing[game.id] ? t.processing : t.buyNow}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;
