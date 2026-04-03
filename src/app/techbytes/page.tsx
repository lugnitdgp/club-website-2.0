"use client";

import React, { useEffect, useState } from "react";

// ─── Config ──────────────────────────────────────────────────────────────────
// Set these in your .env file as NEXT_PUBLIC_ variables
const PLAYLIST_ID = process.env.NEXT_PUBLIC_YT_PLAYLIST_ID ?? "";
const API_KEY     = process.env.NEXT_PUBLIC_YT_API_KEY ?? "";
const MAX_RESULTS = 50;

// ─── Types ───────────────────────────────────────────────────────────────────
interface PlaylistItem {
  id: string;
  title: string;
  videoId: string;
}

// ─── Fetcher ─────────────────────────────────────────────────────────────────
async function fetchAllPlaylistItems(
  pageToken = "",
  accumulated: PlaylistItem[] = []
): Promise<PlaylistItem[]> {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("playlistId", PLAYLIST_ID);
  url.searchParams.set("maxResults", String(MAX_RESULTS));
  url.searchParams.set("key", API_KEY);
  if (pageToken) url.searchParams.set("pageToken", pageToken);

  const res  = await fetch(url.toString());
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  const data = await res.json();

  const items: PlaylistItem[] = data.items.map((item: any) => ({
    id:      item.id,
    title:   item.snippet.title,
    videoId: item.snippet.resourceId.videoId,
  }));

  const all = [...accumulated, ...items];
  if (data.nextPageToken) return fetchAllPlaylistItems(data.nextPageToken, all);
  return all;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function TechBytesPage() {
  const [videos,  setVideos]  = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!PLAYLIST_ID || !API_KEY) {
      setError("Missing NEXT_PUBLIC_YT_PLAYLIST_ID or NEXT_PUBLIC_YT_API_KEY.");
      setLoading(false);
      return;
    }
    fetchAllPlaylistItems()
      .then(setVideos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-white dark:bg-gray-950 transition-colors duration-300"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgb(209 213 219) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .dark .tb-dot-bg {
          background-image: radial-gradient(circle, rgb(55 65 81) 1px, transparent 1px) !important;
        }

        .tb-card {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .tb-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        @keyframes tb-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tb-rise {
          opacity: 0;
          animation: tb-rise 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        .tb-title-accent {
          background: linear-gradient(90deg, #a855f7 0%, #9333ea 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tb-stripe-1::before { background: linear-gradient(90deg,#a855f7,#9333ea) !important; }
        .tb-stripe-2::before { background: linear-gradient(90deg,#9333ea,#c084fc) !important; }
        .tb-stripe-3::before { background: linear-gradient(90deg,#c084fc,#a855f7) !important; }

        .tb-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          z-index: 2;
        }

        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }
        .live-dot { animation: pulse-dot 1.4s ease-in-out infinite; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .tb-spinner {
          width:36px; height:36px;
          border: 3px solid rgba(168,85,247,0.2);
          border-top-color: #a855f7;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style> */}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col items-center gap-12">

        {/* ── Header ── */}
        <div className="text-center flex flex-col items-center gap-3">
          <span
            className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            GNU/Linux Users' Group · NIT Durgapur
          </span>

          <h1
            className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Tech <span className="tb-title-accent">Bytes</span>
          </h1>

          <p
            className="text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Bite-sized tech knowledge. Short, sharp, and straight to the point.
          </p>

          {/* Live badge — same purple gradient family as LinitPage */}
          {/* <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest text-purple-500 dark:text-purple-400 border border-purple-300/40 dark:border-purple-700/40 bg-purple-50/60 dark:bg-purple-900/20">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
            Live Playlist · Auto-updates
          </span> */}
        </div>

        {/* ── States ── */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="tb-spinner" />
            <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Fetching latest videos…
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="w-full max-w-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-3">
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400" style={{ fontFamily: "'Syne', sans-serif" }}>
              Could not load playlist
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
            <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1 pt-1">
              <p>Set these in your <code className="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-1 rounded">.env.local</code>:</p>
              <p><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">NEXT_PUBLIC_YT_PLAYLIST_ID=PLxxxx</code></p>
              <p><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">NEXT_PUBLIC_YT_API_KEY=AIzaxxxx</code></p>
            </div>
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="py-16 text-center text-gray-500 dark:text-gray-400 text-sm">
            No videos found in this playlist.
          </div>
        )}

        {/* ── Grid ── */}
        {!loading && !error && videos.length > 0 && (
          <div
            className="grid gap-6 w-full"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              perspective: "1200px",
            }}
          >
            {videos.map((v, i) => {
              const stripeClass = `tb-stripe-${(i % 3) + 1}`;
              const delay = `${Math.min(i * 0.07, 1.5)}s`;

              return (
                <div
                  key={v.id}
                  className={`tb-card tb-rise relative rounded-2xl overflow-hidden
                    bg-white/85 dark:bg-gray-900/85 backdrop-blur-sm
                    border border-gray-100 dark:border-gray-800
                    shadow-md hover:shadow-purple-200/50 dark:hover:shadow-purple-900/50
                    hover:border-purple-300 dark:hover:border-purple-700
                    ${stripeClass}`}
                  style={{ animationDelay: delay }}
                >
                  {/* 9:16 Shorts ratio */}
                  <div
                    className="relative w-full bg-gray-100 dark:bg-gray-800 overflow-hidden"
                    style={{ paddingTop: "177.78%" }}
                  >
                    <iframe
                      className="absolute inset-0 w-full h-full border-0"
                      src={`https://www.youtube.com/embed/${v.videoId}?rel=0&modestbranding=1`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  {/* Footer — same pattern as LinitPage card */}
                  <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-800">
                    <span
                      className="text-sm font-bold text-gray-900 dark:text-white truncate flex-1"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {v.title}
                    </span>
                    <span
                      className="flex-shrink-0 text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full
                        bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-gray-800
                        text-purple-600 dark:text-purple-400
                        border border-purple-200 dark:border-purple-800"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Ep {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}