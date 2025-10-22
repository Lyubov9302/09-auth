"use client";

import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button
        onClick={toggle}
        className={css.menuButton}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              onClick={toggle}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li
              className={css.menuItem}
              key={tag}
            >
              <Link
                href={`/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
