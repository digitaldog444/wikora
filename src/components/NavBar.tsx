"use client";
import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <nav className="fixed bg-slate-800 w-full h-24 top-0 left-0 flex justify-center items-center">
      <ul className="flex justify-center items-center">
        <li>
          <Link href="/">Wikora</Link>
        </li>
        <li>
          <form onSubmit={handleSubmit}>
            <input
              className="m-1 p-3 border-2"
              type="search"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button type="submit">Search</button>
          </form>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
