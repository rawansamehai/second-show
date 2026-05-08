import { translations } from '../utils/translations';

const About = ({ lang }) => {
  const t = translations[lang].about;

  return (
    <div className="page-container" style={{ paddingTop: '100px', minHeight: 'calc(100vh - 80px)' }}>
      <section className="section about-section" style={{ backgroundColor: 'transparent' }}>
        <div className="container">

          <div className="vision-goals" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '60px'
          }}>
            <div className="vision-card" style={{
              padding: '40px',
              backgroundColor: 'rgba(245, 233, 220, 0.05)',
              borderRadius: '16px',
              border: '1px solid var(--accent)',
              textAlign: 'center'
            }}>
              <i className="fas fa-eye" style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '20px' }}></i>
              <h3 style={{ color: 'var(--accent)', marginBottom: '20px' }}>{t.visionTitle}</h3>
              <p style={{ lineHeight: '1.8' }}>{t.visionText}</p>
            </div>

            <div className="goals-card" style={{
              padding: '40px',
              backgroundColor: 'rgba(245, 233, 220, 0.05)',
              borderRadius: '16px',
              border: '1px solid var(--accent)',
              textAlign: 'center'
            }}>
              <i className="fas fa-bullseye" style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '20px' }}></i>
              <h3 style={{ color: 'var(--accent)', marginBottom: '20px' }}>{t.goalsTitle}</h3>
              <p style={{ lineHeight: '1.8' }}>{t.goalsText}</p>
            </div>
          </div>

          <div className="section-header" style={{ marginTop: '100px' }}>
            <h2 className="section-title">{t.teamTitle}</h2>
            <p className="section-subtitle">{t.teamSubtitle}</p>
          </div>

          {[0, 1, 2, 3, 4, 5, 6].map(row => (
            <div key={row} className="leadership-grid" style={{ marginBottom: '30px' }}>
              {[0, 1, 2].map(col => {
                const index = row * 3 + col;
                const member = t.members[index];
                if (!member) return null;

                // Path mapping for images (Eslam first now)
                const imagePaths = [
                  "/images/Team/Menna Emam - Video Editor_.jpg",
                  "/images/Team/Eslam Ghonem _ Graphic Designer.jpg",
                  "/images/Team/Gharam-Marketer.png",
                  "/images/Team/Makarious Nageh-photographer and photo editor.jpg",
                  "/images/Team/Hannah Ali - Copywriter.jpg",
                  "/images/Team/Karen Wageh - PR Specialist.jpg",
                  "/images/Team/Malak mahmoud - graphic designer_.jpg",
                  "/images/Team/Mohamed Khaled _ graphic designer_.jpg",
                  "/images/Team/Sara Abdelaziem- content creator.JPG",
                  "/images/Team/Salma Mostafa- Content Creator &VO.jpg",
                  "/images/Team/Mohamed Nabil - Marketer.png",
                  "/images/Team/Tuqa Ahmed Graphic Designer_.jpg",
                  "/images/Team/Yasmeen Ibrahim - VO & Video Editor.png",
                  "/images/Team/Shymaa mohamed - content creator & vo.png",
                  "/images/Team/Menna Hamdy-Video Editor.jpg",
                  "/images/Team/Sylvia Wael Content creator.png",
                  "/images/Team/Nourhan Mohamed Fergany - content creator.png",
                  "/images/Team/Fayrouz tamer _ script writer.jpg",
                  "/images/Team/Hams ahmed - content creator.png",
                  "/images/Team/Omar mohammed _ Graphic designer.jpg",
                  "/images/Team/Nada Khaled _ Content Creator.jpg"
                ];

                return (
                  <div key={index} className="leader-card">
                    <div className="leader-image">
                      <img src={imagePaths[index]} alt={member.name} />
                    </div>
                    <div className="leader-info">
                      <h3>{member.name}</h3>
                      <p className="leader-role">{member.role}</p>
                      {member.leader && <p className="leader-leadership">{member.leader}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          <div className="section-header" style={{ marginTop: '80px' }}>
            <h2 className="section-title">{t.teamPhotosTitle}</h2>
          </div>

          <div className="team-photos" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px',
            marginTop: '40px'
          }}>
            <div className="team-photo-item" style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid var(--accent)' }}>
              <img src="/images/photos/photo1.jpeg" alt="Team Photo 1" style={{ width: '100%', display: 'block' }} />
            </div>
            <div className="team-photo-item" style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid var(--accent)' }}>
              <img src="/images/photos/photo2.jpeg" alt="Team Photo 2" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
