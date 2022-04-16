import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-black text-white prose prose-invert px-4 mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
