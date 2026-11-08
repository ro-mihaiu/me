import type { BlogMeta } from "./data.tsx";

export const meta: BlogMeta = {
  id: "class-calendar",
  title: "I Built a Calendar for My Class",
  description:
    "A small school dashboard for the timetable, cleaning rotation, holidays, and everything else I kept having to check.",
  createdAt: "2026-09-03",
};

export default function Content() {
  return (
    <>
      <p>
        This project started from a pretty simple problem: there were too many
        things to remember about school. The timetable, the cleaning rotation,
        holidays, special weeks, and the next person on duty were all separate
        pieces of information. I wanted to put them somewhere that was easy to
        check from my phone.
      </p>
      <p>
        So I made a small Romanian-language dashboard for the 2026–2027 school
        year in Iași. It includes the timetable for class 10F, a calendar with
        holidays and legal days off, and an automatic cleaning rotation for 25
        people. The important part is that the rotation skips weekends,
        vacations, and holidays instead of just counting every day.
      </p>
      <p>
        I also added a search for each student. You can choose a name and see
        every assigned day for the year, which is much more useful than looking
        through a huge calendar manually. The app remembers edited team names
        locally, so changing the list does not need a backend or an account.
      </p>
      <p>
        There are a few smaller details that make it feel more complete: a
        light and dark theme, a mobile-friendly timetable, the next birthday,
        WhatsApp and <code>.ics</code> exports, and a way to edit the team. It
        is not a huge application, but it is a good example of how a focused
        tool can solve a very real everyday problem.
      </p>
    </>
  );
}
