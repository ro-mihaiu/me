import type { BlogMeta } from "./data.tsx";

export const meta: BlogMeta = {
  id: "ts-server",
  title: "Managing a Minecraft Server as a Codebase",
  description:
    "Why I started keeping the TheySix server configuration, updates, and recovery material in one repository.",
  createdAt: "2026-10-31",
};

export default function Content() {
  return (
    <>
      <p>
        A Minecraft server can look like it is only a game, but keeping one
        running becomes a proper systems project surprisingly quickly. There
        are permissions, worlds, plugins, server properties, player data,
        updates, backups, and a lot of small decisions that are easy to forget
        when they only live on a machine.
      </p>
      <p>
        That is why I created the <b>ts-server</b> repository for the TheySix
        server. It keeps the configuration and operational files together,
        alongside documentation for permissions, the file tree, remote sync,
        and the changes made over time. The repository is becoming the place I
        can look when I need to understand what the server is supposed to be
        doing.
      </p>
      <p>
        The updates folder is especially useful. Instead of relying on memory,
        I can record changes like a rebrand, a crash recovery, MOTD fixes, or
        new Discord components. That makes troubleshooting less mysterious and
        gives future changes some context.
      </p>
      <p>
        I am also treating backups and recovery files carefully. A server
        repository is not just about storing more files; it needs a clear line
        between configuration, generated data, and archived state. This project
        is still evolving, but the main idea is already helping: infrastructure
        is easier to maintain when it is documented and versioned instead of
        being an invisible folder on a server.
      </p>
    </>
  );
}
