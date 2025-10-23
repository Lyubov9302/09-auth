
"use client";

import { fetchNoteById } from "@/lib/api/clientApi";
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p className={css.loading}>Loading, please wait...</p>;
  }

  if (error || !note) {
    throw error;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <button onClick={() => router.back()} className={css.backBtn}>
            Back
          </button>
          <h2>{note?.title}</h2>
        </div>

        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
