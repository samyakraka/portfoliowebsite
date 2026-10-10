import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import { FooterLinks, Header } from "../components/SiteChrome";
import { profile } from "../data";

export const metadata: Metadata = {
  title: "Contact | Samyak Raka",
  description: "Get in touch with Samyak Raka about AI engineering roles, projects or collaborations.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="wrap section contact-page" aria-labelledby="contact-title">
        <div className="section__head">
          <h1 id="contact-title" className="contact-page__title">
            Let&apos;s talk
          </h1>
          <p className="section__note">
            Hiring for AI or full-stack work, or building something with LLMs? Tell me a little about it.
          </p>
          <p className="contact-page__direct">
            Prefer to write directly?
            <br />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
        <ContactForm />
      </main>
      <footer className="wrap contact contact--slim">
        <FooterLinks />
      </footer>
    </>
  );
}
