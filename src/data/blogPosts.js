import { BLOG_CATEGORIES, BLOG_TAGS } from "./blogTaxonomy";

const rawBlogPostModules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const REQUIRED_FIELDS = [
  "title",
  "category",
  "type",
  "date",
  "readTime",
  "status",
  "summary",
  "tags",
];

const getSlugFromPath = (filePath) =>
  filePath
    .split("/")
    .pop()
    .replace(/\.md$/, "");

const parseFrontmatter = (rawMarkdown) => {
  const match = rawMarkdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { metadata: {}, markdown: rawMarkdown.trim() };
  }

  const [, frontmatter, markdown] = match;
  const metadata = {};
  let activeListKey = null;

  frontmatter.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;

    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (activeListKey && listItem) {
      metadata[activeListKey].push(listItem[1].trim());
      return;
    }

    const field = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (!field) return;

    const [, key, value] = field;
    if (value === "") {
      metadata[key] = [];
      activeListKey = key;
      return;
    }

    metadata[key] = value.trim();
    activeListKey = null;
  });

  return { metadata, markdown: markdown.trim() };
};

const validatePostMetadata = (post) => {
  if (!import.meta.env.DEV) return;

  const missingFields = REQUIRED_FIELDS.filter((field) => {
    if (field === "tags") return !Array.isArray(post.tags) || post.tags.length === 0;
    return !post[field];
  });
  const invalidTags = post.tags.filter((tag) => !BLOG_TAGS.includes(tag));
  const warnings = [
    ...missingFields.map((field) => `missing ${field}`),
    ...(!BLOG_CATEGORIES.includes(post.category)
      ? [`unknown category "${post.category}"`]
      : []),
    ...invalidTags.map((tag) => `unknown tag "${tag}"`),
  ];

  if (warnings.length > 0) {
    console.warn(`[blogPosts] ${post.slug}: ${warnings.join(", ")}`);
  }
};

export const blogPosts = Object.entries(rawBlogPostModules)
  .map(([filePath, rawMarkdown]) => {
    const { metadata, markdown } = parseFrontmatter(rawMarkdown);
    const post = {
      ...metadata,
      slug: getSlugFromPath(filePath),
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      markdown,
    };

    validatePostMetadata(post);
    return post;
  })
  .sort((firstPost, secondPost) => new Date(secondPost.date) - new Date(firstPost.date));

export const blogCategories = ["All", ...BLOG_CATEGORIES];

export const blogTags = ["All", ...BLOG_TAGS];
