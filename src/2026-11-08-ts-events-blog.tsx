import type { BlogMeta } from "./data.tsx";

export const meta: BlogMeta = {
  id: "ts-events-website",
  title: "A New Home for TheySix Events",
  description:
    "Building a focused information site for the TheySix Events Minecraft server.",
  createdAt: "2026-10-05",
};

export default function Content() {
  return (
    <>
      <p>
        The TheySix network has more than one thing worth explaining, so I
        started a separate website for <b>TheySix Events</b>. The goal is not
        to turn it into a complicated platform. It is a focused place where a
        player can understand the server, browse its games and arenas, check
        the ranks, and find the information needed before joining.
      </p>
      <p>
        The site is built with Next.js, React, TypeScript, and Tailwind. The
        server facts live in a small data layer instead of being scattered
        through page components. That makes the content easier to audit and
        reduces the chance of showing a different server address or command on
        different pages.
      </p>
      <p>
        One part I paid extra attention to is the live server status. The site
        checks the Minecraft server on the server side, caches the result, and
        distinguishes between <i>online</i>, <i>offline</i>, and
        <i> unknown</i>. A timeout should not be presented as proof that the
        server is offline, and an old player count should not look live.
      </p>
      <p>
        I also added verification scripts for the game roster, arenas, ranks,
        and the status client. This may seem like a lot for a website, but
        these tables are important: one typo can send players to the wrong
        command. Having checks for the boring details lets me spend more time
        on the visual identity and the actual experience of the site.
      </p>
    </>
  );
}
