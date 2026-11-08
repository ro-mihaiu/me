import { Fragment } from "react";

export type Project = {
  name: string;
  description: string;
  url: string;
  label: string;
  status: string;
};

export type StackItem = {
  name: string;
  url: string;
};

export type Experience = {
  role: string;
  community: string;
  url: string;
  members: string;
};

export type BlogMeta = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  hidden?: boolean;
};

export type Blog = BlogMeta & { content: React.ReactNode };

// Keep personal information and project destinations together for easy updates.
export const profile = {
  name: "Mihai",
  github: "https://github.com/ro-mihaiu",
  portfolio: "https://ro-mihaiu.xyz/",
  hostname: "ro-mihaiu.xyz",
  instagram: "https://instagram.ro-mihaiu.xyz",
  discord: "https://discord.ro-mihaiu.xyz",
  koFi: "https://ko-fi.com/ro_mihaiu",
};

export const stack = {
  frontend: [
    { name: "React", url: "https://react.dev/" },
    { name: "Vite", url: "https://vite.dev/" },
    { name: "HTML", url: "https://html.spec.whatwg.org/" },
    { name: "CSS", url: "https://www.w3.org/Style/CSS/" },
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/docs/Web/JavaScript",
    },
    { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  ],
  backend: [
    { name: "Node.js", url: "https://nodejs.org/" },
    { name: "Express", url: "https://expressjs.com/" },
    { name: "Python", url: "https://www.python.org/" },
    { name: "FastAPI", url: "https://fastapi.tiangolo.com/" },
    { name: "Rust", url: "https://www.rust-lang.org/" },
  ],
  database: [
    { name: "PostgreSQL", url: "https://www.postgresql.org/" },
    { name: "SQLite", url: "https://www.sqlite.org/" },
    { name: "MongoDB", url: "https://www.mongodb.com/" },
  ],
  api: [
    { name: "REST", url: "https://restfulapi.net/" },
    {
      name: "Discord API",
      url: "https://discord.com/developers/docs/intro",
    },
    { name: "GitHub API", url: "https://docs.github.com/en/rest" },
  ],
  languages: [
    { name: "C++", url: "https://isocpp.org/" },
    { name: "Lua", url: "https://www.lua.org/" },
    { name: "Python", url: "https://www.python.org/" },
    { name: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
    { name: "TypeScript", url: "https://www.typescriptlang.org/" },
    { name: "Rust", url: "https://www.rust-lang.org/" },
  ],
  tools: [
    { name: "GitHub", url: "https://github.com/" },
    { name: "Vercel", url: "https://vercel.com/" },
    { name: "Discord", url: "https://discord.com/" },
    { name: "VS Code", url: "https://code.visualstudio.com/" },
  ],
  operatingSystems: [
    { name: "Arch", url: "https://archlinux.org/" },
    { name: "CachyOS", url: "https://cachyos.org/" },
    { name: "Windows", url: "https://www.microsoft.com/windows" },
  ],
} satisfies Record<string, StackItem[]>;

export const experience: Experience[] = [
  {
    role: "Manager & Dev",
    community: "TheySix",
    url: "https://theysix.tech/",
    members: "117k+",
  },
  {
    role: "Admin",
    community: "PocketHost",
    url: "https://pockethost.online/",
    members: "1,8k+",
  },
];

export const projects: Project[] = [
  {
    name: "bc",
    description: "A website displaying builds & services inside BlossomCraft.",
    url: "https://bc.ro-mihaiu.xyz",
    label: "bc.ro-mihaiu.xyz",
    status: "live",
  },
  {
    name: "pbinfo",
    description: "A website for C++ codes from PbInfo.",
    url: "https://pbinfo.ro-mihaiu.xyz",
    label: "pbinfo.ro-mihaiu.xyz",
    status: "live",
  },
  {
    name: "bot",
    description: "My custom bot managing my services & items in BlossomCraft.",
    url: "https://bot.ro-mihaiu.xyz",
    label: "bot.ro-mihaiu.xyz",
    status: "live",
  },
  {
    name: "calendar",
    description: "A school timetable and cleaning rotation dashboard.",
    url: "https://github.com/ro-mihaiu/calendar",
    label: "github.com/ro-mihaiu/calendar",
    status: "source",
  },
  {
    name: "ts-server",
    description: "Versioned configuration and operations for the TheySix server.",
    url: "https://github.com/ro-mihaiu/ts-server",
    label: "github.com/ro-mihaiu/ts-server",
    status: "source",
  },
  {
    name: "ts-website-events",
    description: "The information website for TheySix Events.",
    url: "https://github.com/ro-mihaiu/ts-website-events",
    label: "github.com/ro-mihaiu/ts-website-events",
    status: "source",
  },
  {
    name: "ts-website-wiki",
    description: "A structured wiki for TheySix farms and guides.",
    url: "https://github.com/ro-mihaiu/ts-website-wiki",
    label: "github.com/ro-mihaiu/ts-website-wiki",
    status: "source",
  },
];
