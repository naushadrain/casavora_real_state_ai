"use client";

import { useState } from "react";

export function useEmailSignup(source: "Newsletter" | "Footer" | "Founding Members") {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Submission failed");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return { email, setEmail, sent, submitting, error, submit };
}
