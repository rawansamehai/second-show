import { translations } from '../utils/translations';

const Films = ({ lang }) => {
  const t = translations[lang].films;
  const films = [
    { img: '/images/posters/elle3bma3aelkubar.jpg', title: lang === 'ar' ? 'اللعب مع الكبار' : 'Playing with the Giants' },
    { img: '/images/posters/raafatelhagan.jpg', title: lang === 'ar' ? 'رأفت الهجان' : 'Raafat El-Hagan' },
    { img: '/images/posters/cairo30.jpg', title: lang === 'ar' ? 'القاهرة 30' : 'Cairo 30' },
  ];

  return (
    <div className="page-container" style={{ paddingTop: '100px', minHeight: 'calc(100vh - 80px)' }}>
      <section className="section gallery-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.title}</h2>
            <p className="section-subtitle">{t.subtitle}</p>
          </div>

          <div className="gallery-grid">
            {films.map((item, index) => (
              <div key={index} className="gallery-item">
                <img src={item.img} alt={item.title} />
                <div className="item-overlay"><span>{item.title}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Films;
