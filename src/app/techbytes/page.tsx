import React from "react";

const videos = [
  {
    id: "hm6xTavrJcU",
    title: "Tech Bytes #1",
    label: "Episode 01",
  },
  {
    id: "Iwo-b3CAyc4",
    title: "Tech Bytes #2",
    label: "Episode 02",
  },
  {
    id: "Z57RwGv-ftQ",
    title: "Tech Bytes #3",
    label: "Episode 03",
  },
  {
    id: "Xo6-ONitKvQ",
    title: "Tech Bytes #4",
    label: "Episode 04",
  },
];

function TechBytesPage() {
  return (
    <div className="min-h-screen w-full bg-white" style={{
      backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .tb-page {
          padding: 64px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 56px;
        }

        /* ── Header ── */
        .tb-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .tb-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9ca3af;
        }

        .tb-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111111;
          line-height: 1.1;
        }

        .tb-title-accent {
          background: linear-gradient(90deg, #e879a0 0%, #a855f7 50%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tb-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #6b7280;
          max-width: 440px;
          line-height: 1.6;
        }

        /* ── Grid ── */
        .tb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 28px;
          width: 100%;
          max-width: 1120px;
        }

        /* ── Card ── */
        .tb-card {
          position: relative;
          border-radius: 24px;
          background: #ffffff;
          border: 1.5px solid #f3f4f6;
          box-shadow:
            0 2px 0 #f3f4f6,
            0 8px 24px rgba(0,0,0,0.07),
            0 1px 4px rgba(0,0,0,0.04);
          overflow: hidden;
          transform: translateY(0) rotateX(0deg) rotateY(0deg);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s ease;
          transform-style: preserve-3d;
          will-change: transform;
          cursor: pointer;
        }

        .tb-card:hover {
          transform: translateY(-8px) rotateX(2deg) scale(1.02);
          box-shadow:
            0 2px 0 #e9d5ff,
            0 20px 48px rgba(124, 58, 237, 0.14),
            0 4px 12px rgba(0,0,0,0.06);
          border-color: #e9d5ff;
        }

        /* Coloured top accent stripe */
        .tb-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          z-index: 2;
        }
        .tb-card:nth-child(1)::before { background: linear-gradient(90deg, #e879a0, #a855f7); }
        .tb-card:nth-child(2)::before { background: linear-gradient(90deg, #a855f7, #f97316); }
        .tb-card:nth-child(3)::before { background: linear-gradient(90deg, #f97316, #e879a0); }
        .tb-card:nth-child(4)::before { background: linear-gradient(90deg, #e879a0, #a855f7, #f97316); }

        /* Shorts aspect ratio: 9/16 */
        .tb-video-wrap {
          position: relative;
          width: 100%;
          padding-top: 177.78%; /* 16:9 inverted */
          background: #f9fafb;
          overflow: hidden;
        }

        .tb-video-wrap iframe {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border: none;
        }

        /* Card footer */
        .tb-card-footer {
          padding: 14px 18px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f3f4f6;
        }

        .tb-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #111111;
          letter-spacing: -0.01em;
        }

        .tb-card-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
          background: linear-gradient(90deg, #fdf4ff, #eff6ff);
          color: #7c3aed;
          border: 1px solid #e9d5ff;
        }

        /* Staggered entrance animation */
        @keyframes tb-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tb-card {
          opacity: 0;
          animation: tb-rise 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .tb-card:nth-child(1) { animation-delay: 0.05s; }
        .tb-card:nth-child(2) { animation-delay: 0.12s; }
        .tb-card:nth-child(3) { animation-delay: 0.19s; }
        .tb-card:nth-child(4) { animation-delay: 0.26s; }

        @media (max-width: 640px) {
          .tb-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
          .tb-page { padding: 40px 16px 60px; gap: 36px; }
        }
        @media (max-width: 400px) {
          .tb-grid { grid-template-columns: 1fr; max-width: 300px; }
        }
      `}</style>

      <div className="tb-page">
        {/* Header */}
        <div className="tb-header">
          <span className="tb-eyebrow">GNU/Linux Users' Group · NIT Durgapur</span>
          <h1 className="tb-title">
            Tech <span className="tb-title-accent">Bytes</span>
          </h1>
          <p className="tb-subtitle">
            Bite-sized tech knowledge. Short, sharp, and straight to the point.
          </p>
        </div>

        {/* Cards grid */}
        <div className="tb-grid" style={{ perspective: "1200px" }}>
          {videos.map((v) => (
            <div className="tb-card" key={v.id}>
              <div className="tb-video-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="tb-card-footer">
                <span className="tb-card-title">{v.title}</span>
                <span className="tb-card-label">{v.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechBytesPage;