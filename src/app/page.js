import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white text-gray-800 p-6 sm:p-10 font-sans">
      {/* Header / Hero */}
      <main className="flex flex-col items-center text-center flex-grow justify-center gap-6 sm:gap-8 max-w-xl w-full">
        <div className="flex justify-center">
          <Image
            src="/blood-drop.png"
            alt="Blood Drop Logo"
            width={100}
            height={100}
            className="drop-shadow-md"
            priority
          />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-red-600 leading-tight">
          Welcome to MySaviour
        </h1>

        <p className="text-base sm:text-lg text-gray-600">
          Connecting lifesavers across India. Find or become a blood donor in
          seconds.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto justify-center">
          <Link
            href="/register"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md text-center transition w-full sm:w-auto"
          >
            Register as Donor
          </Link>
          <Link
            href="/donors"
            className="border border-red-600 text-red-600 hover:bg-red-50 font-semibold px-6 py-3 rounded-full text-center transition w-full sm:w-auto"
          >
            Find Donors
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} MySaviour. Built with ❤️ using{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-red-600"
        >
          Next.js
        </a>
        .
      </footer>
    </div>
  );
}
