// app/contact/page.js
export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">संपर्क करें</h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg mb-4">
            <strong>फोन:</strong> +91 98765 43210
          </p>
          <p className="text-lg">
            <strong>ईमेल:</strong> info@publisher.com
          </p>
        </div>
      </div>
    </div>
  );
}
