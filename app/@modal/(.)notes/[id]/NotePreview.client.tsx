
"use client";

import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";

const NotePreview = () => {
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
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
            <button onClick={() => router.back()} className={css.backBtn}>
              Back
            </button>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
