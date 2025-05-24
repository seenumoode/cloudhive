import IdeaList from "@/components/IdeaList";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Integration Hub Feature Ideas
      </h1>
      <IdeaList />
    </div>
  );
}
