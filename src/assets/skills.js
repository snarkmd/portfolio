// Task 4: split skills-specific content into a focused skills module.
const skills = [
  {
    title: "Visual Design",
    headline: "Designing, branding & making things look good.",
    description:
      "I create visual identities, UI/UX, and motion graphics. My work blends aesthetics with functionâ€”no random pretty pictures, just clean, purposeful design.",
    certified: false,
    microSkills: ["Motion Design", "UI/UX", "Graphic Design"],
    tools: [
      { name: "Illustrator", icon: "/icons/illustrator.svg" },
      { name: "Photoshop", icon: "/icons/photoshop.svg" },
      { name: "Figma", icon: "/icons/figma.svg" },
      { name: "InDesign", icon: "/icons/id.svg" },
      { name: "After Effects", icon: "/icons/ae.svg" },
    ],
    layout: "bg-red md:col-span-3 md:row-span-1 order-3 md:order-1",
    dark: true,
  },
  {
    title: "Digital Marketing",
    headline: "Making brands visible & converting traffic.",
    description:
      "I donâ€™t just drive trafficâ€”I make sure it actually converts. I handle SEO, content strategy, and ads with a data-driven approach.",
    certified: true,
    microSkills: ["Story telling", "SM Growth", "SEO"],
    tools: [
      { name: "Google Analytics", icon: "/icons/analytics.svg" },
      { name: "Ahrefs", icon: "/icons/ahrefs.svg" },
      { name: "Meta Ads", icon: "/icons/meta.svg" },
      { name: "SEMrush", icon: "/icons/semrush.svg" },
    ],
    layout: "bg-light-200 md:col-span-3 md:row-span-1 order-3",
    dark: false,
  },
  {
    title: "Agile",
    headline: "Scrum master",
    description: "Keeping projects on track, minus the chaos.",
    certified: true,
    microSkills: ["Team Leadership"],
    tools: [
      { name: "Jira", icon: "/icons/jira.svg" },
      { name: "Notion", icon: "/icons/notion.svg" },
      { name: "Trello", icon: "/icons/trello.svg" },
    ],
    layout:
      "bg-transparent border-2 border-dark text-light-100 md:col-span-1 md:row-span-1 order-3",
    dark: false,
  },
  {
    title: "web Dev&inger",
    headline: "Bridging design and development with logic and code.",
    description:
      "I craft seamless digital experiences by merging intuitive design with high-performance code. From wireframes to scalable web apps, I ensure interfaces arenâ€™t just beautifulâ€”theyâ€™re functional, accessible, and built to last.",
    certified: false,
    microSkills: ["Responsive Design", "Wireframing", "JamStack", "Web Dev"],
    tools: [
      { name: "React", icon: "/icons/reactjs.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Sass", icon: "/icons/sass.svg" },
      { name: "GraphQL", icon: "/icons/graphql.svg" },
      { name: "Adobe XD", icon: "/icons/xd.svg" },
      { name: "Framer", icon: "/icons/framer.svg" },
      { name: "Miro", icon: "/icons/miro.svg" },
    ],
    layout: "bg-berry md:col-span-2 md:row-span-2 order-3",
    dark: true,
  },
  {
    title: "Medical Expertise",
    headline: "Doctor, researcher, educator.",
    description:
      "I blend clinical expertise with research to keep doctors informed and engaged.",
    certified: true,
    microSkills: ["Clinical Research", "Data Analysis", "Training"],
    tools: [
      { name: "Microsoft Teams", icon: "/icons/teams.svg" },
      { name: "Google Workspace", icon: "/icons/google.svg" },
      { name: "LMS", icon: "/icons/figma.svg" },
    ],
    layout: "bg-green md:col-span-2 md:row-span-1 order-3",
    dark: false,
  },
  {
    title: "Content creation",
    headline: "Learning that clicks.",
    description:
      "I teach tech, design, and freelancingâ€”practical, no fluff. Blogs and workshops that stick.",
    certified: true,
    microSkills: ["Workshops", "Guidance"],
    tools: [
      { name: "Notion", icon: "/icons/notion.svg" },
      { name: "WordPress", icon: "/icons/wordpress.svg" },
      { name: "Markdown", icon: "/icons/markdown.svg" },
      { name: "Slidev", icon: "/icons/slidev.svg" },
    ],
    layout: "bg-light-200 md:col-span-2 md:row-span-1 order-3",
    dark: false,
  },
];

export { skills };
