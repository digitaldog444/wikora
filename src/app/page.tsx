import NavBar from "@/components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex justify-center items-center flex-col min-h-screen">
      <NavBar />
      <div>
        <h1>Wikora</h1>
        <p>A free and open-source wiki using Next.js</p>
      </div>
    </section>
  );
}
