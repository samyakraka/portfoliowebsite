"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FooterLinks, Header } from "./components/SiteChrome";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  certifications,
  education,
  experience,
  featured,
  otherProjects,
  product,
  profile,
  recognition,
  searchSuggestions,
  skills,
  wins,
  type Project,
} from "./data";
import { Hi, matches, QueryProvider, toTerms, useTerms } from "./components/Search";
import { useTheme } from "./contexts/ThemeContext";
import type { Vec } from "./components/EmbeddingSpace";

const EmbeddingSpace = dynamic(() => import("./components/EmbeddingSpace"), {
  ssr: false,
  loading: () => null,
});

const projectText = (p: Project) =>
  [p.title, p.kind, p.summary, p.detail, p.tech.join(" "), p.tags].join(" ");

const roleText = (r: (typeof experience)[number]) =>
  [
    r.company,
    r.title,
    r.points.join(" "),
    r.tech.join(" "),
    r.earlier?.title,
    r.earlier?.points.join(" "),
  ].join(" ");

// Every item on the page becomes one point in the hero figure.
const vectors: Vec[] = [
  ...[...featured, ...otherProjects].map((p) => ({
    id: `p-${p.title}`,
    label: p.title,
    cluster: "Projects",
    text: projectText(p),
  })),
  ...experience.map((r) => ({
    id: `r-${r.company}`,
    label: r.company,
    cluster: "Experience",
    text: roleText(r),
  })),
  {
    id: "expenseek",
    label: product.name,
    cluster: "Experience",
    text: [product.name, product.summary, product.tags].join(" "),
  },
  ...[...wins, ...recognition].map((w) => ({
    id: `w-${w.title}`,
    label: w.title,
    cluster: "Hackathons",
    text: ["hackathon", w.title, w.detail, w.tags].join(" "),
  })),
  ...skills.flatMap((g) =>
    g.items.map((s) => ({
      id: `s-${s}`,
      label: s,
      cluster: g.group === "Also" ? "Foundations" : g.group,
      text: s,
    })),
  ),
];

function useClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

function Links({ live, code, name }: { live?: string; code?: string; name: string }) {
  if (!live && !code) return null;
  return (
    <div className="links">
      {live && (
        <a href={live} target="_blank" rel="noopener noreferrer" aria-label={`${name} live site`}>
          Live site
        </a>
      )}
      {code && (
        <a href={code} target="_blank" rel="noopener noreferrer" aria-label={`${name} source code`}>
          Source
        </a>
      )}
    </div>
  );
}

function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="wrap section" aria-labelledby={`${id}-title`}>
      <div className="section__head">
        <h2 id={`${id}-title`} className="section__title">
          {title}
        </h2>
        {note && <p className="section__note">{note}</p>}
      </div>
      <div>{children}</div>
    </section>
  );
}

function Work() {
  const terms = useTerms();
  return (
    <Section id="work" title="Selected work" note="What each project does, and what it's built with.">
      <div className="work">
        {featured.map((p) => (
          <article key={p.title} className="work__item" data-dim={!matches(terms, projectText(p))}>
            <p className="work__kind">
              <Hi>{p.kind}</Hi>
            </p>
            <h3>
              <Hi>{p.title}</Hi>
            </h3>
            <p className="work__summary">
              <Hi>{p.summary}</Hi>
            </p>
            <p className="work__detail">
              <Hi>{p.detail}</Hi>
            </p>
            <ul className="tech" aria-label="Built with">
              {p.tech.map((t) => (
                <li key={t}>
                  <Hi>{t}</Hi>
                </li>
              ))}
            </ul>
            <Links live={p.live} code={p.code} name={p.title} />
          </article>
        ))}
      </div>

      <div className="more">
        <h3>Earlier builds</h3>
        <ul className="more__list">
          {otherProjects.map((p) => (
            <li key={p.title} className="more__row" data-dim={!matches(terms, projectText(p))}>
              <span className="more__title">
                <Hi>{p.title}</Hi>
              </span>
              <span className="more__summary">
                <Hi>{p.summary}</Hi> <Hi>{`(${p.tech.join(", ")})`}</Hi>
              </span>
              <Links live={p.live} code={p.code} name={p.title} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Experience() {
  const terms = useTerms();
  return (
    <Section id="experience" title="Experience">
      <div className="roles">
        {experience.map((r) => (
          <article key={r.company} className="role" data-dim={!matches(terms, roleText(r))}>
            <p className="role__when">
              {r.tenure ?? r.period}
              <br />
              {r.place}
            </p>
            <div>
              <h3>
                <Hi>{r.company}</Hi>
              </h3>
              <p className="role__title">
                <Hi>{r.title}</Hi>
                {r.tenure && <span className="role__period">{`, ${r.period}, full time`}</span>}
              </p>
              <ul className="points">
                {r.points.map((pt) => (
                  <li key={pt}>
                    <Hi>{pt}</Hi>
                  </li>
                ))}
              </ul>
              {r.earlier && (
                <div className="role__earlier">
                  <p>
                    <strong>
                      <Hi>{r.earlier.title}</Hi>
                    </strong>
                    <span className="role__period">{`, ${r.earlier.period}`}</span>
                  </p>
                  <ul className="points">
                    {r.earlier.points.map((pt) => (
                      <li key={pt}>
                        <Hi>{pt}</Hi>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <ul className="tech" aria-label="Worked with">
                {r.tech.map((t) => (
                  <li key={t}>
                    <Hi>{t}</Hi>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Product() {
  const terms = useTerms();
  return (
    <Section id="product" title="My own app" note="Built, shipped and maintained on my own, outside work.">
      <article
        className="product"
        data-dim={!matches(terms, product.name, product.summary, product.features.join(" "), product.tags)}
      >
        <div className="product__head">
          <Image src={product.icon} alt="" width={64} height={64} className="product__icon" />
          <div>
            <h3>
              <Hi>{product.name}</Hi>
            </h3>
            <p className="product__role">{product.role}</p>
          </div>
        </div>
        <p className="product__summary">
          <Hi>{product.summary}</Hi>
        </p>
        <ul className="product__features">
          {product.features.map((f) => (
            <li key={f}>
              <Hi>{f}</Hi>
            </li>
          ))}
        </ul>
        <dl className="product__stats">
          {product.stats.map((st) => (
            <div key={st.label}>
              <dt>{st.label}</dt>
              <dd>{st.value}</dd>
            </div>
          ))}
        </dl>
        <a className="btn btn--solid" href={product.url} target="_blank" rel="noopener noreferrer">
          Get it on Google Play
        </a>
      </article>
    </Section>
  );
}

function Recognition() {
  const terms = useTerms();
  return (
    <Section
      id="recognition"
      title="Hackathons"
      note="Four wins and two Smart India Hackathon finals as team lead."
    >
      <p className="wins__caption" id="wins-caption">
        First place
      </p>
      <ul className="wins" aria-labelledby="wins-caption">
        {wins.map((w) => (
          <li
            key={w.title}
            className="win"
            data-dim={!matches(terms, "winner hackathon win", w.title, w.detail, w.tags)}
          >
            <h3>
              <Hi>{w.title}</Hi>
            </h3>
            <p className="win__where">
              <Hi>{w.detail}</Hi>
            </p>
          </li>
        ))}
      </ul>
      <ul className="record">
        {recognition.map((r) => (
          <li key={r.title} data-dim={!matches(terms, "hackathon", r.title, r.detail, r.tags)}>
            <h3>
              <Hi>{r.title}</Hi>
            </h3>
            <p>
              <Hi>{r.detail}</Hi>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Skills() {
  const terms = useTerms();
  return (
    <Section id="skills" title="Toolkit">
      <div className="skills">
        {skills.map((g) => (
          <div key={g.group} className="skills__row">
            <h3 className="skills__group">{g.group}</h3>
            <ul className="skills__items">
              {g.items.map((s) => (
                <li key={s} data-dim={terms.length > 0 && !matches(terms, s, g.group)}>
                  <Hi>{s}</Hi>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" title="Education">
      {education.map((e) => (
        <div key={e.school} className="edu">
          <h3>{e.degree}</h3>
          <p>{e.school}</p>
          <p>
            {e.period}, {e.note}
          </p>
        </div>
      ))}
      <ul className="certs" aria-label="Certifications">
        {certifications.map((c) => (
          <li key={c.title}>
            <Hi>{c.title}</Hi>
            <span>
              {c.issuer}, {c.date}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const terms = useMemo(() => toTerms(deferred), [deferred]);

  const counts = useMemo(() => {
    if (terms.length === 0) return null;
    const projects = [...featured, ...otherProjects].filter((p) => matches(terms, projectText(p))).length;
    const roles = experience.filter((r) => matches(terms, roleText(r))).length;
    const skillHits = skills.flatMap((g) => g.items.filter((s) => matches(terms, s, g.group))).length;
    return { projects, roles, skillHits };
  }, [terms]);

  const active = query.trim().toLowerCase();
  const hitCount = useMemo(() => vectors.filter((v) => matches(terms, v.text)).length, [terms]);
  const { theme } = useTheme();
  const clock = useClock();

  return (
    <QueryProvider value={terms}>
      <a href="#work" className="skip">
        Skip to work
      </a>
      <Header />

      <main id="top">
        <section className="wrap hero" aria-label="Introduction">
          <div className="hero__grid">
            <div className="hero__text">
              <div className="hero__id rise" style={{ "--i": 0 } as React.CSSProperties}>
                <p>
                  {profile.role}
                  <br />
                  <span>at {profile.company}</span>
                </p>
              </div>
              <h1 className="hero__name">
                <span className="rise" style={{ "--i": 1 } as React.CSSProperties}>
                  Samyak
                </span>
                <span className="rise" style={{ "--i": 2 } as React.CSSProperties}>
                  Raka
                </span>
              </h1>
              <div className="rise" style={{ "--i": 3 } as React.CSSProperties}>
                <p className="hero__tagline">{profile.tagline}</p>
                <p className="hero__intro">{profile.intro}</p>
                <div className="hero__actions">
                  <a className="btn btn--solid" href={`mailto:${profile.email}`}>
                    Email me
                  </a>
                  <a
                    className="btn btn--ghost"
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download resume
                  </a>
                </div>
                <dl className="hero__facts">
                  <div>
                    <dt>Now</dt>
                    <dd>AI systems at Crowdera, full time</dd>
                  </div>
                  <div>
                    <dt>Record</dt>
                    <dd>4 hackathon wins, 2× Smart India Hackathon finalist</dd>
                  </div>
                  <div>
                    <dt>Studied</dt>
                    <dd>B.Tech Computer Engineering, 2026, CGPA 8.71</dd>
                  </div>
                  <div>
                    <dt>Based in</dt>
                    <dd>
                      {profile.location}
                      {clock && <span className="hero__clock">, {clock} local time</span>}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <figure className="fig rise" style={{ "--i": 4 } as React.CSSProperties}>
              <div className="fig__top" aria-hidden="true">
                <span>Fig. 1</span>
                <span>
                  {terms.length > 0
                    ? `${hitCount} of ${vectors.length} retrieved`
                    : `${vectors.length} vectors`}
                </span>
              </div>
              <div
                className="fig__canvas"
                role="img"
                aria-label="A rotating 3D map of every project, role, hackathon and skill on this page, grouped by topic. Searching highlights the matching points."
              >
                <EmbeddingSpace points={vectors} terms={terms} dark={theme === "dark"} />
              </div>

              <div className="finder" role="search">
                <label htmlFor="finder" className="finder__label">
                  Search my work
                </label>
                <div className="finder__field">
                  <Search size={20} aria-hidden="true" />
                  <input
                    id="finder"
                    className="finder__input"
                    type="search"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Try RAG or Next.js"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button type="button" className="finder__clear" onClick={() => setQuery("")}>
                      Clear
                    </button>
                  )}
                </div>
                <div className="finder__chips" aria-label="Suggested searches">
                  {searchSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="chip"
                      aria-pressed={active === s.toLowerCase()}
                      onClick={() => setQuery(active === s.toLowerCase() ? "" : s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="finder__result" aria-live="polite">
                  {counts ? (
                    counts.projects + counts.roles + counts.skillHits === 0 ? (
                      <>Nothing matches “{deferred.trim()}”. Try a broader word, like AI or Python.</>
                    ) : (
                      <>
                        {plural(counts.projects, "project")}, {plural(counts.roles, "role")} and{" "}
                        {plural(counts.skillHits, "tool")} match.{" "}
                        <a href={counts.projects ? "#work" : counts.roles ? "#experience" : "#skills"}>
                          Jump to the first one
                        </a>
                      </>
                    )
                  ) : (
                    <>Each point is a project, role or skill from this page. Drag to turn it.</>
                  )}
                </p>
              </div>
            </figure>
          </div>
        </section>

        <Work />
        <Experience />
        <Product />
        <Recognition />
        <Skills />
        <Education />
      </main>

      <footer id="contact" className="wrap contact">
        <p className="contact__ask">
          Hiring for AI or full-stack work, or building something with LLMs? Write to me.
        </p>
        <a className="contact__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact__actions">
          <Link className="btn btn--solid" href="/contact">
            Write me a message
          </Link>
        </div>
        <FooterLinks />
      </footer>
    </QueryProvider>
  );
}
