import type { BlogMeta } from "./data.tsx";

export const meta: BlogMeta = {
  id: "how-to-blog",
  title: "How to Create a Blog Post",
  description: "A guide for adding and formatting blog posts.",
  createdAt: "2023-10-27",
  hidden: true,
};

export default function Content() {
  return (
    <>
      <p>
        To create a new blog post, copy `src/template-blog.tsx`, rename it
        (e.g., `my-first-post-blog.tsx`), and edit its content.
      </p>
      <p>Each blog file exports a `meta` object with these properties:</p>
      <ul>
        <li>`id`: A unique string for the URL (e.g., 'my-first-post').</li>
        <li>`title`: The title of the post.</li>
        <li>`description`: A short summary for the blog list.</li>
        <li>`createdAt`: The creation date (YYYY-MM-DD).</li>
        <li>`updatedAt`: (Optional) The last updated date.</li>
        <li>`hidden`: (Optional) Set to `true` to hide from the main list.</li>
      </ul>
      <p>You can use JSX for rich text formatting in your `content`:</p>
      <dl className="identity">
        <dt>Bold</dt>
        <dd>
          <b>&lt;b&gt;Bold text&lt;/b&gt;</b>
        </dd>
        <dt>Italic</dt>
        <dd>
          <i>&lt;i&gt;Italic text&lt;/i&gt;</i>
        </dd>
        <dt>Underline</dt>
        <dd>
          <u>&lt;u&gt;Underlined text&lt;/u&gt;</u>
        </dd>
      </dl>
    </>
  );
}