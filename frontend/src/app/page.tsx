export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🎨 Tailwind CSS Color Test Page
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="bg-red-500 text-white p-4 rounded-lg text-center">red-500</div>
        <div className="bg-green-500 text-white p-4 rounded-lg text-center">green-500</div>
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center">blue-500</div>
        <div className="bg-yellow-500 text-black p-4 rounded-lg text-center">yellow-500</div>
        <div className="bg-purple-500 text-white p-4 rounded-lg text-center">purple-500</div>
        <div className="bg-pink-500 text-white p-4 rounded-lg text-center">pink-500</div>
        <div className="bg-indigo-500 text-white p-4 rounded-lg text-center">indigo-500</div>
        <div className="bg-teal-500 text-white p-4 rounded-lg text-center">teal-500</div>
        <div className="bg-orange-500 text-white p-4 rounded-lg text-center">orange-500</div>
        <div className="bg-gray-700 text-white p-4 rounded-lg text-center">gray-700</div>
      </div>
    </div>
  );
}
