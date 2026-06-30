import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageTransition } from "../../components/PageTransition";
import { RevealHeading, FadeIn } from "../../components/RevealText";
import { projects, type ProjectRecord, type ProjectGalleryImage } from "../../data/projects";

const ease = [0.16, 1, 0.3, 1] as const;

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    const project = loaderData as ProjectRecord | undefined;
    const title = project
      ? `${project.title} — East Africa Internet Group`
      : "Project — East Africa Internet Group";
    const description =
      project?.summary ?? `${project?.tag ?? "Selected work"} — East Africa Internet Group.`;
    const image =
      project?.sitePhoto?.src ?? "https://eastafricainternetgroup.com/android-chrome-512x512.png";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
      ],
      links: project
        ? [
            {
              rel: "canonical",
              href: `https://eastafricainternetgroup.com/projects/${project.slug}`,
            },
          ]
        : [],
    };
  },
  component: ProjectDetail,
});

function BackLink() {
  return (
    <Link
      to="/projects"
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] opacity-70 transition-opacity hover:opacity-100"
      data-cursor="Back"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      All Projects
    </Link>
  );
}

function Gallery({ heading, images }: { heading: string; images: ProjectGalleryImage[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] opacity-60">{heading}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <motion.figure
            key={img.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="aspect-[4/3] w-full object-contain bg-white p-4"
            />
            <figcaption className="border-t border-[color:var(--border)] px-4 py-3 text-xs opacity-70">
              {img.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail() {
  const project = Route.useLoaderData();

  if (!project.specs || !project.floorPlans) {
    return <ThinProjectDetail project={project} />;
  }

  return (
    <PageTransition>
      <section className="relative isolate overflow-hidden surface-dark">
        {project.sitePhoto && (
          <img
            src={project.sitePhoto.src}
            alt={project.sitePhoto.alt}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:var(--navy-ink)]/70 via-[color:var(--navy-ink)]/55 to-[color:var(--navy-ink)]" />

        <div className="relative z-10 mx-auto max-w-[1300px] px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
          <FadeIn>
            <BackLink />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-6">
            <span className="text-xs uppercase tracking-[0.35em] opacity-70">{project.tag}</span>
          </FadeIn>
          <RevealHeading
            as="h1"
            className="mt-6 max-w-[18ch] font-display text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            {project.title}
          </RevealHeading>
          {project.location && (
            <FadeIn delay={0.35} className="mt-6 text-sm uppercase tracking-[0.2em] opacity-70">
              {project.location}
            </FadeIn>
          )}
          {project.summary && (
            <FadeIn
              delay={0.5}
              className="mt-6 max-w-xl text-base leading-relaxed opacity-80 md:text-lg"
            >
              {project.summary}
            </FadeIn>
          )}
        </div>
      </section>

      <section className="relative px-6 py-20 md:px-10">
        <div className="mx-auto max-w-[1300px] space-y-20">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] opacity-60">Specifications</p>
            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-2">
              {project.specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  className="bg-[color:var(--card)] px-6 py-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">{spec.label}</p>
                  <p className="mt-1.5 font-display text-base font-medium md:text-lg">
                    {spec.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <Gallery heading="Floor Plan & Layout" images={project.floorPlans} />

          {project.inspiration && project.inspiration.length > 0 && (
            <Gallery heading="Design Inspiration" images={project.inspiration} />
          )}

          {project.sitePhoto && (
            <div>
              <p className="text-xs uppercase tracking-[0.25em] opacity-60">On Site</p>
              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease }}
                className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--border)]"
              >
                <img
                  src={project.sitePhoto.src}
                  alt={project.sitePhoto.alt}
                  className="aspect-[16/9] w-full object-cover"
                />
                <figcaption className="bg-[color:var(--card)] px-6 py-4 text-sm opacity-70">
                  {project.sitePhoto.caption}
                </figcaption>
              </motion.figure>
            </div>
          )}

          {project.cta && (
            <FadeIn
              delay={0.1}
              className="flex flex-col items-start gap-6 rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-10 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-display text-2xl font-medium md:text-3xl">
                  {project.cta.label}
                </h3>
                <p className="mt-2 max-w-md text-sm opacity-70">
                  Tell us about your site and timeline — we'll help you scope the right unit.
                </p>
              </div>
              <Link
                to={project.cta.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-flow px-6 py-3 text-xs font-medium uppercase tracking-widest text-[color:var(--navy-ink)] transition-transform duration-500 hover:scale-[1.03]"
                data-cursor="Talk"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </FadeIn>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

function ThinProjectDetail({ project }: { project: ProjectRecord }) {
  return (
    <PageTransition>
      <section className="relative isolate overflow-hidden surface-dark">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "linear-gradient(135deg, #0A2E4D, #1B6CA8 60%, #29B6E8)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--navy-ink)]/40 to-[color:var(--navy-ink)]" />

        <div className="relative z-10 mx-auto max-w-[1300px] px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-48">
          <FadeIn>
            <BackLink />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-6">
            <span className="text-xs uppercase tracking-[0.35em] opacity-70">{project.tag}</span>
          </FadeIn>
          <RevealHeading
            as="h1"
            className="mt-6 max-w-[20ch] font-display text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            {project.title}
          </RevealHeading>
          <FadeIn delay={0.4} className="mt-6 text-sm uppercase tracking-[0.2em] opacity-70">
            {project.year}
          </FadeIn>
          <FadeIn delay={0.55} className="mt-8 max-w-md text-base leading-relaxed opacity-80">
            Full case study coming soon.
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
