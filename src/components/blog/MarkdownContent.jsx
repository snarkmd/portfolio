const splitInlineMarkdown = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (!part) return null;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="border border-dark/20 bg-light-100 px-1 py-0.5 font-mono text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={`${part}-${index}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-dark/40 underline-offset-4 hover:decoration-dark"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
};

const isBlockStart = (line) =>
  line.startsWith("# ") ||
  line.startsWith("## ") ||
  line.startsWith("### ") ||
  line.startsWith("- ") ||
  /^\d+\.\s/.test(line);

const parseMarkdown = (markdown) => {
  const lines = markdown.trim().split("\n");
  const blocks = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) continue;

    if (line.startsWith("# ")) {
      blocks.push({
        type: "h1",
        content: line.replace("# ", ""),
      });
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({
        type: "h2",
        content: line.replace("## ", ""),
      });
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({
        type: "h3",
        content: line.replace("### ", ""),
      });
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];

      while (lines[index]?.trim().startsWith("- ")) {
        items.push(lines[index].trim().replace("- ", ""));
        index += 1;
      }

      index -= 1;
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [];

      while (/^\d+\.\s/.test(lines[index]?.trim() || "")) {
        items.push(lines[index].trim().replace(/^\d+\.\s/, ""));
        index += 1;
      }

      index -= 1;
      blocks.push({ type: "ol", items });
      continue;
    }

    const paragraph = [line];

    while (lines[index + 1]?.trim() && !isBlockStart(lines[index + 1].trim())) {
      paragraph.push(lines[index + 1].trim());
      index += 1;
    }

    blocks.push({ type: "p", content: paragraph.join(" ") });
  }

  return blocks;
};

const MarkdownContent = ({ markdown, skipFirstHeading = false }) => {
  const blocks = parseMarkdown(markdown);
  const visibleBlocks =
    skipFirstHeading && blocks[0]?.type === "h1" ? blocks.slice(1) : blocks;

  return (
    <div className="space-y-5">
      {visibleBlocks.map((block, index) => {
        if (block.type === "h1") {
          return (
            <h1
              key={`${block.type}-${index}`}
              className="font-serif text-4xl md:text-6xl leading-tight"
            >
              {splitInlineMarkdown(block.content)}
            </h1>
          );
        }

        if (block.type === "h2") {
          return (
            <h2
              key={`${block.type}-${index}`}
              className="pt-6 font-serif text-3xl md:text-4xl leading-tight"
            >
              {splitInlineMarkdown(block.content)}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              key={`${block.type}-${index}`}
              className="pt-3 font-mono text-sm uppercase tracking-wide"
            >
              {splitInlineMarkdown(block.content)}
            </h3>
          );
        }

        if (block.type === "ul") {
          return (
            <ul
              key={`${block.type}-${index}`}
              className="space-y-2 border-l-2 border-dark pl-5"
            >
              {block.items.map((item) => (
                <li
                  key={item}
                  className="font-sans text-base md:text-lg leading-relaxed"
                >
                  {splitInlineMarkdown(item)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ol") {
          return (
            <ol
              key={`${block.type}-${index}`}
              className="space-y-2 border-l-2 border-dark pl-5"
            >
              {block.items.map((item, itemIndex) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] gap-3 font-sans text-base md:text-lg leading-relaxed"
                >
                  <span className="font-mono text-xs pt-1">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <span>{splitInlineMarkdown(item)}</span>
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p
            key={`${block.type}-${index}`}
            className="font-sans text-base md:text-lg leading-relaxed"
          >
            {splitInlineMarkdown(block.content)}
          </p>
        );
      })}
    </div>
  );
};

export default MarkdownContent;
