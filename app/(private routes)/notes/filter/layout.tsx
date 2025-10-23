import React, { ReactNode } from "react";
import css from "./layoutNotes.module.css";
interface NotesLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

const NotesLayout = ({ children, sidebar }: NotesLayoutProps) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesLayout;