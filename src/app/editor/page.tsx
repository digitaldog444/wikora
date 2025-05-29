import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { FormEvent } from "react";
import { toast } from "react-toastify";

const Editor = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<any>();

  const uploadPage = async () => {};

  const uploadFile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("file", file);
    let response = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });
    let json = await response.json();
    if (json.success) {
      toast.success("FIle uploaded successfully!");
      toast.success("File saved at: " + json.path);
    } else {
      toast.error(json.error);
    }
  };
  return (
    <section>
      <div>
        <h1>Editor</h1>
        <div>
          <div>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              type="text"
              placeholder="Slug"
              onChange={(e) => setSlug(e.target.value)}
              value={slug}
            />
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
            <button type="button" onClick={() => uploadPage()}>
              Save Page
            </button>
            <form onSubmit={uploadFile}>
              <label>Upload Files</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button type="submit">Upload File</button>
            </form>
          </div>
          <div>
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Editor;
