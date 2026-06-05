// Task 4: retained only the remaining shared content in the assets data index after splitting stories, skills, and projects.
const services = [
  {
    title: "Brand Identity & Visual Design",
    description:
      "Elevate your brand with bespoke visual identities, UI/UX, and motion graphics. I craft logos, websites, and marketing materials that blend aesthetics with purposeâ€”ensuring your brand communicates clearly and stands out in a crowded market.",
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
      "Streamline your workflow with agile coaching and scrum mastery. I help teams adopt proven agile methodologies to boost collaboration, increase efficiency, and deliver projects on timeâ€”without the chaos.",
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
      comment: "If it's unfair to anyone involved, Iâ€™m not interested.",
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
        "Especially the ones that make people say 'Why didnâ€™t I think of that?'",
    },
    {
      strong: "Long-Term Partnerships",
      comment: "Letâ€™s build something epic together!",
    },
    {
      strong: "Community or Cultural Projects",
      comment: "Celebrating creativity is always a win.",
    },
  ],
};

export { conditions, services };
