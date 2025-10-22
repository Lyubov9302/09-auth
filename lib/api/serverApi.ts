import { cookies } from "next/headers";
import nextServer from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { NoteHttpResponse } from "./clientApi";

export default async function fetchNotesServer(
  query: string,
  page: number,
  tag?: string,
): Promise<NoteHttpResponse> {
  const cookieStore = await cookies();

  const response = await nextServer.get<NoteHttpResponse>("/notes", {
    params: {
      search: query,
      page,
      tag: tag || undefined,
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const responseById = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return responseById.data;
}

export const getMeServer = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};