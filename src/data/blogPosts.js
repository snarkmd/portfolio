import aiClinicalWorkflowsGuardrails from "../content/blog/ai-clinical-workflows-guardrails.md?raw";
import clinicalThinkingForDebuggers from "../content/blog/clinical-thinking-for-debuggers.md?raw";
import fhirForFrontendDevelopers from "../content/blog/fhir-for-frontend-developers.md?raw";
import frontendPatternsForMedicalTools from "../content/blog/frontend-patterns-for-medical-tools.md?raw";
import observabilityLessonsFromVitalSigns from "../content/blog/observability-lessons-from-vital-signs.md?raw";

const blogPostEntries = [
  {
    slug: "clinical-thinking-for-debuggers",
    title: "Clinical Thinking for Debuggers",
    category: "Healthcare x Dev",
    type: "Article",
    date: "2026-05-18",
    readTime: "7 min read",
    status: "Published",
    summary:
      "How clinical reasoning maps surprisingly well to debugging complex software systems.",
    tags: ["clinical reasoning", "debugging", "systems", "diagnosis"],
    markdown: clinicalThinkingForDebuggers,
  },
  {
    slug: "frontend-patterns-for-medical-tools",
    title: "Frontend Patterns for Medical Tools",
    category: "Medical Tech",
    type: "Tutorial",
    date: "2026-04-27",
    readTime: "9 min read",
    status: "Published",
    summary:
      "Practical interface logic for forms, review states, audit trails, and high-stakes user flows.",
    tags: ["frontend", "forms", "safety", "audit trails"],
    markdown: frontendPatternsForMedicalTools,
  },
  {
    slug: "fhir-for-frontend-developers",
    title: "FHIR for Frontend Developers",
    category: "Tutorials",
    type: "Guide",
    date: "2026-03-12",
    readTime: "8 min read",
    status: "Published",
    summary:
      "A practical first pass at reading healthcare resources without getting lost in the specification.",
    tags: ["FHIR", "APIs", "health data", "interoperability"],
    markdown: fhirForFrontendDevelopers,
  },
  {
    slug: "observability-lessons-from-vital-signs",
    title: "Observability Lessons from Vital Signs",
    category: "Engineering",
    type: "Article",
    date: "2026-02-08",
    readTime: "6 min read",
    status: "Published",
    summary:
      "Vitals, logs, metrics, and traces all tell partial stories. The value is in how you combine them.",
    tags: ["observability", "logs", "metrics", "medicine"],
    markdown: observabilityLessonsFromVitalSigns,
  },
  {
    slug: "ai-clinical-workflows-guardrails",
    title: "AI in Clinical Workflows: Guardrails First",
    category: "AI + Health",
    type: "Field note",
    date: "2026-01-19",
    readTime: "5 min read",
    status: "Draft",
    summary:
      "Where AI can help clinicians, where it can harm, and why workflow boundaries matter.",
    tags: ["AI", "clinical workflow", "risk", "governance"],
    markdown: aiClinicalWorkflowsGuardrails,
  },
];

export const blogPosts = [...blogPostEntries].sort(
  (firstPost, secondPost) => new Date(secondPost.date) - new Date(firstPost.date)
);

export const blogCategories = ["All", ...new Set(blogPosts.map((post) => post.category))];

export const blogTags = [
  "All",
  ...new Set(blogPosts.flatMap((post) => post.tags).sort((a, b) => a.localeCompare(b))),
];
