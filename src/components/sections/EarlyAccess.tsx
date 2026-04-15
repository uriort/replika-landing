"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Input from "@/components/ui/Input";
import { getEmailError } from "@/lib/validators";

type FormState = "idle" | "submitting" | "success" | "error";

export default function EarlyAccess() {
  const [form, setForm] = useState({ name: "", organization: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [state, setState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState("");

  const validateField = (field: string, value: string) => {
    if (field === "email") return getEmailError(value);
    if (!value.trim())
      return `${field === "name" ? "Name" : "Organization"} is required`;
    return null;
  };

  const handleBlur = (field: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, form[field as keyof typeof form]),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string | null> = {};
    for (const [key, value] of Object.entries(form)) {
      newErrors[key] = validateField(key, value);
    }
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setState("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setState("success");
    } catch (err) {
      setState("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section
      id="early-access"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: "url(/gradients/bg-crl-fade.jpg)" }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent-purple/[0.06] rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-accent-teal/[0.05] rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        <div className="text-center mb-10">
          <Eyebrow>Early Access Program</Eyebrow>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-foreground">
            Simulate your organization
            <br />
            before you <span className="italic gradient-text">run it.</span>
          </h2>
          <p className="mt-4 text-sm text-muted">
            Have a conversation with the future.
          </p>
        </div>

        {state === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-white rounded-2xl card-shadow-lg"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-teal/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">We&apos;ll be in touch.</h3>
            <p className="text-sm text-muted">Thank you for your interest in Replika.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white rounded-2xl card-shadow-lg p-8">
            <Input
              label="Full Name"
              name="name"
              placeholder="Jane Smith"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              onBlur={() => handleBlur("name")}
              error={errors.name}
              required
            />
            <Input
              label="Organization"
              name="organization"
              placeholder="Acme Corp"
              value={form.organization}
              onChange={(e) => setForm((prev) => ({ ...prev, organization: e.target.value }))}
              onBlur={() => handleBlur("organization")}
              error={errors.organization}
              required
            />
            <Input
              label="Work Email"
              name="email"
              type="email"
              placeholder="jane@acme.com"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              required
            />

            {serverError && (
              <p className="text-sm text-red-500 text-center">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="mt-2 w-full py-4 rounded-xl font-medium text-sm text-white bg-foreground hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {state === "submitting" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Request Early Access"
              )}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
