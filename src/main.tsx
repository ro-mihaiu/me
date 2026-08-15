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

type Entry = { command: string; output: React.ReactNode };
const commands = [
  "about",
  "projects",
  "project",
  "experience",
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
  "clear",
  "gui",
];

function Prompt({ command }: { command: string }) {
  return (
    <div className="prompt" aria-label={`Command: ${command}`}>
      <div>
        ╭─ <span className="prompt-host">{profile.hostname}</span>{" "}
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
              <span className="muted">description:</span> {project.description}
            </p>
            <p>
              <span className="muted">status:</span>{" "}
              <span className="success">● {project.status}</span>
            </p>
            <p>
              <span className="muted">open:</span>{" "}
              <a href={project.url} target="_blank" rel="noreferrer">
                {project.label}
              </a>
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
        <dt>identity</dt>
        <dd>developer / builder / gamer</dd>
        <dt>home</dt>
        <dd>{profile.hostname}</dd>
        <dt>currently</dt>
        <dd>shipping experiments and useful tools</dd>
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

function Contact() {
  return (
    <section>
      <p className="path">~/contact</p>
      <dl className="identity">
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
        <dd>{profile.hostname}</dd>
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

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [position, setPosition] = useState(-1);
  const [projectView, setProjectView] = useState(false);
  const [theme, setTheme] = useState<ThemeId>(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return themes.some((item) => item.id === savedTheme)
      ? (savedTheme as ThemeId)
      : "pink";
  });
  const [entries, setEntries] = useState<Entry[]>([
    { command: "whoami", output: <About /> },
    { command: "help", output: <Help /> },
  ]);

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

  const run = (raw: string) => {
    const [name, ...args] = raw.trim().toLowerCase().split(/\s+/);
    if (!name) return;
    if (name === "clear") {
      setEntries([]);
      setProjectView(false);
      setInput("");
      return;
    }
    let output: React.ReactNode;
    if (name === "whoami" || name === "about") output = <About />;
    else if (name === "projects") {
      setEntries([{ command: "projects", output: <ProjectList /> }]);
      setProjectView(true);
      setHistory((current) => [...current, raw]);
      setPosition(-1);
      setInput("");
      return;
    } else if (name === "experience") output = <ExperienceOutput />;
    else if (name === "theme") {
      output = <ThemeOutput activeTheme={theme} onThemeChange={changeTheme} />;
    }
    else if (name === "project") {
      const project = projects.find((p) => p.name === args[0]);
      output = project ? (
        <ProjectList one={project} />
      ) : (
        <p className="error">
          project not found: {args[0] || "(choose bc, pbinfo, or bot)"}
        </p>
      );
    } else if (name === "stack") output = <Stack />;
    else if (name === "contact") output = <Contact />;
    else if (name === "donate") {
      window.open(profile.koFi, "_blank", "noopener,noreferrer");
      output = <p className="success">opening Ko-fi donation page</p>;
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
    else
      output = (
        <p className="error">
          command not found: {name}
          <br />
          <span className="muted">type 'help' to list available commands</span>
        </p>
      );
    setProjectView(false);
    setEntries((current) => [...current, { command: raw, output }]);
    setHistory((current) => [...current, raw]);
    setPosition(-1);
    setInput("");
  };
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);
  useEffect(() => {
    const command = location.hash.slice(1);
    if (commands.includes(command) && command !== "clear") run(command);
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
  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(input);
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
        <span>portfolio — {profile.hostname}</span>
        <span className="status">online</span>
      </header>
      <div className="terminal" id="terminal-content">
        {!projectView && (
          <>
            <nav aria-label="Portfolio navigation">
              <span className="nav-label">navigate:</span>
              {["about", "projects", "experience", "stack", "contact", "donate"].map(
                (command) => (
                  <button
                    key={command}
                    type="button"
                    onClick={() => {
                      location.hash = command;
                      run(command);
                    }}
                  >
                    [ {command} ]
                  </button>
                ),
              )}
              <a href={profile.github} target="_blank" rel="noreferrer">
                [ github ]
              </a>
            </nav>
            <div className="boot" aria-label="Portfolio initialized">
              <span>
                [ <b>ok</b> ] initializing portfolio
              </span>
              <span>
                [ <b>ok</b> ] indexing selected work
              </span>
              <span>
                [ <b>ok</b> ] establishing connection
              </span>
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
