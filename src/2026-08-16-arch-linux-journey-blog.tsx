import type { BlogMeta } from "./data.tsx";

export const meta: BlogMeta = {
  id: "arch-linux-journey",
  title: "Arch Linux Journey",
  description: "A story about how I got interested in changing my operating system and the journey of learning about it.",
  createdAt: "2026-08-16", // YYYY-MM-DD
  hidden: false,
};

export default function Content() {
  return (
    <>
      <p>
        The journey started when I got the <b>Manager</b> role in <u>Frostspire Network</u>, and I was given a task to set up a server for our internal tools. I was using Windows at the time, but I needed to connect to the server using SSH, and I found a quick workaround by using <u>WSL</u> (Windows Subsystem for Linux).
      </p>
      <p>
        I was amazed by the power of Linux and how it could be used to manage servers. I started to learn more about Linux and its various distributions. But I was a bit scared of this change till my friend Absyllute convinced me to just make the switch and forget about Windows. He suggested Arch Linux, especially since I already had some experience with coding and Linux commands.
      </p>
      <p>
        So, I decided to take the plunge. I backed up all my important stuff (mostly games and school projects, lol) and wiped my drive. No going back now! The Arch Wiki became my new best friend. Seriously, that thing is a lifesaver, even if the installation guide looked super intimidating at first—just a wall of text and commands.
      </p>
      <p>
        I spent a whole weekend on it. There were moments I was so close to just giving up and reinstalling Windows. I remember messing up my partitions like three times. At one point, I couldn't even connect to the internet from the command line, and I was like, 'how am I supposed to download anything?!'. Had to use my phone to look up solutions on the wiki. It was a struggle, for real.
      </p>
      <p>
        But then, after hours of typing commands that looked like some ancient spell, I finally got to the login prompt of my very own, self-installed Arch system. That feeling was epic! It was just a black screen with a blinking cursor, but it was <i>mine</i>. I built it from the ground up. Next up was getting a desktop environment running and making it actually look cool. The real fun was about to begin.
      </p>
    </>
  );
}