import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/utils";

export const Route = createFileRoute("/$slug")({
  beforeLoad: () => ({ allPosts }),
  loader: async ({ params, context: { allPosts } }) => {
    const slug = params.slug;
    const post = allPosts.find((post) => post.slug === slug && post.published);
    if (!post) {
      throw redirect({
        to: "/",
      });
    }

    return { post };
  },
  component: RouteComponent,
});

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 pb-1 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-md font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("leading-7 tracking-tight not-first:mt-6", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-3 ml-6 list-disc tracking-tight", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-3 ml-6 list-decimal tracking-tight", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic *:text-muted-foreground tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [align=center]:text-center [align=right]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className={cn("overflow-x-auto py-4", className)} {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const match = className?.match(/(?:^|\s)language-([^\s]+)/);

    if (match) {
      return (
        <SyntaxHighlighter
          language={match[1]}
          // @ts-expect-error this should work fine
          style={gruvboxDark}
          className={cn("rounded", className)}
          {...props}
        />
      );
    }

    return (
      <code
        className={cn("bg-foreground/20 font-mono", className)}
        {...props}
      />
    );
  },
};

function RouteComponent() {
  const { post } = Route.useLoaderData();
  return (
    <div
      className={cn(
        "min-h-screen md:mx-auto md:max-w-3xl",
        "before:top-16 before:absolute before:-m-px before:inset-x-0 before:w-full before:h-px before:bg-border",
      )}
    >
      <div
        className={cn(
          "min-h-screen flex flex-col relative",
          "md:before:absolute md:before:left-0 md:before:top-0 md:before:bottom-0 md:before:w-px md:before:bg-border md:before:-ml-px",
          "md:after:absolute md:after:right-0 md:after:top-0 md:after:bottom-0 md:after:w-px md:after:bg-border md:after:-mr-px",
        )}
      >
        <div className="h-16 flex items-center px-4 justify-between text-sm md:text-base">
          <Link
            to="/"
            className="text-foreground no-underline hover:underline underline-offset-4 align-self-center text-left flex flex-col justify-center"
          >
            Home
          </Link>

          <ThemeSwitcher />
        </div>

        <div className="grow flex flex-col p-4">
          <div className={cn("flex flex-col pb-32")}>
            <h1 className="font-semibold text-2xl"> {post.title}</h1>
            <span className="text-sm opacity-75 mt-8 mb-8">
              {post.publishedAt}
            </span>
            <MDXContent code={post.mdx} components={components} />
          </div>
        </div>
      </div>
    </div>
  );
}
