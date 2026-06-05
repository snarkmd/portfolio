import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BookOpenText,
  FileText,
  Search,
  Stethoscope,
  Tags,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogCategories, blogPosts, blogTags } from "../data/blogPosts";

gsap.registerPlugin(ScrollTrigger);

const ALL_FILTER = "All";
const POSTS_PER_PAGE = 5;

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const normalize = (value) => value.toLowerCase().trim();

const FilterButton = ({ active, children, onClick }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`border-2 border-dark px-3 py-2 font-mono text-xs transition-colors ${
      active ? "bg-dark text-light-200" : "hover:bg-light-200"
    }`}
  >
    {children}
  </button>
);

const Blog = () => {
  const rootRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || ALL_FILTER;
  const activeTag = searchParams.get("tag") || ALL_FILTER;
  const searchQuery = searchParams.get("q") || "";
  const pageParam = Number(searchParams.get("page") || "1");

  const updateParam = (key, value, options = {}) => {
    const nextParams = new URLSearchParams(searchParams);
    const isDefaultFilter =
      value === ALL_FILTER || value === "" || (key === "page" && Number(value) <= 1);

    if (isDefaultFilter) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    if (key !== "page") {
      nextParams.delete("page");
    }

    setSearchParams(nextParams, options);
  };

  const searchableQuery = normalize(searchQuery);
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === ALL_FILTER || post.category === activeCategory;
    const matchesTag = activeTag === ALL_FILTER || post.tags.includes(activeTag);
    const searchCorpus = normalize(
      [
        post.title,
        post.category,
        post.type,
        post.summary,
        post.status,
        post.tags.join(" "),
        post.markdown,
      ].join(" ")
    );
    const matchesSearch = !searchableQuery || searchCorpus.includes(searchableQuery);

    return matchesCategory && matchesTag && matchesSearch;
  });
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Number.isFinite(pageParam)
    ? Math.min(Math.max(Math.floor(pageParam), 1), totalPages)
    : 1;
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  const categoryCounts = blogCategories
    .filter((category) => category !== ALL_FILTER)
    .map((category) => ({
      category,
      count: blogPosts.filter((post) => post.category === category).length,
    }));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-entry",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" }
      );

      gsap.utils.toArray(".blog-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-light-100 text-dark">
      <Helmet>
        <title>Blog | Snark M.D.</title>
        <meta
          name="description"
          content="Healthcare, medical technology, frontend development, AI, and engineering articles by Snark M.D."
        />
      </Helmet>

      <section className="px-8 md:px-16 pt-12 pb-10 md:pt-16 md:pb-14 border-b-2 border-dark">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.6fr] gap-10 items-end">
          <div>
            <p className="blog-entry font-mono text-xs mb-4">
              BLOG / HEALTHCARE + MEDICAL + TECH + DEV
            </p>
            <h1 className="blog-entry font-serif text-5xl md:text-8xl leading-[0.95] max-w-6xl">
              Choose a note. Open it on its own page.
            </h1>
          </div>

          <div className="blog-entry xl:justify-self-end max-w-xl">
            <p className="font-sans text-base md:text-lg">
              A navigation shelf for tutorials, articles, and field notes about
              clinical systems, health data, safer software, and frontend craft.
            </p>
            <div className="mt-6 grid grid-cols-3 border-2 border-dark divide-x-2 divide-dark">
              <div className="p-3">
                <p className="font-serif text-3xl">{blogPosts.length}</p>
                <p className="font-mono text-[10px]">POSTS</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-3xl">{blogCategories.length - 1}</p>
                <p className="font-mono text-[10px]">CATEGORIES</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-3xl">{blogTags.length - 1}</p>
                <p className="font-mono text-[10px]">TAGS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-reveal px-8 md:px-16 py-6 border-b-2 border-dark">
        <div className="grid grid-cols-1 xl:grid-cols-[0.35fr_1fr] gap-5">
          <label className="flex items-center gap-3 border-2 border-dark px-4 py-3">
            <Search className="size-4" />
            <span className="sr-only">Search blog posts</span>
            <input
              value={searchQuery}
              onChange={(event) =>
                updateParam("q", event.target.value, { replace: true })
              }
              placeholder="Search topics, APIs, clinical notes..."
              className="w-full bg-transparent font-mono text-xs outline-none placeholder:text-dark/50"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <FilterButton
                key={category}
                active={activeCategory === category}
                onClick={() => updateParam("category", category)}
              >
                {category}
              </FilterButton>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="flex items-center gap-2 font-mono text-xs mr-2">
            <Tags className="size-4" />
            Tags
          </span>
          {blogTags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={activeTag === tag}
              onClick={() => updateParam("tag", tag)}
              className={`px-3 py-1.5 font-mono text-[11px] transition-colors ${
                activeTag === tag
                  ? "bg-green text-dark"
                  : "bg-light-200 hover:bg-dark hover:text-light-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <main className="px-8 md:px-16 py-10 md:py-14">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.35fr] gap-8 items-start">
          <section className="blog-reveal">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <p className="font-mono text-xs">INDEX</p>
                <h2 className="font-serif text-4xl md:text-5xl">
                  {filteredPosts.length} result{filteredPosts.length === 1 ? "" : "s"}
                </h2>
                <p className="font-mono text-xs mt-2">
                  Page {currentPage} of {totalPages} / {POSTS_PER_PAGE} max per page
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
                <Activity className="size-4" />
                Single-post routes
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <>
                <div className="border-y-2 border-dark divide-y-2 divide-dark">
                  {paginatedPosts.map((post, index) => (
                    <article key={post.slug} className="group py-5 transition-colors hover:bg-light-200">
                      <div className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.25rem_1fr_auto] gap-4 px-3 md:px-4 items-start">
                        <span className="font-mono text-xs pt-2">
                          {String(pageStart + index + 1).padStart(2, "0")}
                        </span>

                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <button
                              type="button"
                              onClick={() => updateParam("category", post.category)}
                              className="bg-dark text-light-200 px-2 py-1 font-mono text-[10px] hover:bg-green hover:text-dark transition-colors"
                            >
                              {post.category}
                            </button>
                            <span className="border border-dark px-2 py-1 font-mono text-[10px]">
                              {post.type}
                            </span>
                            <span className="font-mono text-[10px]">
                              {formatDate(post.date)}
                            </span>
                          </div>

                          <Link to={`/blog/${post.slug}`} className="block">
                            <h3 className="font-serif text-3xl md:text-5xl leading-tight">
                              {post.title}
                            </h3>
                            <p className="font-sans text-sm md:text-base mt-3 max-w-3xl">
                              {post.summary}
                            </p>
                          </Link>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => updateParam("tag", tag)}
                                className="bg-light-100 px-2 py-1 font-mono text-[10px] hover:bg-green transition-colors"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          aria-label={`Read ${post.title}`}
                          className="hidden md:flex items-center gap-2 font-mono text-xs"
                        >
                          Read
                          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav
                    className="mt-6 flex flex-wrap items-center justify-between gap-3"
                    aria-label="Blog pagination"
                  >
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => updateParam("page", currentPage - 1)}
                      className="border-2 border-dark px-4 py-2 font-mono text-xs transition-colors enabled:hover:bg-dark enabled:hover:text-light-200 disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (page) => (
                          <button
                            key={page}
                            type="button"
                            aria-current={currentPage === page ? "page" : undefined}
                            onClick={() => updateParam("page", page)}
                            className={`border-2 border-dark px-3 py-2 font-mono text-xs transition-colors ${
                              currentPage === page
                                ? "bg-dark text-light-200"
                                : "hover:bg-light-200"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => updateParam("page", currentPage + 1)}
                      className="border-2 border-dark px-4 py-2 font-mono text-xs transition-colors enabled:hover:bg-dark enabled:hover:text-light-200 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className="border-2 border-dark p-6">
                <p className="font-serif text-3xl">No posts match this filter.</p>
                <p className="font-sans text-sm mt-3">
                  Clear the search, category, or tag filter to restore the full
                  index.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchParams(new URLSearchParams())}
                  className="mt-5 border-2 border-dark px-4 py-2 font-mono text-xs hover:bg-dark hover:text-light-200 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          <aside className="blog-reveal xl:sticky xl:top-6">
            <div className="border-2 border-dark bg-light-200">
              <div className="p-5 border-b-2 border-dark">
                <BookOpenText className="size-6 mb-4" />
                <p className="font-mono text-xs">READING MODEL</p>
                <p className="font-serif text-3xl leading-tight mt-2">
                  The index filters. Each article owns its own URL.
                </p>
              </div>

              <div className="divide-y-2 divide-dark">
                {categoryCounts.map((item) => (
                  <button
                    key={item.category}
                    type="button"
                    onClick={() => updateParam("category", item.category)}
                    className="w-full grid grid-cols-[1fr_auto] gap-4 p-4 text-left hover:bg-green transition-colors"
                  >
                    <span className="font-sans text-sm">{item.category}</span>
                    <span className="font-mono text-xs">{item.count}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 border-t-2 border-dark divide-x-2 divide-dark">
                <div className="p-4">
                  <Stethoscope className="size-5 mb-3" />
                  <p className="font-mono text-[10px]">HEALTHCARE</p>
                </div>
                <div className="p-4">
                  <FileText className="size-5 mb-3" />
                  <p className="font-mono text-[10px]">MARKDOWN</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Blog;
