"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const WikiPage = () => {
  const params = useParams();
  const { slug } = params;
  const [pageNotFound, setPageNotFound] = useState(false);
  const [page, setPage] = useState<any>({});

  const getPage = async () => {
    let response = await fetch(`/api/articles/${slug}`);
    let json = await response.json();
    if (json.success) {
      setPage(json.page);
    } else {
      setPageNotFound(true);
    }
  };
  useEffect(() => {
    getPage();
  }, []);

  if (pageNotFound) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <div>
          <h1>404 - Page not found!</h1>
          <p>
            <Link href="/editor">Editor</Link>
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <h1>{page?.title}</h1>
        <ReactMarkdown>{page.content}</ReactMarkdown>
      </section>
    );
  }
};
export default WikiPage;
