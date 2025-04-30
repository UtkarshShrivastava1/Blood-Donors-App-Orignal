export default function Footer() {
  return (
    <footer className="bg-[#0d173b] text-white text-center py-8 border-t border-white/10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="text-lg font-semibold">
            © {new Date().getFullYear()} MySaviour. Built with ❤️ using{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-500 hover:underline"
            >
              Next.js
            </a>
            .
          </p>
          <div className="space-x-6">
            <a
              href="/about"
              className="text-sm hover:text-rose-500 transition-all duration-200"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-sm hover:text-rose-500 transition-all duration-200"
            >
              Contact Us
            </a>
            <a
              href="/privacy-policy"
              className="text-sm hover:text-rose-500 transition-all duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-sm hover:text-rose-500 transition-all duration-200"
            >
              Terms of Service
            </a>
          </div>
          <div className="mt-4">
            <p className="text-xs">
              For any assistance, contact us at{" "}
              <a
                href="mailto:support@mysaviour.com"
                className="text-rose-500 hover:underline"
              >
                support@mysaviour.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
