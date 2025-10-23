
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note"
import css from "./NoteList.module.css"
import { deleteNote } from "@/lib/api/clientApi"; 
import Link from "next/link";
interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    
    const queryClient = useQueryClient();

     const mutationPost = useMutation({
        mutationFn: async (id: string) => {
            const res = await deleteNote(id);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["notes"]})
        }
     })
    
    const handleDeleteNote = (id:string) => {
        mutationPost.mutate(id)
    }

    return <ul className={css.list}>
        {notes.map((note) => (<li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <Link className={css.buttonDetails} href={`/notes/${note.id}`}>View details</Link>
                <button onClick={() => handleDeleteNote(note.id)} className={css.button}>Delete</button>
            </div>
        </li>))}
    </ul>

};
