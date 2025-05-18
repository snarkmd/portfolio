const stories = [
  {
    thumbnail: "./img/stories/med_cover.png",
    stories: [
      { src: "./img/stories/med_cover.png", type: "image", duration: 5000 },
      { src: "./img/stories/med_01.png", type: "image", duration: 5000 },
      { src: "./img/stories/med_02.png", type: "image", duration: 5000 }, 
      { src: "./img/stories/med_03.png", type: "image", duration: 5000 },
    ],
  },
    {
      thumbnail: "./img/str1.jpg",
      stories: [
        { src: "./img/str1.jpg", type: "image", duration: 5000 },
        { src: "./img/str2.jpg", type: "image", duration: 5000 },
        { src: "./img/str2.jpg", type: "image", duration: 5000 },
      ],
    },
    {
      thumbnail: "./img/str1.jpg",
      stories: [
        { src: "./img/str1.jpg", type: "image", duration: 5000 },
        { src: "./img/str2.jpg", type: "image", duration: 5000 },
        { src: "./img/str2.jpg", type: "image", duration: 5000 },
      ],
    },
    {
      thumbnail: "./img/str1.jpg",
      stories: [
        { src: "./img/str1.jpg", type: "image", duration: 5000 },
        { src: "./img/str2.jpg", type: "image", duration: 5000 },
        { src: "./img/str2.jpg", type: "image", duration: 5000 },
      ],
    },
    {
      thumbnail: "./img/str1.jpg",
      stories: [
        { src: "./img/str1.jpg", type: "image", duration: 5000 },
        { src: "./img/str2.jpg", type: "image", duration: 5000 },
        { src: "./img/str2.jpg", type: "image", duration: 5000 },
      ],
    },
];

const skills = [
  {
    title: "Visual Design",
    headline: "Designing, branding & making things look good.",
    description:
      "I create visual identities, UI/UX, and motion graphics. My work blends aesthetics with function—no random pretty pictures, just clean, purposeful design.",
    certified: false, // Experience-based
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
      "I don’t just drive traffic—I make sure it actually converts. I handle SEO, content strategy, and ads with a data-driven approach.",
    certified: true, // Certified
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
    certified: true, // Certified
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
      "I craft seamless digital experiences by merging intuitive design with high-performance code. From wireframes to scalable web apps, I ensure interfaces aren’t just beautiful—they’re functional, accessible, and built to last.",
    certified: false, // Experience-based
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
      "I teach tech, design, and freelancing—practical, no fluff. Blogs and workshops that stick.",
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

const services = [
  {
    title: "Brand Identity & Visual Design",
    description:
      "Elevate your brand with bespoke visual identities, UI/UX, and motion graphics. I craft logos, websites, and marketing materials that blend aesthetics with purpose—ensuring your brand communicates clearly and stands out in a crowded market.",
    engagementType: "Project-based",
    contractType: "Fixed-price",
    mission: "Build lasting brand experiences that resonate.",
  },
  {
    title: "Digital Marketing & SEO Optimization",
    description:
      "Boost your online presence with a data-driven approach to SEO, content strategy, and digital advertising. I develop comprehensive campaigns that drive high-quality traffic and convert visitors into loyal customers.",
    engagementType: "Retainer",
    contractType: "Monthly retainer",
    mission: "Accelerate digital growth and measurable ROI.",
  },
  {
    title: "Agile Coaching & Project Management",
    description:
      "Streamline your workflow with agile coaching and scrum mastery. I help teams adopt proven agile methodologies to boost collaboration, increase efficiency, and deliver projects on time—without the chaos.",
    engagementType: "Consulting",
    contractType: "Hourly or project-based",
    mission: "Empower teams to achieve more through agile transformation.",
  },
  {
    title: "Full-Stack UI Engineering & Custom Development",
    description:
      "Transform ideas into seamless digital experiences with custom full-stack development. I build responsive, accessible web apps that marry innovative design with robust code, ensuring both functionality and beauty.",
    engagementType: "Project-based",
    contractType: "Fixed-price",
    mission: "Deliver exceptional user experiences from concept to launch.",
  },
  {
    title: "Medical & Educational Content Solutions",
    description:
      "Merge clinical expertise with engaging educational content. I create research-driven training modules, data analysis reports, and comprehensive medical content that inform professionals and educators alike.",
    engagementType: "Consulting",
    contractType: "Project-based or retainer",
    mission:
      "Inform and inspire the healthcare and education sectors with clarity and precision.",
  },
  {
    title: "STEAM Workshops & Freelance Blogging",
    description:
      "Ignite curiosity with interactive STEAM workshops and insightful freelance blogs. I deliver practical, no-fluff sessions and content that demystify technology, design, and creative freelancing for learners and professionals.",
    engagementType: "Freelance",
    contractType: "One-off or series",
    mission:
      "Empower learners and creatives through accessible knowledge and engaging storytelling.",
  },
];

const projects = [
  {
    brand: "Cocoonara",
    description: "A Mental Health-Driven Hoodie Brand for the Empowered Generation",
    work: "Branding, Product Design",
    gif: "/img/cocoonara_01.png",
    link: "https://www.behance.net/gallery/225825541/Cocoonara-A-Mental-Health-Driven-Hoodie-Brand",
  },
  {
    brand: "HackTheBox",
    description: "architectural Hackthon",
    work: "Branding , Leadership, Web Dev",
    gif: "/img/hackthebox_01.png",
    link: "https://www.behance.net/gallery/216865929/HackTheBox-Hackathon",
  },
  {
    brand: "Hadiyati",
    description: "a serverless platform for creating personalized gift boxes",
    work: "Web Developer",
    gif: "/img/hadiyati_01.png",
    link: "https://www.behance.net/gallery/175820909/Hadiyati-Bridging-Hearts-Across-Borders",
  },
  {
    brand: "Raeeq Pos",
    description: "a weekly book discussion group",
    work: "Electron, React, Nodejs",
    gif: "/img/raeeq_01.png",
    link: "https://www.behance.net/gallery/216862071/Raeeq-Fragrance-Oils-Management-POS-System",
  },
  {
    brand: "Solead",
    description:
      "a consulting agency specializing in teambuilding and communication workshops.",
    work: "Rebrending",
    gif: "/img/solead_01.png",
    link: "https://www.behance.net/gallery/174997477/solead-agency-rebranding",
  },
  {
    brand: "Maison Musulman",
    description:
      "elegant subscription box start-up",
    work: "Brending",
    gif: "/img/maison_01.png",
    link: "#",
  },
  {
    brand: "Garnet finds",
    description:
      "jewerly store",
    work: "Brending",
    gif: "/img/garnet_01.png",
    link: "#",
  },
  {
    brand: "Mon Petit Riad",
    description:
      "store",
    work: "Brending",
    gif: "/img/mon_petit_riad_01.png",
    link: "#",
  },
  {
    brand: "land of knowledge",
    description: "a weekly book discussion group",
    work: "Branding",
    gif: "/img/ardhma3rifa_01.png",
    link: "https://www.behance.net/gallery/216862071/Raeeq-Fragrance-Oils-Management-POS-System",
  },
];

const conditions = {
  dont: [
    {
      strong: "Unrealistic Expectations & Last-Minute Panics",
      comment: "I dont do magic tricks :').",
    },
    {
      strong: "Political or Religious Agendas",
      comment:
        "I respect all views, but I'm here for creativity, not controversies.",
    },
    {
      strong: "Gambling or Get-Rich-Quick Schemes",
      comment: "If it's too good to be true, it's probably not for me.",
    },
    {
      strong: "Micromanagement",
      comment: "Let's collaborate, not babysit.",
    },
    {
      strong: "Exploitation or Unfair Practices",
      comment: "If it's unfair to anyone involved, I’m not interested.",
    },
  ],
  do: [
    {
      strong: "Purpose-Driven Projects",
      comment: "If it makes a difference, count me in!",
    },
    {
      strong: "Nonprofit and Social Impact Initiatives",
      comment: "Let's change the world :').",
    },
    {
      strong: "Creative Collaborations",
      comment: "Two (or more) brains are better than one.",
    },
    {
      strong: "Innovative Ideas",
      comment:
        "Especially the ones that make people say 'Why didn’t I think of that?'",
    },
    {
      strong: "Long-Term Partnerships",
      comment: "Let’s build something epic together!",
    },
    {
      strong: "Community or Cultural Projects",
      comment: "Celebrating creativity is always a win.",
    },
  ],
};

export { stories, skills, services, projects, conditions };
