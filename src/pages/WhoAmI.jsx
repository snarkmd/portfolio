import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Coffee,
  Compass,
  Film,
  Headphones,
  ListMusic,
  MapPinned,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator";

const directory = [
  { label: "Movies", target: "movies", icon: Film },
  { label: "Playlist", target: "playlist", icon: ListMusic },
  { label: "Manga / Anime", target: "manga-anime", icon: BookOpen },
  { label: "Adventure log", target: "adventures", icon: Compass },
  { label: "Rituals", target: "rituals", icon: Coffee },
];

const movieShelf = [
  {
    title: "Perfect Days",
    year: "2023",
    mood: "quiet routine",
    note: "For days when small rituals feel more honest than big speeches.",
  },
  {
    title: "The Grand Budapest Hotel",
    year: "2014",
    mood: "orderly chaos",
    note: "For composition, timing, color, and the joy of being slightly absurd.",
  },
  {
    title: "Arrival",
    year: "2016",
    mood: "language and grief",
    note: "For anyone who thinks communication is one of the deepest human problems.",
  },
  {
    title: "Spirited Away",
    year: "2001",
    mood: "wonder with teeth",
    note: "For the part of me that still likes strange worlds with real emotional rules.",
  },
];

const playlistNotes = [
  {
    label: "late work",
    text: "slow tracks, clean loops, music that leaves room for thinking",
  },
  {
    label: "city walk",
    text: "songs with texture, rhythm, and enough warmth to make streets feel edited",
  },
  {
    label: "reset",
    text: "soft vocals, familiar melodies, nothing trying too hard",
  },
];

const mangaAnimeTrivia = [
  {
    prompt: "Favorite kind of character",
    answer: "the quiet strategist who notices everything before speaking",
  },
  {
    prompt: "Trope weakness",
    answer: "found family, training arcs, mentors with suspiciously good advice",
  },
  {
    prompt: "Instant attention",
    answer: "worldbuilding with rules, maps, guilds, rituals, or weird food",
  },
  {
    prompt: "Anime comfort zone",
    answer: "Ghibli tenderness, slice-of-life calm, and stories where kindness is not naive",
  },
  {
    prompt: "Manga shelf energy",
    answer: "curiosity first: panels, pacing, expressions, and how a page teaches your eye to move",
  },
];

const adventureLog = [
  {
    place: "old streets",
    stamp: "walk",
    story: "I like places that look used by time. Doors, signs, tiles, noise, small shops, and details nobody designed for Instagram.",
  },
  {
    place: "hospital corridors",
    stamp: "training",
    story: "Medicine teaches you that people are never just one thing. Every room has fear, humor, fatigue, and dignity in it.",
  },
  {
    place: "workshop rooms",
    stamp: "teaching",
    story: "My favorite teaching moments are when someone stops copying and starts making their own decisions.",
  },
  {
    place: "late desk",
    stamp: "making",
    story: "Most ideas arrive as messy notes. The real work is turning that chaos into something another person can enter.",
  },
];

const rituals = [
  { icon: Coffee, label: "drink", value: "mint tea for comfort, coffee for deadlines" },
  { icon: Headphones, label: "sound", value: "background music that does not steal the room" },
  { icon: MapPinned, label: "collect", value: "street textures, overheard phrases, screenshots, names" },
  { icon: Sparkles, label: "small joy", value: "finding one detail that makes the whole thing click" },
];

const WhoAmI = () => {
  const rootRef = useRef(null);
  const [activeMovie, setActiveMovie] = useState(0);
  const [activeTrivia, setActiveTrivia] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".whoami-entry",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" }
      );

      gsap.utils.toArray(".whoami-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollTo = (target) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className="bg-light-100 text-dark">
      <section className="px-8 md:px-16 pt-12 pb-10 md:pt-16 md:pb-14 border-b-2 border-dark">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-10 items-end">
          <div>
            <p className="whoami-entry font-mono text-xs mb-4">
              WHO AM I / PERSONAL DIRECTORY
            </p>
            <h1 className="whoami-entry font-serif text-5xl md:text-8xl leading-[0.95] max-w-5xl">
              Shelves, tabs, notes, and tiny proofs of taste.
            </h1>
          </div>

          <p className="whoami-entry font-sans text-base md:text-lg max-w-xl lg:justify-self-end">
            Less biography, more browsing. This is a living index of movies,
            songs, manga/anime trivia, small rituals, and stories I keep coming
            back to.
          </p>
        </div>
      </section>

      <nav className="sticky top-0 z-30 bg-light-100 border-b-2 border-dark overflow-x-auto">
        <ul className="flex min-w-max px-8 md:px-16">
          {directory.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.target}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.target)}
                  className="flex items-center gap-2 border-r-2 border-dark first:border-l-2 px-4 md:px-6 py-4 font-mono text-xs hover:bg-dark hover:text-light-200 transition-colors"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon className="size-4" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <main>
        <section
          id="movies"
          className="px-8 md:px-16 py-14 md:py-20 border-b-2 border-dark"
        >
          <div className="whoami-reveal grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
            <div>
              <p className="font-mono text-xs mb-3">01 / MOVIE SHELF</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Films I would hand someone before overexplaining myself.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-6">
              <div className="border-y-2 border-dark divide-y-2 divide-dark">
                {movieShelf.map((movie, index) => (
                  <button
                    key={movie.title}
                    type="button"
                    onMouseEnter={() => setActiveMovie(index)}
                    onFocus={() => setActiveMovie(index)}
                    onClick={() => setActiveMovie(index)}
                    className={`w-full text-left py-4 flex items-center justify-between gap-4 transition-colors ${
                      activeMovie === index ? "bg-light-200" : "hover:bg-light-200"
                    }`}
                  >
                    <span className="px-3">
                      <span className="font-mono text-xs mr-3">
                        {movie.year}
                      </span>
                      <span className="font-serif text-3xl md:text-4xl">
                        {movie.title}
                      </span>
                    </span>
                    <span className="font-mono text-xs px-3 hidden sm:block">
                      {movie.mood}
                    </span>
                  </button>
                ))}
              </div>

              <div className="min-h-72 border-2 border-dark bg-berry p-5 flex flex-col justify-between">
                <Film className="size-9" />
                <p className="font-serif text-3xl leading-tight">
                  {movieShelf[activeMovie].note}
                </p>
                <p className="font-mono text-xs">
                  selected / {movieShelf[activeMovie].title}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="playlist"
          className="px-8 md:px-16 py-14 md:py-20 border-b-2 border-dark bg-dark text-light-200"
        >
          <div className="whoami-reveal grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8">
            <div>
              <p className="font-mono text-xs mb-3">02 / PLAYLIST</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                The soundtrack shelf.
              </h2>
              <p className="font-sans text-sm max-w-md mt-5">
                A Spotify slot for whatever playlist currently feels most like
                the room. The embed URL lives at the top of this file.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.7fr] gap-5">
              <iframe
                title="Spotify playlist"
                src={SPOTIFY_EMBED_URL}
                width="100%"
                height="380"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-2 border-light-200 bg-light-200"
              />

              <div className="border border-light-200/40 divide-y divide-light-200/40">
                {playlistNotes.map((note, index) => (
                  <div key={note.label} className="p-4">
                    <p className="font-mono text-xs text-green">
                      {String(index + 1).padStart(2, "0")} / {note.label}
                    </p>
                    <p className="font-serif text-2xl mt-3">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="manga-anime"
          className="px-8 md:px-16 py-14 md:py-20 border-b-2 border-dark"
        >
          <div className="whoami-reveal grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
            <div>
              <p className="font-mono text-xs mb-3">03 / MANGA + ANIME TRIVIA</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Not rankings. More like tells.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr] gap-5">
              <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-2 border-dark md:border-r-0">
                {mangaAnimeTrivia.map((item, index) => (
                  <button
                    key={item.prompt}
                    type="button"
                    onClick={() => setActiveTrivia(index)}
                    className={`min-w-52 md:min-w-0 text-left p-4 border-r-2 md:border-r-0 md:border-b-2 last:border-r-0 md:last:border-b-0 border-dark font-mono text-xs transition-colors ${
                      activeTrivia === index
                        ? "bg-green text-dark"
                        : "hover:bg-light-200"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")} / {item.prompt}
                  </button>
                ))}
              </div>

              <div className="min-h-80 border-2 border-dark bg-light-200 p-6 flex flex-col justify-between">
                <BookOpen className="size-9" />
                <p className="font-serif text-4xl md:text-5xl leading-tight">
                  {mangaAnimeTrivia[activeTrivia].answer}
                </p>
                <p className="font-mono text-xs">
                  trivia / {mangaAnimeTrivia[activeTrivia].prompt}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="adventures"
          className="px-8 md:px-16 py-14 md:py-20 border-b-2 border-dark"
        >
          <div className="whoami-reveal">
            <p className="font-mono text-xs mb-3">04 / SHORT ADVENTURES</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight max-w-4xl">
              Small field notes from places that shaped my eye.
            </h2>
          </div>

          <div className="mt-10 border-y-2 border-dark divide-y-2 divide-dark">
            {adventureLog.map((entry, index) => (
              <article
                key={entry.place}
                className="whoami-reveal grid grid-cols-1 md:grid-cols-[0.25fr_0.35fr_1fr] gap-4 py-5"
              >
                <p className="font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="font-serif text-3xl">{entry.place}</p>
                  <p className="font-mono text-xs mt-1">{entry.stamp}</p>
                </div>
                <p className="font-sans text-base max-w-2xl">{entry.story}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="rituals" className="px-8 md:px-16 py-14 md:py-20">
          <div className="whoami-reveal grid grid-cols-1 lg:grid-cols-[0.65fr_1.35fr] gap-8">
            <div>
              <p className="font-mono text-xs mb-3">05 / RITUALS</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Repeated things that say more than a bio.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rituals.map((ritual) => {
                const Icon = ritual.icon;
                return (
                  <div
                    key={ritual.label}
                    className="border-2 border-dark p-5 min-h-44 bg-light-200 hover:bg-green transition-colors"
                  >
                    <Icon className="size-7 mb-8" />
                    <p className="font-mono text-xs">{ritual.label}</p>
                    <p className="font-serif text-3xl leading-tight mt-2">
                      {ritual.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WhoAmI;
