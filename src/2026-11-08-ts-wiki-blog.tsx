import type { BlogMeta } from "./data.tsx";

export const meta: BlogMeta = {
  id: "ts-wiki-website",
  title: "Turning Server Knowledge into a Wiki",
  description:
    "How the TheySix wiki project is organizing farms, tutorials, images, and source information into a maintainable website.",
  createdAt: "2026-10-24",
};

export default function Content() {
  return (
    <>
      <p>
        A server wiki usually starts as a collection of useful links and notes.
        After a while, that collection becomes difficult to navigate and even
        harder to keep accurate. The <b>ts-website-wiki</b> project is my
        attempt to give TheySix a proper home for that knowledge.
      </p>
      <p>
        The project is designed around structured content rather than putting
        every fact directly inside a page. Farm entries have fields for their
        edition, Minecraft version, category, description, tags, thumbnails,
        downloads, tutorials, and verification status. Wiki articles follow a
        similar model, with headings, lists, code, tables, images, videos, and
        callouts.
      </p>
      <p>
        This structure matters because the website contains more than text. A
        download needs to point to a real local file. An image must belong to
        the right farm. A checksum should match the file that is actually being
        served. The rebuild notes and content contracts make these rules
        explicit instead of leaving them as assumptions.
      </p>
      <p>
        I am building the new version with Next.js, React, TypeScript, and
        Tailwind. The technical stack is familiar, but the more interesting
        part is the content pipeline: preserve the information, normalize it,
        verify it, and then give it a better interface. A good wiki should feel
        simple to use even when the work needed to keep it trustworthy is not
        simple at all.
      </p>
    </>
  );
}
