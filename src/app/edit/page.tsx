"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Editor = () => {
  const [input, setInput] = useState("");
  const saveArticle = (e: any) => {
    e.preventDefault();
  };
  return (
    <section className="flex justify-center items-center">
      <div>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></textarea>
        <button
          className="bg-amber-500 hover:bg-amber-600 p-2"
          onClick={saveArticle}
        >
          Save Article
        </button>
      </div>
      <div>
        <ReactMarkdown>{input}</ReactMarkdown>
      </div>
    </section>
  );
};
export default Editor;
