import { User } from "@/types/users";
import nextServer from "./api";
import { Note, Tag } from "@/types/note";

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export default async function fetchNotes(
  query: string,
  page: number,
  tag?: string,
): Promise<NoteHttpResponse> {
  const response = await nextServer.get<NoteHttpResponse>("/notes", {
    params: {
      search: query,
      page,
      tag: tag || undefined,
      perPage: 12,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const responseById = await nextServer.get<Note>(`/notes/${id}`);
  return responseById.data;
}

export interface createNotePost {
  title: string;
  content: string;
  tag: Tag;
}

export async function createNote({
  title,
  content,
  tag,
}: createNotePost): Promise<Note> {
  const postResponse = await nextServer.post<Note>("/notes", {
    title,
    content,
    tag,
  });
  return postResponse.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const deleteResponse = await nextServer.delete<Note>(`/notes/${id}`);

  return deleteResponse.data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface UserRegister {
  username: string;
  email: string;
}

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: RegisterRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

interface CheckSessionRequest {
  success: boolean;
}

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export interface UpdateUserRequest {
  username: string;
}

export const getMeUpdate = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};