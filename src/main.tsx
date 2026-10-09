import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Music2,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  WandSparkles,
} from "lucide-react";
import { birthdayData as data } from "./data/birthdayData";
import "./styles.css";

type ParticleKind = "heart" | "spark" | "dot" | "petal";
const scenes = [
  "Gift",
  "Balloons",
  "Wish",
  "Voice",
  "Memories",
  "Letter",
  "Collage",
  "Final",
];
const balloonMessages = [
  "You make every day brighter ✨",
  "You make life more beautiful",
  "You bring so much joy ❤️",
  "You make my life feel special 💕",
];

function AmbientParticles({ burst = false }: { burst?: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 4 + Math.random() * 12,
        duration: 9 + Math.random() * 17,
        delay: -Math.random() * 20,
        kind: (["heart", "spark", "dot", "petal"] as ParticleKind[])[i % 4],
        drift: (Math.random() - 0.5) * 160,
      })),
    [],
  );
  return (
    <div className="ambient" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`ambient-particle ${p.kind}`}
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          animate={{
            y: ["110vh", "-15vh"],
            x: [0, p.drift],
            rotate: [0, 360],
            opacity: [0, 0.75, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.kind === "heart"
            ? "♥"
            : p.kind === "spark"
              ? "✦"
              : p.kind === "petal"
                ? "❧"
                : ""}
        </motion.span>
      ))}
      {burst && (
        <motion.div
          className="celebration-burst"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1.1 }}
        />
      )}
    </div>
  );
}

function SceneChrome({
  index,
  setScene,
  music,
  toggleMusic,
}: {
  index: number;
  setScene: (n: number) => void;
  music: boolean;
  toggleMusic: () => void;
}) {
  return (
    <>
      <div className="topbar">
        <div className="brand-mark">
          <Sparkles size={14} /> a little birthday story
        </div>
        <button
          className="music-btn"
          onClick={toggleMusic}
          aria-label="Toggle background music"
        >
          {music ? <Volume2 size={17} /> : <VolumeX size={17} />}
          <Music2 size={12} />
        </button>
      </div>
      <div className="progress-rail" aria-label="Story progress">
        {scenes.map((s, i) => (
          <React.Fragment key={s}>
            <button
              onClick={() => setScene(i)}
              className={i === index ? "active" : ""}
              aria-label={`Go to ${s}`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
            {i < 7 && <span className={i < index ? "filled" : ""} />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

function Scene({
  index,
  title,
  subtitle,
  children,
}: {
  index: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`scene scene-${index + 1}`}>
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="rose-corner rose-left">🌹</div>
      <div className="rose-corner rose-right">🌹</div>
      <div className="scene-content">
        <motion.div
          className="scene-number"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {String(index + 1).padStart(2, "0")} / 08
        </motion.div>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
}

function GiftScene({
  next,
  startMusic,
}: {
  next: () => void;
  startMusic: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Scene
      index={0}
      title="Happy Birthday"
      subtitle="A special surprise, made just for you"
    >
      <motion.div
        className="name-script hero-name"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        {data.name}
      </motion.div>
      <div className="gift-stage">
        <motion.div
          className="halo"
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.button
          className={`gift-real ${open ? "opened" : ""}`}
          onClick={() => {
            void startMusic();
            setOpen(true);
            setTimeout(next, 1250);
          }}
          aria-label="Open the birthday gift"
          animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {data.giftImage ? (
            <img src={data.giftImage} alt="Birthday gift" />
          ) : (
            <div className="gift-fallback">
              <div className="gift-lid">
                <span />
              </div>
              <div className="gift-box">
                <i />
                <b />
              </div>
              <div className="gift-bow">
                <i />
                <i />
                <em />
              </div>
            </div>
          )}
          {open && (
            <>
              <motion.div
                className="gift-light"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 2.8, opacity: [0, 1, 0] }}
                transition={{ duration: 1.05 }}
              />
              <motion.div
                className="gift-sparkles"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <span>♥</span>
                <span>✦</span>
                <span>♥</span>
                <span>✦</span>
              </motion.div>
            </>
          )}
        </motion.button>
      </div>
      <p className="micro-copy">
        Tap the gift to open your little surprise{" "}
        <Heart size={13} fill="currentColor" />
      </p>
    </Scene>
  );
}

function BalloonScene({ next }: { next: () => void }) {
  const [popped, setPopped] = useState<number[]>([]);
  const [flash, setFlash] = useState(false);
  const pop = (i: number) => {
    if (popped.includes(i)) return;
    setPopped((v) => [...v, i]);
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
  };
  return (
    <Scene
      index={1}
      title="Pop all 4 balloons"
      subtitle="Each balloon hides a little message for you"
    >
      <div className="counter">
        <span>{popped.length}</span> / 4
      </div>
      <div className="balloon-grid">
        {[0, 1, 2, 3].map((i) =>
          popped.includes(i) ? (
            <motion.div
              key={i}
              className="balloon-note"
              initial={{ scale: 0.3, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
            >
              {balloonMessages[i]}
              <small>♥</small>
            </motion.div>
          ) : (
            <motion.button
              key={i}
              className={`lux-balloon b${i}`}
              onClick={() => pop(i)}
              whileHover={{ y: -8, scale: 1.04 }}
              whileTap={{ scale: 1.18 }}
              aria-label={`Pop balloon ${i + 1}`}
            >
              <span>♥</span>
              <i />
              <em />
            </motion.button>
          ),
        )}
      </div>
      {flash && (
        <div className="tiny-heart-burst" aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 220,
                y: (Math.random() - 0.5) * 170,
                opacity: 0,
                rotate: 180,
              }}
              transition={{ duration: 0.7 }}
              style={{ left: "50%", top: "52%" }}
            >
              ♥
            </motion.span>
          ))}
        </div>
      )}
      <div className="progress-meter">
        <span style={{ width: `${popped.length * 25}%` }} />
      </div>
      {popped.length === 4 && (
        <motion.button
          className="lux-btn"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={next}
        >
          Continue <ArrowRight size={17} />
        </motion.button>
      )}
    </Scene>
  );
}

function CakeScene({ next }: { next: () => void }) {
  const [blown, setBlown] = useState(false);
  return (
    <Scene
      index={2}
      title="Make a Wish"
      subtitle="Close your eyes... then blow the candle"
    >
      <div className="cake-stage">
        <motion.div
          className="cake-halo"
          animate={{ scale: [0.96, 1.06, 0.96] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
        <motion.div
          className={`cake-real ${blown ? "blown" : ""}`}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {data.cakeImage ? (
            <img src={data.cakeImage} alt="Birthday cake" />
          ) : (
            <div className="cake-fallback">
              <div
                className="candle"
                onClick={() => setBlown(true)}
                role="button"
                tabIndex={0}
              >
                <span className="wick" />
                <span className="flame" />
              </div>
              <div className="frost top" />
              <div className="cake-layer l1" />
              <div className="frost mid" />
              <div className="cake-layer l2" />
              <div className="frost bottom" />
              <div className="cake-layer l3" />
              <div className="berries">● ● ● ● ●</div>
            </div>
          )}
          {data.cakeImage && (
            <button
              className="candle-hit"
              onClick={() => setBlown(true)}
              aria-label="Blow out the candle"
            >
              <span className={blown ? "flame-out" : "flame"} />
            </button>
          )}
        </motion.div>
        {blown && (
          <motion.div
            className="smoke"
            initial={{ opacity: 0, y: 0, scale: 0.7 }}
            animate={{ opacity: [0, 1, 0], y: -80, scale: 1.3 }}
            transition={{ duration: 1.5 }}
          >
            〰
          </motion.div>
        )}
      </div>
      {!blown ? (
        <button className="lux-btn ghost-gold" onClick={() => setBlown(true)}>
          <WandSparkles size={17} /> Tap the candle to blow it
        </button>
      ) : (
        <motion.div
          className="wish-reveal"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div>Make a wish... ✨</div>
          <button className="lux-btn" onClick={next}>
            Carry on <ArrowRight size={17} />
          </button>
        </motion.div>
      )}
    </Scene>
  );
}

function VoiceScene({
  next,
  onVoicePlayStateChange,
}: {
  next: () => void;
  onVoicePlayStateChange?: (playing: boolean) => void;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const setVoiceState = (isPlaying: boolean) => {
    setPlaying(isPlaying);
    onVoicePlayStateChange?.(isPlaying);
  };

  const toggle = () => {
    if (!ref.current) return;
    if (ref.current.paused) {
      ref.current
        .play()
        .then(() => setVoiceState(true))
        .catch(() => setError(true));
    } else {
      ref.current.pause();
      setVoiceState(false);
    }
  };

  const continueToNext = () => {
    if (ref.current && !ref.current.paused) {
      ref.current.pause();
    }
    onVoicePlayStateChange?.(false);
    next();
  };

  useEffect(() => {
    return () => {
      if (ref.current && !ref.current.paused) {
        ref.current.pause();
      }
      onVoicePlayStateChange?.(false);
    };
  }, []);

  return (
    <Scene
      index={3}
      title="because some feelings sound better ♡"
      subtitle="Something just for you to hear..."
    >
      <audio
        ref={ref}
        src={data.voiceMessage}
        onError={() => setError(true)}
        onPlay={() => setVoiceState(true)}
        onPause={() => setVoiceState(false)}
        onEnded={() => setVoiceState(false)}
      />
      <div className="voice-layout">
        <motion.div
          className="voice-orb"
          animate={{
            boxShadow: playing
              ? ["0 0 25px #ff6688", "0 0 75px #ffb37c", "0 0 25px #ff6688"]
              : "0 0 25px rgba(255,112,135,.3)",
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart size={52} fill="currentColor" />
        </motion.div>
        <div className="voice-card">
          <div className="voice-label">A VOICE JUST FOR YOU</div>
          <h3>
            {error
              ? "Add your voice-message.mp3 to hear it"
              : "A little message from me"}
          </h3>
          <div className="waveform">
            {Array.from({ length: 36 }, (_, i) => (
              <motion.i
                key={i}
                animate={
                  playing
                    ? { height: [8, 18 + (i % 8) * 5, 9] }
                    : { height: 8 + (i % 5) * 3 }
                }
                transition={{
                  duration: 0.5,
                  repeat: playing ? Infinity : 0,
                  delay: i * 0.015,
                }}
              />
            ))}
          </div>
          <div className="player-row">
            <button className="play-btn" onClick={toggle}>
              {playing ? (
                <Pause fill="currentColor" />
              ) : (
                <Play fill="currentColor" />
              )}
            </button>
            <span>
              {playing
                ? "Playing your message..."
                : "Press play when you’re ready"}
            </span>
          </div>
        </div>
      </div>
      <button className="text-btn" onClick={continueToNext}>
        Tap to continue <ArrowRight size={15} />
      </button>
    </Scene>
  );
}

function MemoriesScene({ next }: { next: () => void }) {
  const [idx, setIdx] = useState(0);
  const move = (d: number) =>
    setIdx((v) => (v + d + data.photos.length) % data.photos.length);
  return (
    <Scene
      index={4}
      title="Our Beautiful Memories"
      subtitle="Every moment with you is a beautiful memory..."
    >
      <div
        className="memory-carousel"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") move(-1);
          if (e.key === "ArrowRight") move(1);
        }}
      >
        {data.photos.map((src, i) => {
          let offset = i - idx;
          if (offset > 2) offset -= data.photos.length;
          if (offset < -2) offset += data.photos.length;
          return (
            <motion.div
              key={src}
              className="memory-card"
              animate={{
                x: offset * 220,
                scale: offset === 0 ? 1 : 0.72,
                rotate: offset * 7,
                opacity: Math.abs(offset) > 2 ? 0.05 : offset === 0 ? 1 : 0.45,
                zIndex: 20 - Math.abs(offset),
              }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <div className="memory-image">
                <img src={src} alt={data.captions[i]} />
              </div>
              <div className="memory-caption">{data.captions[i]}</div>
            </motion.div>
          );
        })}
        <button className="carousel-btn left" onClick={() => move(-1)}>
          <ChevronLeft />
        </button>
        <button className="carousel-btn right" onClick={() => move(1)}>
          <ChevronRight />
        </button>
      </div>
      <div className="dots">
        {data.photos.map((_, i) => (
          <button
            key={i}
            className={i === idx ? "active" : ""}
            onClick={() => setIdx(i)}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
      <button className="lux-btn" onClick={next}>
        Continue <ArrowRight size={17} />
      </button>
    </Scene>
  );
}

function LetterScene({ next }: { next: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Scene
      index={5}
      title="A Letter From My Heart"
      subtitle="Tap the envelope to open it"
    >
      <div
        className={`letter-scene ${open ? "open" : ""}`}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Open love letter"
      >
        <div className="envelope-body">
          <div className="envelope-back" />
          <div className="letter-paper">
            <div className="paper-title">My Dear {data.name},</div>
            <p>{data.letter}</p>
          </div>
          <div className="envelope-flap" />
          <div className="wax-seal">♥</div>
        </div>
        <motion.div
          className="letter-sparkles"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
        >
          <span>✦</span>
          <span>♥</span>
          <span>✦</span>
        </motion.div>
      </div>
      {open && (
        <motion.button
          className="lux-btn"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        >
          Keep going <ArrowRight size={17} />
        </motion.button>
      )}
    </Scene>
  );
}

function CollageScene({ next }: { next: () => void }) {
  return (
    <Scene
      index={6}
      title="A Collection of Special Moments"
      subtitle="A few memories to keep forever"
    >
      <div className="collage-grid">
        <div className="collage-photo main">
          <img src={data.photos[0]} alt="Memory" />
        </div>
        {data.photos.slice(1).map((p, i) => (
          <motion.div
            key={p}
            className={`collage-photo c${i}`}
            animate={{
              y: [0, -7, 0],
              rotate: [-5 + i * 3, -2 + i * 3, -5 + i * 3],
            }}
            transition={{
              duration: 3 + i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img src={p} alt="Memory" />
          </motion.div>
        ))}
        <div className="collage-note">
          So many beautiful moments...
          <br />
          and many more to create together. ♥
        </div>
      </div>
      <button className="lux-btn" onClick={next}>
        One last thing <ArrowRight size={17} />
      </button>
    </Scene>
  );
}

function FinalScene({ replay }: { replay: () => void }) {
  return (
    <Scene
      index={7}
      title="Happy Birthday"
      subtitle="Once again, with all my heart"
    >
      <div className="final-name">{data.name}</div>
      <motion.div
        className="heart-aura"
        animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      >
        <Heart size={110} fill="currentColor" />
      </motion.div>
      <p className="final-message">{data.finalMessage}</p>
      <div className="final-actions">
        <button className="lux-btn" onClick={replay}>
          <RotateCcw size={17} /> Replay
        </button>
        <button
          className="outline-btn"
          onClick={() =>
            document
              .querySelector(".scene-8")
              ?.animate(
                [
                  { filter: "brightness(1)" },
                  { filter: "brightness(1.45)" },
                  { filter: "brightness(1)" },
                ],
                { duration: 900 },
              )
          }
        >
          <Heart size={17} /> Make a Heartfelt Wish
        </button>
      </div>
      <div className="final-footer">made with love · for {data.name} ♥</div>
    </Scene>
  );
}

function App() {
  const [scene, setScene] = useState(0);
  const [music, setMusic] = useState(false);
  const bg = useRef<HTMLAudioElement>(null);
  const backgroundMusicEnabled = useRef(false);
  const go = (n: number) => setScene(Math.max(0, Math.min(7, n)));

  const startMusic = async () => {
    const audio = bg.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;
    audio.muted = false;

    try {
      await audio.play();
      backgroundMusicEnabled.current = true;
      setMusic(true);
    } catch {
      backgroundMusicEnabled.current = false;
      setMusic(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && scene < 7) go(scene + 1);
      if (e.key === "ArrowLeft" && scene > 0) go(scene - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scene]);

  const handleVoicePlaybackChange = (playing: boolean) => {
    const audio = bg.current;
    if (!audio) return;

    if (playing) {
      if (backgroundMusicEnabled.current && !audio.paused) {
        audio.pause();
        setMusic(false);
      }
      return;
    }

    if (backgroundMusicEnabled.current) {
      void startMusic();
    }
  };

  const toggleMusic = () => {
    if (!bg.current) return;
    if (bg.current.paused) {
      void startMusic();
    } else {
      bg.current.pause();
      backgroundMusicEnabled.current = false;
      setMusic(false);
    }
  };
  return (
    <main className="app">
      <audio
        ref={bg}
        src={data.backgroundMusic}
        loop
        preload="auto"
        playsInline
      />
      <AmbientParticles />
      <SceneChrome
        index={scene}
        setScene={go}
        music={music}
        toggleMusic={toggleMusic}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          className="scene-host"
          initial={{ opacity: 0, scale: 0.985, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {scene === 0 && (
            <GiftScene next={() => go(1)} startMusic={startMusic} />
          )}{" "}
          {scene === 1 && <BalloonScene next={() => go(2)} />}{" "}
          {scene === 2 && <CakeScene next={() => go(3)} />}{" "}
          {scene === 3 && (
            <VoiceScene
              next={() => go(4)}
              onVoicePlayStateChange={handleVoicePlaybackChange}
            />
          )}{" "}
          {scene === 4 && <MemoriesScene next={() => go(5)} />}{" "}
          {scene === 5 && <LetterScene next={() => go(6)} />}{" "}
          {scene === 6 && <CollageScene next={() => go(7)} />}{" "}
          {scene === 7 && <FinalScene replay={() => go(0)} />}{" "}
        </motion.div>
      </AnimatePresence>
      <div className="side-nav">
        <button disabled={scene === 0} onClick={() => go(scene - 1)}>
          <ArrowLeft size={15} />
        </button>
        <span>{String(scene + 1).padStart(2, "0")}</span>
        <button disabled={scene === 7} onClick={() => go(scene + 1)}>
          <ArrowRight size={15} />
        </button>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
