import { createFileRoute, Link } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import { Fragment } from "react/jsx-runtime";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="grow text-foreground grid grid-cols-8 gap-8 py-16 min-h-screen mx-6 md:mx-auto md:max-w-5xl">
      <Link
        to="/"
        className="px-2 text-foreground underline hover:no-underline underline-offset-4 col-span-6 text-sm md:text-base"
      >
        Zhuo Jinggang
      </Link>
      <ThemeSwitcher className="col-span-2 text-sm md:text-base" />

      <div className="col-span-8 row-span-2" />

      <img
        className="size-32 col-span-8 md:col-span-2 md:col-start-3 my-0!"
        src="/avatar.jpeg"
        alt="avatar"
      />

      <div className="flex flex-col gap-2 col-span-2 md:col-span-1 text-sm lg:text-base">
        <span>Email:</span>
        <span>GitHub:</span>
        <span>Work:</span>
      </div>

      <div className="flex flex-col gap-2 col-span-6 md:col-span-3 text-sm lg:text-base">
        <a
          className="hover:underline underline-offset-4"
          href="mailto: jg.zhuo@outlook.com"
        >
          jg.zhuo@outlook.com
        </a>
        <a
          className="hover:underline underline-offset-4"
          href="https://github.com/zhuojg"
        >
          zhuojg
        </a>
        <a
          className="hover:underline underline-offset-4"
          href="https://www.tezign.com/"
        >
          Tezign
        </a>
      </div>

      {allPosts.filter((post) => post.published).length > 0 && (
        <>
          <div className="col-span-8 row-span-2" />

          <h2 className="col-span-8 underline underline-offset-4">Posts</h2>
        </>
      )}

      {allPosts
        .filter((post) => post.published)
        .map((post) => (
          <Fragment key={post.slug}>
            <div className="flex flex-col gap-2 col-span-8 md:col-span-4 md:col-start-3">
              <Link
                to="/$slug"
                params={{ slug: post.slug }}
                className="text-foreground no-underline hover:underline underline-offset-4"
              >
                {post.title}
              </Link>
              <div className="text-sm opacity-75">{post.summary}</div>
              <span className="text-xs opacity-50 md:hidden">
                {post.publishedAt}
              </span>
            </div>
            <div className="hidden md:text-sm md:pb-0 md:col-span-2">
              {post.publishedAt}
            </div>
          </Fragment>
        ))}

      <div className="col-span-8 row-span-2" />

      <h2 className="col-span-8 underline underline-offset-4">Projects</h2>

      {[
        {
          name: "Suprematics.AI",
          link: "https://suprematics.ai",
          date: "Oct, 2025",
          introduction: "From Concept to Viral, In Just One Sentence",
        },
        {
          name: "GenDAM",
          link: "https://gendam.ai",
          date: "May, 2024",
          introduction:
            "Privacy first generative DAM.\n A cross-platform desktop application for managing, processing, and searching multimedia content using Rust-based libraries and AI models.",
        },
        {
          name: "MuseAI",
          link: "https://museai.cc",
          date: "Jul, 2023",
          introduction: "AIGC Playground",
        },
        {
          name: "MyMfers",
          link: "https://mymfers.xyz",
          date: "Sept, 2022",
          introduction: "Mix and match to claim your mfers",
        },
        {
          name: "Subculture Colorization",
          link: "https://github.com/tezignlab/subculture-colorization",
          date: "Mar, 2021",
          introduction: "Paper about colors in Chinese Youth Subculture",
        },
        {
          name: "CalligraphyGAN",
          link: "https://arxiv.org/abs/2012.00744",
          date: "Dec, 2020",
          introduction: "Paper about Chinese calligraphy generation with GAN",
        },
      ].map((project) => (
        <Fragment key={project.name}>
          <div className="col-span-8 md:col-span-4 md:col-start-3 flex flex-col gap-2">
            <Link
              className="text-foreground no-underline hover:underline underline-offset-4 col-span-6"
              to={project.link}
            >
              {project.name}
            </Link>

            <div className="text-sm opacity-75">{project.introduction}</div>
            <span className="text-xs opacity-50 md:hidden">{project.date}</span>
          </div>
          <div className="hidden md:text-sm md:pb-0 md:col-span-2">
            {project.date}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
