"use client";

import { useEffect, useState } from "react";

type ContactResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  details?: string;
};

export default function ContactFormClient() {
  const [mounted, setMounted] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isValid =
    values.name.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) &&
    /^[0-9+\-\s()]{10,15}$/.test(values.mobile.trim()) &&
    values.message.trim().length >= 3;

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      setStatus("Please fill all fields correctly.");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus("Sending message...");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          mobile: values.mobile.trim(),
          message: values.message.trim(),
        }),
      });

      let data: ContactResponse = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        const errorMessage = data.details
          ? `${data.error || "Unable to send message."} Reason: ${data.details}`
          : data.error || "Unable to send message. Please try again.";

        setStatus(errorMessage);
        return;
      }

      setValues({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });

      setStatus(data.message || "Message sent successfully.");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("Unable to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!mounted) {
    return (
      <div
        className="reveal-up card-premium min-h-[520px] rounded-[1.5rem] p-5 md:p-6"
        suppressHydrationWarning
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="reveal-up card-premium rounded-[1.5rem] p-5 md:p-6"
      noValidate
      suppressHydrationWarning
    >
      <div className="grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--heading)]">
            Name
          </label>

          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            autoComplete="off"
            suppressHydrationWarning
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--heading)]">
            Email
          </label>

          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="off"
            suppressHydrationWarning
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--heading)]">
            Mobile Number
          </label>

          <input
            name="mobile"
            type="tel"
            value={values.mobile}
            onChange={handleChange}
            autoComplete="off"
            suppressHydrationWarning
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
            placeholder="+91 93636 37726"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--heading)]">
            Message
          </label>

          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            rows={5}
            autoComplete="off"
            suppressHydrationWarning
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          suppressHydrationWarning
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--button)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <i className="fa-solid fa-paper-plane" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p
            className={`text-sm font-semibold ${
              status.includes("success") || status.includes("successfully")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </form>
  );
}