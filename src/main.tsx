import {
  Fragment,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import {
  experience,
  profile,
  type Blog,
  type BlogMeta,
  projects,
  stack,
  type Project,
  type StackItem,
} from "./data";
import "./styles.css";
import "./project-view.css";
import "./experience.css";
import "./themes.css";
import "./help.css";
import "./neofetch.css";
import "./responsive.css";
import "./blog.css";

type Entry = { command: string; output: React.ReactNode };
const commands = [
  "about",
  "projects",
  "project",
  "experience",
  "blog",
  "stack",
  "theme",
  "contact",
  "donate",
  "github",
  "date",
  "pwd",
  "ls",
  "neofetch",
  "help",
  "docs",
  "clear",
  "gui",
];

function Prompt({ command }: { command: string }) {
  return (
    <div className="prompt" aria-label={`Command: ${command}`}>
      <div>
        ╭─{" "}
        <a href="/" className="prompt-host no-underline">
          {profile.hostname}
        </a>{" "}
        <span className="muted">~</span>
      </div>
      <div>
        ╰─ <span aria-hidden="true">❯ </span>
        <strong>{command}</strong>
      </div>
    </div>
  );
}

function ProjectList({ one }: { one?: Project }) {
  const displayed = one ? [one] : projects;
  return (
    <section className="project-output" aria-label="Selected projects">
      <p className="path">~/projects</p>
      {displayed.map((project, index) => (
        <article className="project" key={project.name}>
          <p>
            <span className="tree">
              {index === displayed.length - 1 ? "└──" : "├──"}
            </span>{" "}
            <a
              className="project-name"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              {project.name}/
            </a>
          </p>
          <div className="project-details">
            <p>
              <span className="muted">status:</span>{" "}
              <span className="success">● {project.status}</span>
            </p>
            <p>
              <span className="muted">link:</span>{" "}
              <a href={project.url} target="_blank" rel="noreferrer">
                {project.label}
              </a>
            </p>
            <p>
              <span className="muted">description:</span> {project.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}

function About() {
  return (
    <section>
      <h1>Mihai</h1>
      <p className="lead">
        I build things for the web, from a terminal-shaped corner of the
        internet.
      </p>
      <dl className="identity">
        <dt>hobby</dt>
        <dd>developer / builder / gamer</dd>
        <dt>home</dt>
        <dd>
          <a href="/" className="no-underline">
            {profile.hostname}
          </a>
        </dd>
        <dt>currently</dt>
        <dd>shipping experiments and useful tools</dd>
        <dt>location</dt>
        <dd>Romania</dd>
      </dl>
    </section>
  );
}
function StackLinks({ items }: { items: StackItem[] }) {
  return (
    <span className="stack-links">
      {items.map((item, index) => (
        <span key={item.name}>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.name}
          </a>
          {index < items.length - 1 && (
            <span className="muted" aria-hidden="true">
              {" "}
              ·{" "}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
function Stack() {
  const stackGroups = [
    { label: "frontend", items: stack.frontend },
    { label: "backend", items: stack.backend },
    { label: "database", items: stack.database },
    { label: "api", items: stack.api },
    { label: "languages", items: stack.languages },
    { label: "tools", items: stack.tools },
    { label: "OS", items: stack.operatingSystems },
  ];

  return (
    <section>
      <p className="path">~/stack</p>
      <dl className="identity stack-output">
        {stackGroups.map(({ label, items }) => (
          <Fragment key={label}>
            <dt>{label}</dt>
            <dd>
              <StackLinks items={items} />
            </dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}

function ExperienceOutput() {
  return (
    <section aria-label="Discord staff experience">
      <p className="path">~/experience</p>
      <p className="muted">Discord staff roles</p>
      <div className="experience-list">
        {experience.map((item, index) => (
          <article className="experience-item" key={item.url}>
            <p>
              <span className="tree">
                {index === experience.length - 1 ? "└──" : "├──"}
              </span>{" "}
              {item.role} ·{" "}
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.community}
              </a>
            </p>
            <p className="experience-members">
              <span className="muted">community size:</span> {item.members}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const themes = [
  {
    id: "pink",
    name: "Pink",
    description: "The original pink-mauve terminal theme.",
  },
  {
    id: "blurple",
    name: "Blurple",
    description: "A Discord-inspired purple and blue palette.",
  },
  {
    id: "quartz",
    name: "Quartz",
    description: "A pale violet palette with cool slate accents.",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "A quiet indigo terminal after dark.",
  },
  {
    id: "forest",
    name: "Forest",
    description: "A deep green terminal inspired by the canopy.",
  },
] as const;

type ThemeId = (typeof themes)[number]["id"];

function ThemeOutput({
  activeTheme,
  onThemeChange,
}: {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}) {
  return (
    <section aria-label="Theme picker">
      <p className="path">~/theme</p>
      <p className="muted">Choose a terminal palette:</p>
      <div className="theme-picker">
        {themes.map((theme) => {
          const active = theme.id === activeTheme;
          return (
            <button
              key={theme.id}
              className={`theme-option ${active ? "is-active" : ""}`}
              type="button"
              aria-pressed={active}
              onClick={() => onThemeChange(theme.id)}
            >
              <span className="theme-option-name">{theme.name}</span>
              <span className="theme-option-description">{theme.description}</span>
              {active && <span className="theme-current">selected</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section>
      <p className="path">~/projects</p>
      <p>Which project would you like to view?</p>
      <p className="muted">Usage: project &lt;name&gt;</p>
      <p>Available projects: `bc`, `pbinfo`, `bot`</p>
    </section>
  );
}

function Contact() {
  return (
    <section>
      <p className="path">~/contact</p>
      <dl className="identity">
        <dt>email</dt>
        <dd>
          <a href="mailto:portofolio@ro-mihaiu.xyz">
            portofolio@ro-mihaiu.xyz
          </a>
        </dd>
        <dt>github</dt>
        <dd>
          <a href={profile.github} target="_blank" rel="noreferrer">
            /ro-mihaiu
          </a>
        </dd>
        <dt>instagram</dt>
        <dd>
          <a href={profile.instagram} target="_blank" rel="noreferrer">
            @ro_mihaiu
          </a>
        </dd>
        <dt>discord</dt>
        <dd>
          <a href={profile.discord} target="_blank" rel="noreferrer">
            @ro_mihaiu
          </a>
        </dd>
      </dl>
    </section>
  );
}

function Themes() {
  return (
    <section>
      <p className="path">~/theme</p>
      <p>Which theme would you like to set?</p>
      <p className="muted">Usage: theme &lt;theme_name&gt;</p>
      <p>Available themes: `pink`, `blurple`, `quartz`, `midnight`, `forest`</p>
    </section>
  );
}

function Help() {
  const commandGroups = [
    {
      category: "portfolio",
      commands: [
        ["about / whoami", "show a short introduction"],
        ["projects", "open selected work in a full terminal view"],
        ["project <name>", "inspect bc, pbinfo, or bot"],
        ["experience", "view Discord staff experience"],
        ["stack", "view stack by frontend, backend, database, and API"],
        ["contact", "open social contact links"],
        ["donate", "open the Ko-fi support page"],
        ["github", "open the GitHub profile"],
        ["docs", "view legal documents (e.g., 'docs tos')"],
      ],
    },
    {
      category: "workspace",
      commands: [
        ["theme", "choose and save a terminal palette"],
        ["neofetch", "show the portfolio system card"],
        ["ls", "list portfolio directories"],
        ["pwd", "show the current terminal path"],
        ["date", "print the local date and time"],
      ],
    },
    {
      category: "terminal",
      commands: [
        ["help", "show this command reference"],
        ["clear", "clear terminal output"],
        ["↑ / ↓", "navigate command history"],
        ["tab", "complete a command"],
        ["ctrl/cmd + k", "focus the command input"],
      ],
    },
  ] as const;

  return (
    <section>
      <p>available commands:</p>
      <div className="command-reference">
        {commandGroups.map((group) => (
          <section className="command-group" key={group.category}>
            <p className="command-category">{group.category}</p>
            <div
              className="command-table"
              role="table"
              aria-label={`${group.category} commands`}
            >
              {group.commands.map(([command, description]) => (
                <div className="command-row" role="row" key={command}>
                  <code role="cell">{command}</code>
                  <span className="muted" role="cell">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
function NeoFetch({ theme }: { theme: ThemeId }) {
  const themeName = themes.find((item) => item.id === theme)?.name ?? "Pink";

  return (
    <section className="neofetch" aria-label="Portfolio system information">
      <pre className="neofetch-logo">{`        .--.
       |o_o |
       |:_/ |
      //   \\
     (|     | )
    /'\\_   _/\\
    \\___)=(___/`}</pre>
      <dl className="neofetch-info">
        <dt>host</dt>
        <dd>
          <a href="/" className="no-underline">
            {profile.hostname}
          </a>
        </dd>
        <dt>OS</dt>
        <dd>portfolio linux</dd>
        <dt>shell</dt>
        <dd>portfolio-shell</dd>
        <dt>theme</dt>
        <dd>{themeName}</dd>
      </dl>
    </section>
  );
}

function NotFound({ command }: { command: string }) {
  return (
    <p className="error">
      command not found: {command}
      <br />
      <span className="muted">type 'help' to list available commands</span>
    </p>
  );
}

function TermsOfService() {
  return (
    <section>
      <p className="path">~/docs/tos</p>
      <p className="lead">Terms of Service</p>
      <p>This is a personal developer portfolio showcasing work and experience.</p>
      <p>All content is provided as-is. By accessing this site, you agree to use it for lawful purposes only.</p>
      <p>Links to external sites are provided for reference. I am not responsible for external content.</p>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <section>
      <p className="path">~/docs/privacy</p>
      <p className="lead">Privacy Policy</p>
      <p>This site uses Vercel Analytics to collect anonymous usage data.</p>
      <p>No personal information is stored or tracked. Your privacy is respected.</p>
    </section>
  );
}

function CookiesPolicy() {
  return (
    <section>
      <p className="path">~/docs/cookies</p>
      <p className="lead">Cookies Policy</p>
      <p>This site does not use cookies for tracking purposes.</p>
      <p>The only `localStorage` item used is `portfolio-theme` to save your theme preference.</p>
    </section>
  );
}

function Docs() {
  return (
    <section>
      <p className="path">~/docs</p>
      <p>Which document would you like to view?</p>
      <p className="muted">Usage: docs &lt;document&gt;</p>
      <p>Available documents: `tos`, `privacy`, `cookies`</p>
    </section>
  );
}

function BlogList({ blogs }: { blogs: Blog[] }) {
  const visibleBlogs = blogs.filter((blog) => !blog.hidden);

  return (
    <section>
      <p className="path">~/blog</p>
      {visibleBlogs.length > 0 ? (
        <>
          <p>Available posts:</p>
          <div className="blog-list">
            {visibleBlogs.map((blog) => (
              <div key={blog.id} className="blog-list-item">
                <a
                  href={`/blog?id=${blog.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    // This assumes `run` is available in scope, which it isn't.
                    // A better approach would be to pass `run` down or use a context.
                    // For now, this is a placeholder for command execution.
                    (window as any).runCommand(`blog ${blog.id}`);
                  }}
                >
                  {blog.title}
                </a>
                <p className="muted">{blog.description}</p>
                <p className="muted">
                  <small>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </small>
                </p>
                <p className="blog-id">
                  <span className="tree">╰─</span>
                  <span className="muted"> id: </span>
                  <span className="accent">{blog.id}</span>
                </p>
              </div>
            ))}
          </div>
          <p className="muted">Usage: blog &lt;id&gt;</p>
        </>
      ) : (
        <p>No blog posts yet. Stay tuned!</p>
      )}
    </section>
  );
}

function BlogPost({ blog }: { blog: Blog }) {
  return (
    <section className="blog-post">
      <p className="path">~/blog/{blog.id}</p>
      <h1>{blog.title}</h1>
      <p className="muted">
        Published on {blog.createdAt}
        {blog.updatedAt && ` (Updated on ${blog.updatedAt})`}
      </p>
      <div className="blog-content">{blog.content}</div>
    </section>
  );
}

const pageRoutes = [
  "about",
  "projects",
  "experience",
  "stack",
  "contact",
  "docs",
  "blog",
  "donate",
] as const;

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const runRef = useRef<
    (raw: string, routeMode?: "hash" | "path" | "none", fresh?: boolean) => void
  >(() => {});
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [position, setPosition] = useState(-1);
  const [projectView, setProjectView] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [bootMessages, setBootMessages] = useState<number>(0);
  const [bootKey, setBootKey] = useState(0);
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "pink";
    const savedTheme = localStorage.getItem("portfolio-theme");
    return themes.some((item) => item.id === savedTheme)
      ? (savedTheme as ThemeId)
      : "pink";
  });
  const [entries, setEntries] = useState<Entry[]>([]);
  const changeTheme = (nextTheme: ThemeId) => {
    setTheme(nextTheme);
    setEntries((current) =>
      current.map((entry) =>
        entry.command === "theme"
          ? {
              command: "theme",
              output: (
                <ThemeOutput
                  activeTheme={nextTheme}
                  onThemeChange={changeTheme}
                />
              ),
            }
          : entry.command === "neofetch"
            ? { command: "neofetch", output: <NeoFetch theme={nextTheme} /> }
          : entry,
      ),
    );
  };

  const run = async (
    raw: string,
    routeMode: "hash" | "path" | "none" = "hash",
    fresh: boolean = false,
  ) => {
    const [name, ...args] = raw.trim().toLowerCase().split(/\s+/);
    if (!name) return;
    if (name === "clear") {
      setEntries([]);
      setProjectView(false);
      setInput("");
      return;
    }

    const applyRoute = (target: string) => {
      const normalized = target.toLowerCase();
      if (!pageRoutes.includes(normalized as (typeof pageRoutes)[number])) return;

      if (routeMode === "path") {
        const nextPath = `/${normalized}`;
        if (window.location.pathname !== nextPath) {
          window.history.pushState({}, "", nextPath);
        }
      } else if (routeMode === "hash") {
        const nextHash = `#${normalized}`;
        if (window.location.hash !== nextHash) {
          window.location.hash = normalized;
        }
      }
    };

    let output: React.ReactNode;
    if (name === "whoami" || name === "about") {
      output = <About />;
      applyRoute("about");
    } else if (name === "projects") {
      if (args[0]) {
        const project = projects.find((p) => p.name === args[0]);
        output = project ? <ProjectList one={project} /> : <Projects />;
      } else {
        output = <Projects />;
      }
      applyRoute("projects");
    } else if (name === "experience") {
      output = <ExperienceOutput />;
      applyRoute("experience");
    } else if (name === "theme") {
      const newTheme = themes.find((t) => t.id === args[0]);
      if (newTheme) changeTheme(newTheme.id);
      output = newTheme ? <p>Theme set to {newTheme.name}</p> : <Themes />;
    } else if (name === "project") {
      const project = projects.find((p) => p.name === args[0]);
      output = project ? (
        <ProjectList one={project} />
      ) : (
        <p className="error">
          project not found: {args[0] || "(choose bc, pbinfo, or bot)"}
        </p>
      );
    } else if (name === "stack") {
      output = <Stack />;
      applyRoute("stack");
    } else if (name === "blog") {
      const loadedBlogs = await blogsPromiseRef.current;
      const blog = loadedBlogs.find((b) => b.id === args[0]);
      if (blog) {
        output = <BlogPost blog={blog} />;
      } else {
        output = <BlogList blogs={loadedBlogs} />;
      }
      applyRoute("blog");
    } else if (name === "contact") {
      output = <Contact />;
      applyRoute("contact");
    } else if (name === "docs") {
      if (args[0] === "tos") {
        output = <TermsOfService />;
      } else if (args[0] === "privacy") {
        output = <PrivacyPolicy />;
      } else if (args[0] === "cookies") {
        output = <CookiesPolicy />;
      } else {
        output = <Docs />;
      }
      applyRoute("docs");
    } else if (name === "donate") {
      window.open(profile.koFi, "_blank", "noopener,noreferrer");
      output = <p className="success">opening Ko-fi donation page</p>;
      applyRoute("donate");
    } else if (name === "github") {
      window.open(profile.github, "_blank", "noopener,noreferrer");
      output = <p className="success">opening github</p>;
    } else if (name === "date") output = <p>{new Date().toString()}</p>;
    else if (name === "pwd") output = <p>/home/mihu/portfolio</p>;
    else if (name === "ls")
      output = (
        <p>about/ &nbsp; projects/ &nbsp; experience/ &nbsp; stack/ &nbsp; contact/</p>
      );
    else if (name === "neofetch") output = <NeoFetch theme={theme} />;
    else if (name === "help" || name === "gui") output = <Help />;
    else output = <NotFound command={name} />;

    setProjectView(false);
    if (fresh) {
      setCurrentPage(name);
      setBootMessages(0);
      setBootKey((key) => key + 1);
      setEntries([{ command: raw, output }]);
      setHistory([raw]);
    } else {
      setCurrentPage(null);
      setEntries((current) => [...current, { command: raw, output }]);
      setHistory((current) => [...current, raw]);
    }
    setPosition(-1);
    setInput("");
  };

  const blogsPromiseRef = useRef<Promise<Blog[]>>(Promise.resolve([]));

  useEffect(() => {
    runRef.current = run;
    (window as any).runCommand = run;
  });

  useEffect(() => {
    const fetchBlogs = () =>
      new Promise<Blog[]>(async (resolve) => {
      const blogModules = import.meta.glob<{
        meta: BlogMeta;
        default: React.ComponentType;
      }>("/src/*-blog.tsx");

      const blogPromises = Object.entries(blogModules).map(
        async ([path, loader]) => {
          if (path.includes("/template.tsx")) {
            return null;
          }
          const module = await loader();
          return {
            ...module.meta,
            content: <module.default />,
          };
        },
      );
      const loadedBlogs = (await Promise.all(blogPromises)).filter(Boolean) as Blog[];
      // Sort blogs by creation date, newest first
      loadedBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      resolve(loadedBlogs);
    });

    blogsPromiseRef.current = fetchBlogs();
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!currentPage) return;

    const timer1 = setTimeout(() => setBootMessages(1), 200);
    const timer2 = setTimeout(() => setBootMessages(2), 500);
    const timer3 = setTimeout(() => setBootMessages(3), 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [currentPage, bootKey]);

  useEffect(() => {
    const handlePopState = async () => {
      const routePage = window.location.pathname.replace(/^\/+|\/+$/g, "");
      if (pageRoutes.includes(routePage as (typeof pageRoutes)[number])) {
        await runRef.current(routePage, "none", true);
      } else if (routePage) {
        runRef.current(routePage, "none", true);
      } else {
        setCurrentPage(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleInitialRoute = async () => {
      const routePage = window.location.pathname.replace(/^\/+|\/+$/g, "");
      const hashPage = window.location.hash.replace(/^#/, "");

      if (pageRoutes.includes(routePage as (typeof pageRoutes)[number])) {
        await run(routePage, "none", true);
      } else if (
        hashPage &&
        pageRoutes.includes(hashPage as (typeof pageRoutes)[number])
      ) {
        await run(hashPage, "none", false);
      }

      if (!routePage && !hashPage && entries.length === 0) {
        await run("whoami", "none", false);
        await run("help", "none", false);
      }
    };
    handleInitialRoute();

    const handleHashChange = async () => {
      const newHashPage = window.location.hash.replace(/^#/, "");
      if (pageRoutes.includes(newHashPage as (typeof pageRoutes)[number])) {
        await run(newHashPage, "none", false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const focus = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focus);
    return () => window.removeEventListener("keydown", focus);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await run(input);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(position + 1, history.length - 1);
      setPosition(next);
      setInput(history[history.length - 1 - next] || "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(position - 1, -1);
      setPosition(next);
      setInput(next === -1 ? "" : history[history.length - 1 - next]);
    }
    if (e.key === "Tab") {
      const match = commands.find((command) =>
        command.startsWith(input.toLowerCase()),
      );
      if (match) {
        e.preventDefault();
        setInput(match);
      }
    }
  };

  return (
    <main
      className={`terminal-shell ${projectView ? "project-view" : ""}`}
      aria-label="Mihai's developer portfolio"
    >
      <Analytics />
      <header className="chrome">
        <div className="window-controls" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>portfolio@{profile.hostname}</span>
        <span className="status" title="This site is online and operational.">
          online
        </span>
      </header>
      <div className="terminal" id="terminal-content">
        {!projectView && (
          <>
            <nav aria-label="Portfolio navigation">
              <span className="nav-label">navigate:</span>
              {[
                "about",
                "projects",
                "experience",
                "stack",
                "contact",
                "blog",
                "docs",
                "donate",
              ].map((command) => (
                <a
                  key={command}
                  href={`/${command}`}
                  onClick={(event) => {
                    event.preventDefault();
                    run(command, "path", true);
                  }}
                >
                  [ {command} ]
                </a>
              ))}
              <a href={profile.github} target="_blank" rel="noreferrer">
                [ github ]
              </a>
            </nav>
            <div className="boot" aria-label="Portfolio initialized">
              {bootMessages >= 1 && (
                <span>
                  [ <b>ok</b> ] initializing portfolio
                </span>
              )}
              {bootMessages >= 2 && (
                <span>
                  [ <b>ok</b> ] indexing selected work
                </span>
              )}
              {bootMessages >= 3 && (
                <span>
                  [ <b>ok</b> ] establishing connection
                </span>
              )}
            </div>
          </>
        )}
        <div className="output" aria-live="polite">
          {entries.map((entry, index) => (
            <div className="entry" key={`${entry.command}-${index}`}>
              <Prompt command={entry.command} />
              {entry.output}
            </div>
          ))}
        </div>
        <form className="input-line" onSubmit={submit}>
          <label htmlFor="terminal-input" className="sr-only">
            Enter a terminal command
          </label>
          <span>╰─ ❯</span>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            spellCheck="false"
            placeholder="type 'help' for commands"
          />
          <span className="cursor" aria-hidden="true" />
        </form>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);