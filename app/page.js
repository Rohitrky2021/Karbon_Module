import Image from "next/image";
import Component from "@/components/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mt-12 mb-12">
        Financial Probe Model
      </h1>

      <Component />
    </div>
  );
}
