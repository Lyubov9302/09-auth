import fetchNotes from "@/lib/api/clientApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug[0]} Notes`,
    description: `Notes by category "${slug[0]}"`,
    openGraph: {
      url: `https://08-zustand-ten-red.vercel.app/notes/filter/${slug[0]}`,
      title: `Notes: ${slug[0]}`,
      description: `Notes by category "${slug[0]}"`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${slug[0]} notes`,
        },
      ],
    },
  };
}

const searchValue = "";
const page = 1;

export default async function Notes({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const category = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchValue, page, category],
    queryFn: () => fetchNotes(searchValue, page, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}
