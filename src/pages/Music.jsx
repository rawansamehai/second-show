import { translations } from '../utils/translations';

const Music = ({ lang }) => {
  const t = translations[lang].music;
  
  const artistImages = [
    "/images/Egyptian Art Icons/ummkulthom.png",
    "/images/Egyptian Art Icons/abdelhalem.png",
    "/images/Egyptian Art Icons/mohammedabdelwahab.png"
  ];

  return (
    <div className="page-container" style={{ paddingTop: '100px', minHeight: 'calc(100vh - 80px)' }}>
      <section className="section artists-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.title}</h2>
            <p className="section-subtitle">{t.subtitle}</p>
          </div>

          <div className="artists-grid">
            {t.artists.map((artist, index) => (
              <div key={index} className="artist-card">
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
    </div>
  );
};

export default Music;
