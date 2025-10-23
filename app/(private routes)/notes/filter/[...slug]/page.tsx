
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetails from "./Notes.client";
import { Tag } from "@/types/note";
import { Metadata } from "next";
import fetchNotesServer from "@/lib/api/serverApi";



type SlugProps = {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug[0] === "All" ? "All" : slug[0];
    return {
        title: tag ? `Notes tagged with ${tag}` : "All Notes",
        description: tag ? `Notes filtered by tag: ${tag}` : "All Notes",
        openGraph: {
            title: tag ? `Notes tagged with ${tag}` : "All Notes",
            description: tag ? `Notes filtered by tag: ${tag}` : "All Notes",
            siteName: "NoteHub",
            url: `https://youthoughts.versel.app/notes/filter/${slug[0]}`,
            images: [{
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: `Notes tagged with ${tag}`,
            }]
        }
    }
}

export default async function DocsPage({ params }: SlugProps) {
    const queryClient = new QueryClient();

    const { slug } = await params;
    const tag = slug[0] === "All" ? undefined : slug[0];
    
    const searchWord = "";
    const page = 1;

    await queryClient.prefetchQuery({
        queryKey: ["notes", searchWord, page, tag],
        queryFn: () => fetchNotesServer(searchWord, page, tag as Tag | undefined),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetails tag={tag} />
        </HydrationBoundary>
    )
}
