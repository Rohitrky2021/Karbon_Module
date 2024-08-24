import Component from "@/components/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-900 flex items-center justify-center">
      <div className="container mx-auto p-8 max-w-lg">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
          Financial Probe Model
        </h1>
        <Component />
      </div>
    </div>
  );
}
