import Link from "next/link";

const projects = [
  {
    title: "Habit Analytics",
    description: "A browser-based activity log with timestamps, tags, notes, date filtering, search, a session timer, and JSON backup/import.",
    href: "/habitAnalytics",
    cta: "Open app",
    details: "The app stores its records in browser local storage rather than a remote account. This keeps the current version simple and user-controlled, but records can be lost if browser data is cleared. Export a JSON backup regularly.",
    technologies: "React, TypeScript, browser local storage",
  },
  {
    title: "Résumé",
    description: "A web version of my résumé, with education, technical skills, and professional profile links.",
    href: "/resume",
    cta: "View résumé",
    details: "This page provides a concise overview of my software engineering studies, tools, and public professional profiles.",
    technologies: "Next.js, React, CSS",
  },
];

export const metadata = {
  title: "Projects",
  description: "Working software projects by Camilo Valencia, including Habit Analytics and a web résumé.",
};

export default function ProjectsPage() {
  return (
    <div className="page-wrap">
      <header className="page-header">
        <span className="page-kicker">Selected work</span>
        <h1 className="page-title">Projects and experiments</h1>
        <p className="muted mt-4 max-w-3xl">
          I build small web tools to explore practical problems in personal information management, interface design, and software engineering. These projects are actively evolving, so the descriptions below explain the current scope and important limitations rather than promising features that are not yet implemented.
        </p>
      </header>

      <section aria-label="Project descriptions" className="space-y-6">
        {projects.map((project, index) => (
          <article key={project.href} className="panel p-6 sm:p-8">
            <p className="page-kicker">PROJECT {String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-3 text-2xl font-semibold">{project.title}</h2>
            <p className="muted mt-3">{project.description}</p>
            <h3 className="mt-5 font-semibold">How it works</h3>
            <p className="muted mt-2">{project.details}</p>
            <p className="muted mt-3"><strong>Technologies:</strong> {project.technologies}</p>
            <Link className="primary-link mt-5 inline-block" href={project.href}>{project.cta} →</Link>
          </article>
        ))}
      </section>

      <section className="panel mt-8 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">What I am learning</h2>
        <p className="muted mt-3">
          I am developing skills in JavaScript and TypeScript, React, Next.js, source control with Git, and deploying web applications. Building projects helps me practice breaking a problem into smaller parts, validating input, handling browser state, making interfaces usable on different screen sizes, and explaining technical trade-offs clearly.
        </p>
        <p className="muted mt-3">
          I use project feedback and real testing to identify gaps. Features described as future ideas are not considered available until they are implemented and tested.
        </p>
      </section>
    </div>
  );
}
