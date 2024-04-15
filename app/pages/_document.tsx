import { Html, Head, Main, NextScript } from "next/document";
import icon from "@/public/assets/images/WEBP/ljr-logo.webp";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="shortcut icon" href={icon.src} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
