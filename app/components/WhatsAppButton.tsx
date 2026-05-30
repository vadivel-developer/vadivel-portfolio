import { profile } from "../data/portfolio";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${profile.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="pulse-whatsapp fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-2xl transition hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp" />
    </a>
  );
}
