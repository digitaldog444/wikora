import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <section className="flex justify-center items-center flex-col min-h-screen">
      <NavBar />
      <div>
        <h1>Wikora</h1>
        <p>Here is a list of current articles:</p>
      </div>
    </section>
  );
}
