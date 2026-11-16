import { profile } from "../data/portfolio";
import Icon from "./Icon";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${profile.whatsapp.replace(/[^\d]/g, "")}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-[5.25rem] sm:right-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-2xl text-white shadow-2xl transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <Icon name="fa-brands fa-whatsapp" />
    </a>
  );
}
