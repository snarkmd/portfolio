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
  Cat,
  FlaskConical,
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
  { label: "Field notes", target: "adventures", icon: Compass },
  { label: "Rituals", target: "rituals", icon: Coffee },
];

const movieShelf = [
  {
    title: "Perfect Days",
    year: "2023",
    mood: "quiet dignity",
    note: "A man who cleans toilets for a living is more at peace than everyone around him. The movie doesn't explain why. That's the whole point.",
    imdb: "https://www.imdb.com/title/tt27503384/",
  },
  {
    title: "The Grand Budapest Hotel",
    year: "2014",
    mood: "controlled absurdity",
    note: "Proof that style is not the opposite of substance. Also that people will do extraordinary things for pastry.",
    imdb: "https://www.imdb.com/title/tt2278388/",
  },
  {
    title: "Arrival",
    year: "2016",
    mood: "language, time, grief",
    note: "The only sci-fi film I've seen where the alien problem is actually a linguistics problem. House would hate it. I love it.",
    imdb: "https://www.imdb.com/title/tt2543164/",
  },
  {
    title: "Spirited Away",
    year: "2001",
    mood: "earn your way back",
    note: "A kid falls into a spirit economy and has to work for it. No chosen one arc. No special powers. Just work, attention, and not forgetting who you are.",
    imdb: "https://www.imdb.com/title/tt0245429/",
  },
  {
    title: "12 Angry Men",
    year: "1957",
    mood: "one room, twelve egos",
    note: "Every character is wrong about something. Every character is also right about something. A masterclass in how conviction and reasoning are not the same thing.",
    imdb: "https://www.imdb.com/title/tt0050083/",
  },
];

const playlistNotes = [
  {
    label: "3am build",
    text: "something that sounds like focus but doesn't demand you listen to it",
  },
  {
    label: "city noise",
    text: "tracks with texture — like the street outside has a decent sound designer",
  },
  {
    label: "reset",
    text: "nothing clever. familiar. the musical equivalent of chamomile.",
  },
];

const mangaAnimeTrivia = [
  {
    prompt: "Character I always root for",
    answer:
      "the one who figured out the rules of the world three episodes ago and is waiting for everyone else to catch up",
  },
  {
    prompt: "Trope I cannot resist",
    answer:
      "found family that argues constantly but shows up when it actually matters. every time. no exceptions.",
  },
  {
    prompt: "What makes me pick up a new series",
    answer:
      "a system with internal logic. guilds, magic rules, power hierarchies — if the world has consistent rules I will read the wiki before finishing episode 2",
  },
  {
    prompt: "Comfort zone",
    answer:
      "Ghibli pacing. stories where the stakes are real but nobody has to be evil for things to go wrong",
  },
  {
    prompt: "What I actually look at in manga",
    answer:
      "panel composition and how silence is used. some mangaka can make you feel dread with an empty corridor. that's more impressive than any fight scene.",
  },
];

const adventureLog = [
  {
    place: "old streets",
    stamp: "observation",
    story:
      "I trust a city that looks used. Paint that didn't survive winter. Doors that were repainted twice. Signs in three fonts. The Instagram version of a city is a city that fired its memory.",
  },
  {
    place: "clinic hallways",
    stamp: "sleep medicine",
    story:
      "People arrive pretending they slept fine. The polygraph says otherwise. Medicine is the only field where lying to yourself shows up as data.",
  },
  {
    place: "2am terminal",
    stamp: "building",
    story:
      "The best code I've written happened when I stopped caring about best practices and started caring about the actual problem. The two are related but not the same.",
  },
  {
    place: "workshop rooms",
    stamp: "teaching",
    story:
      "You know someone actually learned something when they stop asking 'is this right' and start asking 'what if I tried this instead.' Takes longer than expected. Worth it every time.",
  },
];

const rituals = [
  {
    icon: Coffee,
    label: "before midnight",
    value: "tea or chamomile. the kind of drink that doesn't pretend to do anything.",
  },
  {
    icon: FlaskConical,
    label: "after midnight",
    value: "coffee. non-negotiable. the night shift has terms.",
  },
  {
    icon: Cat,
    label: "decompression",
    value: "petting a cat. not metaphorically. actual cat. actual silence.",
  },
  {
    icon: Sparkles,
    label: "small win",
    value: "when one fix makes three other problems disappear. rare. unforgettable.",
  },
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
      {/* HEADER */}
      <section className="px-8 md:px-16 pt-12 pb-10 md:pt-16 md:pb-14 border-b-2 border-dark">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-10 items-end">
          <div>
            <p className="whoami-entry font-mono text-xs mb-4">
              WHO AM I / PERSONAL INDEX
            </p>
            <h1 className="whoami-entry font-serif text-5xl md:text-8xl leading-[0.95] max-w-5xl">
              Things I'd tell you if I actually had time to explain myself.
            </h1>
          </div>

          <p className="whoami-entry font-sans text-base md:text-lg max-w-xl lg:justify-self-end">
            Not a bio. More like evidence. Films, songs, anime instincts, field
            notes, and the small rituals that prove I'm at least trying to be a
            functional person.
          </p>
        </div>
      </section>

      {/* STICKY NAV */}
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
        {/* MOVIES */}
        <section
          id="movies"
          className="px-8 md:px-16 py-14 md:py-20 border-b-2 border-dark"
        >
          <div className="whoami-reveal grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
            <div>
              <p className="font-mono text-xs mb-3">01 / MOVIE SHELF</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Films I'd hand you instead of answering a personal question.
              </h2>
              <p className="font-sans text-sm mt-4 max-w-xs text-dark/60">
                Click the title to open on IMDB.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-6">
              <div className="border-y-2 border-dark divide-y-2 divide-dark">
                {movieShelf.map((movie, index) => (
                  <div
                    key={movie.title}
                    onMouseEnter={() => setActiveMovie(index)}
                    onFocus={() => setActiveMovie(index)}
                    className={`w-full text-left py-4 flex items-center justify-between gap-4 transition-colors ${
                      activeMovie === index ? "bg-light-200" : "hover:bg-light-200"
                    }`}
                  >
                    <span className="px-3 flex items-center gap-3">
                      <span className="font-mono text-xs">{movie.year}</span>
                      <a
                        href={movie.imdb}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setActiveMovie(index)}
                        className="font-serif text-2xl md:text-3xl hover:underline underline-offset-4"
                      >
                        {movie.title}
                      </a>
                    </span>
                    <span className="font-mono text-xs px-3 hidden sm:block text-dark/50">
                      {movie.mood}
                    </span>
                  </div>
                ))}
              </div>

              <div className="min-h-72 border-2 border-dark bg-berry p-5 flex flex-col justify-between">
                <Film className="size-9" />
                <p className="font-serif text-2xl md:text-3xl leading-tight">
                  {movieShelf[activeMovie].note}
                </p>
                <p className="font-mono text-xs opacity-60">
                  {movieShelf[activeMovie].title} · {movieShelf[activeMovie].year}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PLAYLIST */}
        <section
          id="playlist"
          className="px-8 md:px-16 py-14 md:py-20 border-b-2 border-dark bg-dark text-light-200"
        >
          <div className="whoami-reveal grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8">
            <div>
              <p className="font-mono text-xs mb-3">02 / PLAYLIST</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Music I use as infrastructure.
              </h2>
              <p className="font-sans text-sm max-w-md mt-5 text-light-200/60">
                Not background noise. Not foreground noise either. Something
                in between that gets out of the way.
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
                    <p className="font-serif text-xl md:text-2xl mt-3 leading-snug">
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MANGA / ANIME */}
        <section
          id="manga-anime"
          className="px-8 md:px-16 py-14 md:py-20 border-b-2 border-dark"
        >
          <div className="whoami-reveal grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
            <div>
              <p className="font-mono text-xs mb-3">03 / MANGA + ANIME</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Not rankings. More like tells.
              </h2>
              <p className="font-sans text-sm max-w-xs mt-4 text-dark/60">
                What you like is fine. How you talk about what you like is the
                actual data.
              </p>
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
                <p className="font-serif text-3xl md:text-4xl leading-tight">
                  {mangaAnimeTrivia[activeTrivia].answer}
                </p>
                <p className="font-mono text-xs text-dark/50">
                  {mangaAnimeTrivia[activeTrivia].prompt}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FIELD NOTES */}
        <section
          id="adventures"
          className="px-8 md:px-16 py-14 md:py-20 border-b-2 border-dark"
        >
          <div className="whoami-reveal">
            <p className="font-mono text-xs mb-3">04 / FIELD NOTES</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight max-w-4xl">
              Places and situations that left a mark on how I think.
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
                  <p className="font-mono text-xs mt-1 text-dark/50">{entry.stamp}</p>
                </div>
                <p className="font-sans text-base max-w-2xl leading-relaxed">
                  {entry.story}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* RITUALS */}
        <section id="rituals" className="px-8 md:px-16 py-14 md:py-20">
          <div className="whoami-reveal grid grid-cols-1 lg:grid-cols-[0.65fr_1.35fr] gap-8">
            <div>
              <p className="font-mono text-xs mb-3">05 / RITUALS</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Repeated behaviors that I've stopped apologizing for.
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
                    <p className="font-serif text-2xl md:text-3xl leading-tight mt-2">
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