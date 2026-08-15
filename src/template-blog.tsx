import type { BlogMeta } from "./data.tsx";

/**
 * To create a new post:
 * 1. Copy this file.
 * 2. Rename it to your-post-id-blog.tsx. The filename must end with -blog.tsx.
 * 3. Update the meta export.
 * 4. Write your content in the Content component.
 */

export const meta: BlogMeta = {
  id: "my-new-post",
  title: "My New Post",
  description: "A short description of my new post.",
  createdAt: "2023-10-28", // YYYY-MM-DD
};

export default function Content() {
  return (
    <>
      <p>
        This is where your blog content goes. Write in JSX!
      </p>
    </>
  );
}