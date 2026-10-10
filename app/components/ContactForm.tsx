"use client";

import { useRef, useState, type FormEvent } from "react";
import { profile } from "../data";

const reasons = [
  "Job opportunity",
  "Internship or freelance project",
  "Collaboration or hackathon",
  "Something else",
];

type Fields = { name: string; email: string; company: string; reason: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", company: "", reason: reasons[0], message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your name so I know who's writing.";
  if (!f.email.trim()) e.email = "Enter your email so I can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "That email looks incomplete. Check it has an @ and a domain, like name@company.com.";
  if (f.message.trim().length < 10) e.message = "Write at least a sentence about what you have in mind.";
  return e;
}

function compose(f: Fields) {
  const name = f.name.trim();
  const company = f.company.trim();
  const subject = `${f.reason}: ${name}${company ? ` (${company})` : ""}`;
  const signature = [name, company, f.email.trim()].filter(Boolean);
  const body = ["Hi Samyak,", "", f.message.trim(), "", "Best,", ...signature].join("\n");
  return { subject, body };
}

// mailto bodies need CRLF line breaks to render correctly in every mail app.
const enc = (s: string) => encodeURIComponent(s.replace(/\r?\n/g, "\r\n"));

export function links(f: Fields) {
  const { subject, body } = compose(f);
  const to = profile.email;
  return {
    mailto: `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${enc(subject)}&body=${enc(body)}`,
    outlook: `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${enc(subject)}&body=${enc(body)}`,
    text: `To: ${to}\nSubject: ${subject}\n\n${body}`,
  };
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Fields)[])[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(true);
    window.location.href = links(fields).mailto;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links(fields).text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (sent) {
    const l = links(fields);
    return (
      <div className="sent" role="status">
        <h2>Your email is ready to send</h2>
        <p>
          Your email app should have opened with the message filled in. Check it over and press send there.
          Nothing is sent until you do.
        </p>
        <p className="sent__alt">
          Didn&apos;t open, or you use email in the browser? Open the same message in:
        </p>
        <div className="sent__actions">
          <a className="btn btn--solid" href={l.gmail} target="_blank" rel="noopener noreferrer">
            Open in Gmail
          </a>
          <a className="btn btn--ghost" href={l.outlook} target="_blank" rel="noopener noreferrer">
            Open in Outlook
          </a>
          <button type="button" className="btn btn--ghost" onClick={copy}>
            {copied ? "Message copied" : "Copy message"}
          </button>
        </div>
        <button type="button" className="sent__back" onClick={() => setSent(false)}>
          Edit message
        </button>
      </div>
    );
  }

  const field = (key: keyof Fields) => ({
    id: `c-${key}`,
    name: key,
    value: fields[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `c-${key}-error` : undefined,
  });

  const error = (key: keyof Fields) =>
    errors[key] && (
      <p className="form__error" id={`c-${key}-error`}>
        {errors[key]}
      </p>
    );

  return (
    <form ref={form} className="form" onSubmit={submit} noValidate>
      <div className="form__row">
        <div className="form__field">
          <label htmlFor="c-name">Your name</label>
          <input {...field("name")} type="text" autoComplete="name" />
          {error("name")}
        </div>
        <div className="form__field">
          <label htmlFor="c-email">Your email</label>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" />
          {error("email")}
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="c-company">
          Company or organization <span>(optional)</span>
        </label>
        <input {...field("company")} type="text" autoComplete="organization" />
      </div>

      <fieldset className="form__field">
        <legend>What&apos;s it about?</legend>
        <div className="form__reasons">
          {reasons.map((r) => (
            <label key={r} className="reason">
              <input
                type="radio"
                name="reason"
                value={r}
                checked={fields.reason === r}
                onChange={set("reason")}
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form__field">
        <label htmlFor="c-message">Message</label>
        <textarea {...field("message")} rows={6} placeholder="A few lines about the role, project or idea" />
        {error("message")}
      </div>

      <div className="form__submit">
        <button type="submit" className="btn btn--solid">
          Open in my email app
        </button>
        <p>Your message opens in your email app, filled in and ready to send.</p>
      </div>
    </form>
  );
}
