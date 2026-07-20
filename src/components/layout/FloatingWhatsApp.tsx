import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/8801806999979"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6 text-white" />
  </a>
);

export default FloatingWhatsApp;
