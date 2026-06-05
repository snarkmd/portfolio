import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Clock3,
  FileText,
  Tags,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarkdownContent from "../components/blog/MarkdownContent";
import { blogPosts } from "../data/blogPosts";

gsap.registerPlugin(ScrollTrigger);

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const getFilterUrl = (key, value) => {
  const params = new URLSearchParams();
  params.set(key, value);
  return `/blog?${params.toString()}`;
};

const BlogPost = () => {
  const rootRef = useRef(null);
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);
  const relatedCandidates = post
    ? blogPosts
        .filter((item) => item.slug !== post.slug)
        .map((item) => {
          const sharedTagCount = item.tags.filter((tag) => post.tags.includes(tag)).length;
          const categoryScore = item.category === post.category ? 3 : 0;

          return { item, score: categoryScore + sharedTagCount };
        })
        .filter(({ score }) => score > 0)
        .sort(
          (firstPost, secondPost) =>
            secondPost.score - firstPost.score ||
            new Date(secondPost.item.date) - new Date(firstPost.item.date)
        )
        .map(({ item }) => item)
    : [];
  const relatedPosts = post
    ? (relatedCandidates.length > 0
        ? relatedCandidates
        : blogPosts.filter((item) => item.slug !== post.slug)
      ).slice(0, 2)
    : [];
  const canonicalUrl =
    post && typeof window !== "undefined"
      ? `${window.location.origin}/blog/${post.slug}`
      : "";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".post-entry",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" }
      );

      gsap.utils.toArray(".post-reveal").forEach((element) => {
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
  }, [slug]);

  if (!post) {
    return (
      <div ref={rootRef} className="bg-light-100 text-dark">
        <Helmet>
          <title>Post not found | Snark M.D.</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <section className="px-8 md:px-16 py-16 md:py-24 border-b-2 border-dark">
          <Link
            to="/blog"
            className="post-entry inline-flex items-center gap-2 font-mono text-xs mb-8 hover:opacity-70"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>
          <h1 className="post-entry font-serif text-5xl md:text-8xl leading-[0.95] max-w-4xl">
            This post does not exist.
          </h1>
          <p className="post-entry font-sans text-base md:text-lg max-w-xl mt-6">
            The article may have moved, or the slug may be incorrect.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="bg-light-100 text-dark">
      <Helmet>
        <title>{post.title} | Snark M.D.</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>

      <article>
        <header className="px-8 md:px-16 pt-12 pb-10 md:pt-16 md:pb-14 border-b-2 border-dark">
          <Link
            to="/blog"
            className="post-entry inline-flex items-center gap-2 font-mono text-xs mb-8 hover:opacity-70"
          >
            <ArrowLeft className="size-4" />
            Back to blog index
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.35fr] gap-10 items-end">
            <div>
              <div className="post-entry flex flex-wrap items-center gap-2 mb-5">
                <Link
                  to={getFilterUrl("category", post.category)}
                  className="bg-dark text-light-200 px-2 py-1 font-mono text-[10px] hover:bg-green hover:text-dark transition-colors"
                >
                  {post.category}
                </Link>
                <span className="border border-dark px-2 py-1 font-mono text-[10px]">
                  {post.type}
                </span>
                <span className="border border-dark px-2 py-1 font-mono text-[10px]">
                  {post.status}
                </span>
              </div>

              <h1 className="post-entry font-serif text-5xl md:text-8xl leading-[0.95] max-w-6xl">
                {post.title}
              </h1>
              <p className="post-entry font-sans text-base md:text-xl max-w-3xl mt-6">
                {post.summary}
              </p>
            </div>

            <div className="post-entry border-2 border-dark bg-light-200">
              <div className="grid grid-cols-2 xl:grid-cols-1 divide-x-2 xl:divide-x-0 xl:divide-y-2 divide-dark">
                <div className="p-4">
                  <CalendarDays className="size-5 mb-3" />
                  <p className="font-mono text-[10px]">PUBLISHED</p>
                  <p className="font-sans text-sm">{formatDate(post.date)}</p>
                </div>
                <div className="p-4">
                  <Clock3 className="size-5 mb-3" />
                  <p className="font-mono text-[10px]">READ TIME</p>
                  <p className="font-sans text-sm">{post.readTime}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-8 md:px-16 py-10 md:py-16">
          <div className="grid grid-cols-1 xl:grid-cols-[0.28fr_0.72fr] gap-10 items-start">
            <aside className="post-reveal xl:sticky xl:top-6">
              <div className="border-2 border-dark bg-light-200">
                <div className="p-5 border-b-2 border-dark">
                  <Tags className="size-6 mb-4" />
                  <p className="font-mono text-xs">TAGS</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={getFilterUrl("tag", tag)}
                        className="bg-green px-2 py-1 font-mono text-[10px] hover:bg-dark hover:text-light-200 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x-2 divide-dark">
                  <div className="p-4">
                    <BookOpenText className="size-5 mb-3" />
                    <p className="font-mono text-[10px]">ARTICLE</p>
                  </div>
                  <div className="p-4">
                    <FileText className="size-5 mb-3" />
                    <p className="font-mono text-[10px]">MARKDOWN</p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="post-reveal border-y-2 border-dark py-8">
              <MarkdownContent markdown={post.markdown} skipFirstHeading />
            </section>
          </div>
        </main>
      </article>

      <section className="post-reveal px-8 md:px-16 pb-14 md:pb-20">
        <div className="border-t-2 border-dark pt-8">
          <div className="flex items-end justify-between gap-5 mb-5">
            <div>
              <p className="font-mono text-xs">NEXT READING</p>
              <h2 className="font-serif text-4xl md:text-5xl">
                Related posts
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-2 font-mono text-xs hover:opacity-70"
            >
              View all
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {relatedPosts.length > 0 ? (
            <div className="border-y-2 border-dark divide-y-2 divide-dark">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 py-5 px-3 hover:bg-light-200 transition-colors"
                >
                  <div>
                    <p className="font-mono text-[10px] mb-2">
                      {relatedPost.category} / {relatedPost.type}
                    </p>
                    <p className="font-serif text-3xl leading-tight">
                      {relatedPost.title}
                    </p>
                  </div>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dark p-5">
              <p className="font-sans text-sm">
                No related posts yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
