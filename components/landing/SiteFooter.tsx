"use client";

import { useEmailSignup } from "@/hooks/use-email-signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  const { email, setEmail, sent, submitting, error, submit } = useEmailSignup("Footer");

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <div className="max-w-sm">
            <img src="/logo.svg" alt="Casavora" className="h-8 w-auto" />
            <p className="mt-3 text-sm text-ink-soft">
              Simplifying Property Ownership
            </p>
            <div className="mt-4 flex gap-6 text-sm text-ink-soft">
              <a href="#survey" className="hover:text-ink">Survey</a>
              <a href="#founding" className="hover:text-ink">Join</a>
              <a href="#newsletter" className="hover:text-ink">Newsletter</a>
            </div>
          </div>

          <div className="w-full md:w-80">
            <div className="text-sm font-semibold text-ink">Get the early updates</div>
            {sent ? (
              <div className="mt-2 text-sm text-accent-foreground">Thanks — you're on the list.</div>
            ) : (
              <form
                onSubmit={submit}
                className="mt-2 flex gap-2"
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@home.com"
                  className="h-auto flex-1 rounded-full border-border bg-background px-4 py-2 text-sm focus-visible:border-primary"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-auto rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover-lift disabled:opacity-50"
                >
                  {submitting ? "…" : "Join"}
                </Button>
              </form>
            )}
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border text-sm text-ink-soft text-center md:text-left">
          © {new Date().getFullYear()} CASAVORA. Built with founding members.
        </div>
      </div>
    </footer>
  );
}
