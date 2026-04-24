import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

const PILLARS = [
  {
    n: "01",
    title: "Communication",
    body: "Healthy couples talk openly and honestly — even about difficult things. They listen to understand, not just to respond.",
  },
  {
    n: "02",
    title: "Trust & honesty",
    body: "Trust takes time to build and seconds to break. Honesty keeps a relationship safe and secure for both partners.",
  },
  {
    n: "03",
    title: "Mutual respect",
    body: "Respect means valuing each other's feelings, boundaries, and individuality — so both people can truly thrive.",
  },
  {
    n: "04",
    title: "Emotional support",
    body: "Being there for each other without judgment is one of the deepest forms of intimacy.",
  },
  {
    n: "05",
    title: "Individual space",
    body: "Healthy relationships make room for both togetherness and individuality. Each person should feel free to grow.",
  },
];

const AREAS = [
  { name: "Communication", q: "How openly and honestly do you communicate with your partner?" },
  { name: "Trust", q: "How much do you trust your partner and feel trusted in return?" },
  { name: "Respect", q: "Do you feel genuinely respected and valued in your relationship?" },
  { name: "Emotional Support", q: "How supported do you feel emotionally by your partner?" },
  { name: "Individual Space", q: "Do you both have enough space to be yourselves within the relationship?" },
];

type Screen = 1 | 2 | 3 | 31 | 4;

const ProgressDots = ({ active }: { active: 1 | 2 | 3 | 4 }) => (
  <div className="flex items-center gap-1.5">
    {[1, 2, 3, 4].map((i) => (
      <span
        key={i}
        className={
          i === active
            ? "h-1.5 w-6 rounded-full bg-gold"
            : "h-1.5 w-1.5 rounded-full bg-gold/30"
        }
      />
    ))}
  </div>
);

const TopProgress = ({ pct }: { pct: number }) => (
  <div className="h-1 w-full bg-brown-deep/10">
    <div className="h-full bg-gold transition-all duration-500" style={{ width: `${pct}%` }} />
  </div>
);

const ArticleHeader = ({ category, title }: { category: string; title: string }) => (
  <header className="bg-magazine border-b border-brown-deep/70 px-6 pt-6 pb-5">
    <p className="text-[11px] uppercase tracking-[0.18em] text-gold font-medium">{category}</p>
    <h1 className="mt-2 font-serif text-[26px] leading-[1.15] text-brown-deep">{title}</h1>
  </header>
);

const Index = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>(1);
  const [areaIdx, setAreaIdx] = useState(0);
  const [ratings, setRatings] = useState<number[]>([0, 0, 0, 0, 0]);

  const setRating = (val: number) => {
    const next = [...ratings];
    next[areaIdx] = val;
    setRatings(next);
  };

  const totalScore = ratings.reduce((a, b) => a + b, 0);

  const scoreContent =
    totalScore >= 22
      ? {
          label: "Your relationship is thriving!",
          desc: "You have built a strong and healthy foundation. Keep nurturing it with the same care and intention!",
        }
      : totalScore >= 15
      ? {
          label: "Your relationship is good but has room to grow!",
          desc: "You have a solid base. Focus on the areas where you rated lower and have open conversations with your partner about them.",
        }
      : {
          label: "Your relationship needs attention!",
          desc: "Every relationship goes through difficult phases. Consider speaking with a relationship counsellor — seeking help is a sign of strength, not weakness.",
        };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "#faf6f0" }}
    >
      <div className="w-full max-w-[390px] bg-magazine rounded-[28px] overflow-hidden shadow-[0_25px_60px_-20px_rgba(122,92,58,0.35)] relative min-h-[780px] flex flex-col">
        {/* SCREEN 1 — Magazine Cover */}
        {screen === 1 && (
          <div className="relative flex-1 bg-cover-gradient text-white flex flex-col px-6 pt-6 pb-8 overflow-hidden">
            {/* decorative circles */}
            <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full" style={{ background: "rgba(255, 230, 190, 0.08)" }} />
            <div className="absolute bottom-24 -left-20 h-56 w-56 rounded-full" style={{ background: "rgba(255, 230, 190, 0.06)" }} />

            <button
              onClick={() => navigate(-1)}
              className="relative z-10 h-10 w-10 -ml-2 flex items-center justify-center text-gold-light hover:opacity-80 transition"
              aria-label="Back"
            >
              <ArrowLeft className="h-6 w-6" strokeWidth={1.5} />
            </button>

            <span className="relative z-10 mt-2 inline-block self-start text-[11px] uppercase tracking-[0.22em] text-gold-light border border-gold-light/40 px-3 py-1 rounded-full">
              Guide
            </span>

            <div className="relative z-10 mt-12 flex-1">
              <h1 className="font-serif text-[42px] leading-[1.05] tracking-tight">
                Relationship<br />Health —{" "}
                <em className="text-gold-light font-serif italic font-normal">
                  Are you truly connected?
                </em>
              </h1>

              <p className="mt-6 text-[15px] leading-relaxed text-white/80 max-w-[300px]">
                A thoughtful guide to understanding and nurturing the health of your relationship.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-8">
              <button
                onClick={() => setScreen(2)}
                className="bg-gold-light text-brown-deep font-medium text-sm px-6 py-3 rounded-full hover:bg-gold transition"
              >
                Begin Reading →
              </button>
              <ProgressDots active={1} />
            </div>
          </div>
        )}

        {/* SCREEN 2 — Article */}
        {screen === 2 && (
          <div className="flex-1 flex flex-col">
            <TopProgress pct={33} />
            <ArticleHeader category="Relationship Health · Key Pillars" title="What makes a relationship truly healthy?" />

            <div className="flex-1 px-6 py-6 space-y-6">
              <p className="border-l-2 border-gold pl-4 italic font-serif text-[16px] leading-relaxed text-brown-deep">
                "A healthy relationship is not the absence of conflict — it is the presence of respect, trust and genuine care."
              </p>

              <div className="space-y-5">
                {PILLARS.map((p) => (
                  <article key={p.n}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif italic text-gold text-[18px]">{p.n}</span>
                      <h3 className="font-serif text-[18px] text-brown-deep">— {p.title}</h3>
                    </div>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-foreground/80">
                      {p.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <nav className="flex items-center justify-between px-6 py-4 border-t border-brown-deep/15">
              <button onClick={() => setScreen(1)} className="text-gold text-sm font-medium hover:opacity-70">
                ← Back
              </button>
              <ProgressDots active={2} />
              <button onClick={() => { setScreen(3); setAreaIdx(0); }} className="text-gold text-sm font-medium hover:opacity-70">
                Next →
              </button>
            </nav>
          </div>
        )}

        {/* SCREEN 3 — Rating */}
        {screen === 3 && (
          <div className="flex-1 flex flex-col">
            <TopProgress pct={60} />
            <ArticleHeader category="Relationship Health · Check In" title="How is your relationship doing?" />

            <div className="flex-1 px-6 py-6 flex flex-col">
              {/* Step pip bar */}
              <div className="flex gap-1.5 mb-3">
                {AREAS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      ratings[i] > 0 ? "bg-gold" : "bg-brown-deep/15"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
                Area {areaIdx + 1} of 5 · {AREAS[areaIdx].name}
              </p>

              {/* Rating card */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-white/60 border border-brown-deep/10 rounded-2xl p-6">
                  <h2 className="font-serif text-[26px] text-brown-deep leading-tight">
                    {AREAS[areaIdx].name}
                  </h2>
                  <p className="mt-2 font-serif italic text-[15px] text-foreground/75 leading-relaxed">
                    {AREAS[areaIdx].q}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        onClick={() => setRating(s)}
                        className="p-1 hover:scale-110 transition"
                        aria-label={`${s} stars`}
                      >
                        <Star
                          className="h-8 w-8"
                          strokeWidth={1.25}
                          style={{
                            color: "hsl(var(--gold))",
                            fill: ratings[areaIdx] >= s ? "hsl(var(--gold))" : "transparent",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
                    <span>Needs work</span>
                    <span>Very strong</span>
                  </div>
                </div>
              </div>

              <button
                disabled={ratings[areaIdx] === 0}
                onClick={() => {
                  if (areaIdx < AREAS.length - 1) setAreaIdx(areaIdx + 1);
                  else setScreen(31);
                }}
                className="mt-6 w-full bg-brown-deep text-gold-light font-medium text-sm py-3.5 rounded-full hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {areaIdx < AREAS.length - 1 ? "Next Area →" : "See Your Score →"}
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3.5 — Score Result */}
        {screen === 31 && (
          <div className="flex-1 flex flex-col">
            <TopProgress pct={80} />
            <ArticleHeader category="Relationship Health · Your Result" title="Here is where you stand." />

            <div className="flex-1 px-6 py-8 flex flex-col">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.22em] text-gold">Your Score</p>
                <p className="mt-3 font-serif text-[64px] leading-none text-brown-deep">
                  {totalScore}
                  <span className="text-[28px] text-muted-foreground"> / 25</span>
                </p>
              </div>

              <div className="mt-6 h-2 w-full bg-brown-deep/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-700"
                  style={{ width: `${(totalScore / 25) * 100}%` }}
                />
              </div>

              <div className="mt-8 border-t border-b border-gold/60 py-6 text-center">
                <h3 className="font-serif italic text-[22px] text-brown-deep leading-snug">
                  {scoreContent.label}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-foreground/75">
                  {scoreContent.desc}
                </p>
              </div>

              <div className="flex-1" />

              <button
                onClick={() => setScreen(4)}
                className="w-full bg-brown-deep text-gold-light font-medium text-sm py-3.5 rounded-full hover:opacity-90 transition"
              >
                See Closing →
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4 — Closing */}
        {screen === 4 && (
          <div className="flex-1 flex flex-col">
            <TopProgress pct={100} />

            <header className="bg-brown-deep text-white px-6 pt-7 pb-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full" style={{ background: "rgba(255,230,190,0.07)" }} />
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold-light relative z-10">
                4 of 4 · Closing
              </p>
              <h1 className="mt-3 font-serif text-[30px] leading-[1.1] relative z-10">
                Every relationship is a work in progress.
              </h1>
            </header>

            <div className="flex-1 px-6 py-8 flex flex-col">
              <div className="flex justify-center mb-8">
                <ProgressDots active={4} />
              </div>

              <blockquote className="border-t border-b border-gold py-6 text-center">
                <p className="font-serif italic text-[19px] leading-relaxed text-brown-deep">
                  "The strongest relationships are not the ones that never struggle — they are the ones that keep choosing each other, again and again."
                </p>
              </blockquote>

              <div className="mt-8 space-y-4 text-[14px] leading-relaxed text-foreground/80">
                <p>
                  Take what you've learned today as a gentle invitation — not a verdict. Share one insight with your partner this week, and listen with curiosity rather than defense.
                </p>
                <p>
                  Small, consistent acts of care are what turn a good relationship into a lasting one.
                </p>
              </div>

              <div className="flex-1" />

              <button
                onClick={() => setScreen(1)}
                className="mt-8 w-full bg-gold text-brown-deep font-medium text-sm py-3.5 rounded-full hover:bg-gold-light transition"
              >
                Finish Guide
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
