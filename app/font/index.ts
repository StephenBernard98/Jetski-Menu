import {
  Inter,
  Roboto_Mono,
  Alkatra,
  Alumni_Sans,
  Mooli,
  Libre_Franklin,
  Roboto_Condensed,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const alkatra = Alkatra({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alkatra",
});

export const alumni = Alumni_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alumni-sans",
});

export const mooli = Mooli({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-mooli",
});

export const libre = Libre_Franklin({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-libre",
});

export const robotoCondensed = Roboto_Condensed({
  subsets: ["vietnamese"],
  weight: "700",
  variable: "--font-condensed",
});
