export default function Footer() {
  return (
    <footer className="text-sm text-gray-500 text-center py-6 border-t border-gray-200 mt-10">
      <p>
        © {new Date().getFullYear()} LifeLine Donors. Built with ❤️ using{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:underline"
        >
          Next.js
        </a>
        .
      </p>
    </footer>
  );
}
