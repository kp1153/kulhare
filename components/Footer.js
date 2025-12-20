export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Column 1: Publisher Info */}
        <div>
          <h4 className="text-xl font-bold">मेधाबुक्स, शाहदरा</h4>
          <p className="mt-3 text-sm">कथाकारों की आवाज़ — समाज की परछाइयाँ</p>
        </div>

        {/* Column 2: Readers Section */}
        <div>
          <h4 className="text-lg font-semibold">रीडर्स</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/new" className="hover:text-amber-400">
                नई पुस्तकें
              </a>
            </li>
            <li>
              <a href="/popular" className="hover:text-amber-400">
                लोकप्रिय पुस्तकें
              </a>
            </li>
            <li>
              <a href="/ebooks" className="hover:text-amber-400">
                ई-पुस्तकें
              </a>
            </li>
            <li>
              <a href="/magazine" className="hover:text-amber-400">
                पत्रिका
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Institutional Links */}
        <div>
          <h4 className="text-lg font-semibold">लिंक्स</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/about" className="hover:text-amber-400">
                हमारे बारे में
              </a>
            </li>
            <li>
              <a href="/team" className="hover:text-amber-400">
                संपादकीय टीम
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-amber-400">
                गोपनीयता नीति
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-amber-400">
                नियम व शर्तें
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © 2025 कुल्हारे प्रकाशन | Developed by{" "}
        <a
          href="https://www.web-developer-kp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-amber-400"
        >
          Web Developer KP
        </a>
      </div>
    </footer>
  );
}
