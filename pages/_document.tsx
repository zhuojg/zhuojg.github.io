import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-black text-white prose prose-invert prose-xl mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
