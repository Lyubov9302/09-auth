import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Page not found (404)",
  description: "Page is not found",

  openGraph: {
    title: "Error 404",
    description: "Page does not exist.",
    url: "https://08-zustand-ten-red.vercel.app/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Error Placeholder",
      },
    ],
  },
};

const NotFoundPage = async () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFoundPage;
