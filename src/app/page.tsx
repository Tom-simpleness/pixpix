import PixelGrid from "@/presentation/components/PixelGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-black">Pixel Grid</h1>
      <PixelGrid />
    </main>
  );
}
