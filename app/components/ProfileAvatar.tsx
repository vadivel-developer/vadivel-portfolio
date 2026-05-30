"use client";

export default function ProfileAvatar() {
  return (
    <div className="reveal-up float-soft relative mb-3 h-44 w-44 overflow-hidden rounded-full border-[10px] border-[var(--border)] bg-[var(--card)] shadow-2xl md:h-30 md:w-30">
      <img
        src="/images/vadivel-web-developer.jpg?v=2"
        alt="Vadivel T"
        className="block h-full w-full object-cover object-center"
      />
    </div>
  );
}