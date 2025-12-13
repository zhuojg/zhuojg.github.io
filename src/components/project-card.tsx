"use client";

import { Link } from "@tanstack/react-router";

export type Project = {
  name: string;
  link: string;
  date: string;
  introduction: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const { link, name, date, introduction } = project;

  return (
    <>
      <div className="col-span-6 flex flex-col gap-2">
        <Link
          className="text-foreground no-underline hover:underline underline-offset-4 col-span-6"
          to={link}
        >
          {name}
        </Link>
        <div className="text-sm opacity-80">{introduction}</div>
      </div>
      <div className="text-xs md:text-sm col-span-2">{date}</div>
    </>
  );
}
