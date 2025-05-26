"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Editor = () => {
  const [input, setInput] = useState("");
  return (
    <section className="flex justify-center items-center">
      <div>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></textarea>
      </div>
      <div>
        <ReactMarkdown>{input}</ReactMarkdown>
      </div>
    </section>
  );
};
export default Editor;
