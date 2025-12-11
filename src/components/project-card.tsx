"use client";

import { type Icon, LinkExternalIcon } from "@primer/octicons-react";
import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";
import { cn } from "@/utils";
import { useHover } from "./use-hover";

export type Project = {
  Icon: Icon;
  name: string;
  link: string;
  date: string;
  introduction: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const [isHovering, ref] = useHover<HTMLAnchorElement>();
  const { link, name, date, introduction, Icon } = project;

  return (
    <Link
      className={cn(
        "flex flex-col py-4 space-y-2 px-4 cursor-pointer",
        "no-underline rounded-lg",
        "hover:bg-zinc-900 transition-all duration-200 ease-in-out",
      )}
      ref={ref}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <Icon size={18} />
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex space-x-2 items-center">
          <span className="no-underline">{name}</span>

          <LinkExternalIcon
            className={clsx(
              isHovering
                ? "opacity-0 lg:opacity-100 animate-bounce"
                : "opacity-0",
              "transition-opacity duration-300 ease-in-out",
            )}
            size={16}
          />
        </div>

        <div className="text-sm text-gray-700 lg:text-gray-300">{date}</div>
      </div>

      <div
        className={clsx(
          "text-sm",
          isHovering ? "text-gray-200" : "text-gray-500",
          "transition-all duration-300 ease-in-out",
          "whitespace-pre-line",
        )}
      >
        {introduction}
      </div>
    </Link>
  );
}
