import { Facebook } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#006680] text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm space-y-2">

        <div className="font-semibold text-lg">
          मेधा बुक्स, शाहदरा
        </div>

        <div className="text-white/90">
          X-11 / Near Shiv Mandir, Mohan Park, Shahdara, Delhi-110032
        </div>

        <div>
          <a href="tel:9891022477" className="hover:text-gray-200 transition">
            98910 22477
          </a>
          {" | "}
          <a
            href="mailto:medhabooks@gmail.com"
            className="hover:text-gray-200 transition"
          >
            medhabooks@gmail.com
          </a>
        </div>

        <div className="flex justify-center">
          <a
            href="https://www.facebook.com/profile.php?id=100089726817350"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-200 transition"
            aria-label="Facebook"
          >
            <Facebook size={16} />
            <span>Facebook</span>
          </a>
        </div>

        <div className="pt-2 border-t border-white/20">
          <span>© {year} सर्वाधिकार सुरक्षित | Passionately created by </span>
          <a
            href="https://www.web-developer-kp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 hover:underline"
          >
            web-developer-kp.com
          </a>
        </div>

      </div>
    </footer>
  );
}