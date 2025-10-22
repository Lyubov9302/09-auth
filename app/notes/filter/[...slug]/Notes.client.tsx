"use client";

import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { FetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";
import { useRouter } from "next/navigation";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClientProps {
  category?: string;
}

export default function NotesClient({ category }: NotesClientProps) {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", searchValue, page, category],
    queryFn: () => FetchNotes(searchValue, page, category),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  const totalPages = data?.totalPages ?? 0;

  function onClickCreate() {
    router.push("/notes/action/create");
  }

  const updateSearchWord = useDebouncedCallback((searchWord: string) => {
    setSearchValue(searchWord);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchWord} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={onClickCreate}
        >
          Create note +
        </button>
      </header>
      {data !== undefined && data?.notes.length > 0 && (
        <NoteList notes={data?.notes} />
      )}
    </div>
  );
}
