import MatrixRain from "@/components/MatrixRain";

export const metadata = {
  title: "Home — Camilo Valencia",
  description: "Camilo Valencia — Software Engineering Portfolio.",
};

export default function HomePage() {
  return (
    <section className="matrix-home-page" aria-label="Home">
      <MatrixRain />
    </section>
  );
}
