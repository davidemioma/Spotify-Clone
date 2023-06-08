import { Metadata } from "next";

const title = "Spotify Clone";

const description =
  "Discover and stream your favorite music effortlessly with our user-friendly Spotify clone.";

const image =
  "https://commons.wikimedia.org/wiki/File:Spotify_logo_without_text.svg";

export const metaData: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    // url: "https://ilwyennefer.com",
    // siteName: "ILW Yennefer",
    images: [{ url: image }],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  //   twitter: {
  //     title: title,
  //     description: description,
  //     card: "summary_large_image",
  //     images: [image],
  //     creator: "David Emioma",
  //   },
};
