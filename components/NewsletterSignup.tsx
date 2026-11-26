"use client";

import { useId, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Newsletter signup that posts straight to Kit, without loading Kit's own
 * script or styles. If the background request fails, the form falls back to
 * an ordinary submission so the signup still goes through.
 */
export default function NewsletterSignup({ heading = "Get new calculators and worked examples by email" }: { heading?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const action = `https://app.kit.com/forms/${site.newsletter.kitFormId}/subscriptions`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Hidden field that people never see; bots that fill it are ignored.
    if (data.get("website")) {
      setStatus("done");
      return;
    }
    data.delete("website");
    setStatus("sending");
    try {
      const res = await fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      // Background request blocked or failed: submit the form normally.
      form.submit();
    }
  }

  return (
    <aside className="signup" aria-labelledby={`${id}-h`}>
      <div className="signup-copy">
        <h2 id={`${id}-h`}>{heading}</h2>
        <p>
          An occasional email when there&rsquo;s a new calculator, worked
          example or article. No tips, no hype, and you can unsubscribe any time.
        </p>
      </div>
      {status === "done" ? (
        <p className="signup-done" role="status">
          Nearly there. Check your inbox and click the link to confirm your subscription.
        </p>
      ) : (
        <form className="signup-form" action={action} method="post" onSubmit={onSubmit}>
          <label className="signup-label" htmlFor={`${id}-email`}>
            Email address
          </label>
          <div className="signup-row">
            <input
              id={`${id}-email`}
              className="signup-input"
              type="email"
              name="email_address"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
            <button className="signup-button" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
          <input className="signup-trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          {status === "error" && (
            <p className="signup-error" role="alert">
              That didn&rsquo;t go through. Check the address and try again.
            </p>
          )}
          <p className="signup-note">
            Emails are sent with Kit. See the <a href="/privacy">privacy policy</a>.
          </p>
        </form>
      )}
    </aside>
  );
}
