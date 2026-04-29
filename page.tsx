export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Smart Receipt Maker 🚀
      </h1>

      <p className="text-gray-600 text-lg mb-6">
        Create professional receipts instantly and manage your business easily.
      </p>

      <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
        Create Receipt
      </button>

    </main>
  );
}