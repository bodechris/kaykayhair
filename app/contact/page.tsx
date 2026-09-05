"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styled from 'styled-components';

const contactConfig = {
  studioName: "Kaykay Hair",
  address: "Legal Hub Building, Main Street, Randburg, South Africa",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Legal%20Hub%20Building%20Main%20Street%20Randburg%20South%20Africa",
  email: "hello@kaykayhair.com",
  phoneLabel: "+27 71 782 4439",
  phoneHref: "https://wa.me/27717824439",
  instagramLabel: "@kaykayhair",
  instagramHref: "https://www.instagram.com/kaykayhairofficial/",
};

const contactCards = [
  {
    eyebrow: "01 / Visit",
    title: "Find the studio",
    description:
      "Come through for consultations, installs, treatments, glam prep, and beauty maintenance by appointment.",
    action: "Open directions",
    href: contactConfig.mapsHref,
  },
  {
    eyebrow: "02 / Book",
    title: "Start on WhatsApp",
    description:
      "Send your preferred service, date, current hair photo, and reference look so the team can guide your booking faster through WhatsApp.",
    action: contactConfig.phoneLabel,
    href: contactConfig.phoneHref,
  },
  {
    eyebrow: "03 / Enquire",
    title: "Plan a beauty moment",
    description:
      "For wig installs, bridal, events, Care Plus, makeup, manicure, pedicure, and custom appointments.",
    action: "Send us a message",
    href: "#contact-form",
  },
];

const appointmentHints = [
  "Your preferred service",
  "A clear current hair photo",
  "Reference image or lookbook style",
  "Preferred date and arrival time",
  "Any allergies, scalp concerns, or deadlines",
];

const beautyRoutes = [
  "Wig installs",
  "Braids",
  "Cornrows",
  "Treatments",
  "Makeup",
  "Manicure",
  "Pedicure",
  "Bridal glam",
  "Care Plus Membership",
  "Kaykay Hair Products"

];

const officeMoments = [
  {
    label: "Consultations",
    value: "By appointment",
  },
  {
    label: "Beauty services",
    value: "Weekday + weekend slots",
  },
  {
    label: "Events / bridal",
    value: "Advance booking recommended",
  },
];

type FormState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  service: "",
  date: "",
  message: "",
};

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement | null >(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cleanup = false;

    async function initAnimations() {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      if (cleanup) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const softReveals = gsap.utils.toArray<HTMLElement>("[data-soft-reveal]");
        const parallaxItems = gsap.utils.toArray<HTMLElement>("[data-parallax]");

        gsap.set(reveals, { y: 72, opacity: 0 });
        gsap.set(softReveals, { y: 28, opacity: 0 });

        reveals.forEach((element) => {
          gsap.to(element, {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          });
        });

        softReveals.forEach((element) => {
          gsap.to(element, {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
            },
          });
        });

        parallaxItems.forEach((element) => {
          const speed = Number(element.dataset.parallax || 18);

          gsap.to(element, {
            yPercent: speed,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        gsap.to(".contact-hero__word", {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".studio-map__grid", {
          backgroundPosition: "80px 80px",
          ease: "none",
          scrollTrigger: {
            trigger: ".studio-map",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, pageRef);
    }

    initAnimations();

    return () => {
      cleanup = true;
      ctx?.revert();
    };
  }, []);

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Kaykay Hair enquiry from ${form.name || "website visitor"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name || "Not provided"}`,
        `Phone: ${form.phone || "Not provided"}`,
        `Service: ${form.service || "Not selected"}`,
        `Preferred date: ${form.date || "Flexible"}`,
        "",
        "Message:",
        form.message || "Not provided",
      ].join("\n")
    );

    window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(contactConfig.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <ContactPageWrapper ref={pageRef} className="contact-page">

      {/* <section className="contact-strip" aria-label="Beauty service routes">
        <div className="contact-strip__track">
          {[...beautyRoutes, ...beautyRoutes].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section> */}

      <section className="contact-cards section-padding">
        <div className="section-heading" data-reveal>
          <h2>We're always happy to hear from you!</h2>
        </div>

        <div className="contact-cards__grid">
          {contactCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="contact-card"
              data-soft-reveal
            >
              <span>{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <strong>{card.action}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="contact-form-section section-padding" id="contact-form">
        <div className="contact-form-section__intro" data-reveal>
          <p className="eyebrow">Send your message</p>
          <h2>What would you like to know about?</h2>
          <p>
            Ask us about bookings, installations, braids, CarePlus membership, bridal styling, wig care, product recommendations, or anything you need before your visit.
          </p>
        </div>

        <div className="contact-form-section__layout">
          <form className="contact-form" onSubmit={submitEnquiry} data-reveal>
            <div className="field-grid">
              <label>
                <span>Your name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter your name"
                  autoComplete="name"
                />
              </label>

              <label>
                <span>Phone / WhatsApp</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="Best number to reach you"
                  autoComplete="tel"
                />
              </label>
            </div>

            <div className="field-grid">

              <fieldset className="contact-form__field contact-form__services"> <legend>Services</legend> <p id="services-help" className="field-help"> Choose all services you're interested in. </p> <div className="services-options" role="group" aria-describedby="services-help" > {beautyRoutes.map((route) => { const id = `service-${route.toLowerCase().replace(/\s+/g, "-")}`; const isChecked = form.service.includes(route); return ( <label key={route} htmlFor={id} className="service-option"> <input id={id} type="checkbox" name="services" value={route} checked={isChecked} onChange={() => console.log("")} /> <span>{route}</span> </label> ); })} </div> </fieldset>

              {/* <label>
                <span>Preferred date</span>
                <input
                  name="date"
                  value={form.date}
                  onChange={updateField}
                  type="date"
                />
              </label> */}
            </div>

            <label>
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="Tell us the look you want, your hair condition, timing, and anything we should know before confirming your appointment."
                rows={8}
              />
            </label>

            <button className="button button--dark contact-form__submit" type="submit">
              Prepare enquiry
            </button>
          </form>

        </div>
      </section>

      <section className="studio-map section-padding" aria-labelledby="studio-map-title">
        <div className="studio-map__content" data-reveal>
          <p className="eyebrow">Studio location</p>
          <h2 id="studio-map-title">A calm beauty stop in Randburg.</h2>
          <p>
            Visit Kaykay Hair at Legal Hub Building, Main Street, Randburg. Use
            the directions link before leaving so you can confirm the best route
            and arrival time.
          </p>

          <div className="studio-map__actions">
            <a className="button button--dark" href={contactConfig.mapsHref}>
              Open in maps
            </a>
            <button className="button button--light" type="button" onClick={copyAddress}>
              {copied ? "Copied" : "Copy address"}
            </button>
          </div>
        </div>

        <a
          className="studio-map__visual"
          href={contactConfig.mapsHref}
          aria-label="Open Kaykay Hair location in maps"
          data-soft-reveal
        >
          <div className="studio-map__grid" aria-hidden="true" />
          <div className="studio-map__pin" aria-hidden="true">
            <span />
          </div>
          <div className="studio-map__card">
            <span>{contactConfig.studioName}</span>
            <strong>{contactConfig.address}</strong>
          </div>
        </a>
      </section>


    </ContactPageWrapper>
  );
}


const ContactPageWrapper = styled.div`
    --ink: #191510;
    --muted: #756d64;
    --soft: #f7f4ef;
    --soft-2: #fbfaf7;
    --line: rgba(25, 21, 16, 0.1);
    --line-strong: rgba(25, 21, 16, 0.18);
    --coffee: #4d3f2e;
    --cream: #fffaf0;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: #ffffff;
    color: var(--ink);
    font-family: var(--font-inter, Inter, ui-sans-serif, system-ui, sans-serif);

  .section-padding {
    padding: clamp(5rem, 9vw, 9rem) clamp(1.1rem, 4vw, 4.5rem);
  }

  .eyebrow {
    margin: 0;
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.35rem;
    padding: 0 1.55rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.11em;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1),
      border-color 0.45s cubic-bezier(0.19, 1, 0.22, 1),
      background 0.45s cubic-bezier(0.19, 1, 0.22, 1),
      color 0.45s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .button:hover {
    transform: translateY(-3px);
  }

  .button--dark {
    background: var(--ink);
    color: #ffffff;
    border-color: var(--ink);
  }

  .button--light {
    background: #ffffff;
    color: var(--ink);
  }

  .button--outline-light {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.22);
    background: transparent;
  }

  .button--outline-light:hover {
    color: var(--ink);
    background: #ffffff;
  }

  .contact-hero {
    position: relative;
    min-height: 100svh;
    padding: clamp(1rem, 2vw, 1.8rem) clamp(1.1rem, 4vw, 4.5rem)
      clamp(2rem, 5vw, 4rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: radial-gradient(circle at 78% 16%, rgba(77, 63, 46, 0.08), transparent 26%),
      linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
    isolation: isolate;
  }

  .contact-hero__grain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.34;
    z-index: -1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.16'/%3E%3C/svg%3E");
  }

  .contact-hero__topline {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.65rem;
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .contact-hero__content {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(21rem, 0.75fr);
    gap: clamp(2rem, 6vw, 7rem);
    align-items: end;
    margin: auto 0;
    padding: clamp(5rem, 11vw, 9rem) 0 clamp(3rem, 6vw, 5rem);
  }

  .contact-hero__copy h1 {
    max-width: 14ch;
    margin: 1.35rem 0 0;
    font-family: var(--font-kaykay-bodoni, Georgia, serif);
    font-size: clamp(4.2rem, 11.2vw, 12.5rem);
    font-weight: 500;
    letter-spacing: -0.085em;
    line-height: 0.82;
  }

  .contact-hero__description {
    max-width: 42rem;
    margin: 2rem 0 0;
    color: var(--muted);
    font-size: clamp(1rem, 1.45vw, 1.35rem);
    line-height: 1.75;
  }

  .contact-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 2.35rem;
  }

  .contact-hero__panel {
    min-height: clamp(22rem, 42vw, 36rem);
    border: 1px solid var(--line);
    border-radius: clamp(1.5rem, 3vw, 2.75rem);
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.72);
    box-shadow: 0 3rem 8rem rgba(25, 21, 16, 0.07);
    overflow: hidden;
  }

  .contact-hero__panel-inner {
    width: 100%;
    height: 100%;
    min-height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: clamp(1.2rem, 3vw, 2rem);
    border-radius: clamp(1.1rem, 2.4vw, 2.15rem);
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(247, 244, 239, 0.98)),
      radial-gradient(circle at 50% 20%, rgba(77, 63, 46, 0.1), transparent 42%);
  }

  .contact-hero__panel-inner p {
    margin: 0;
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .contact-hero__panel-inner h2 {
    margin: 1rem 0 1.4rem;
    font-family: var(--font-kaykay-bodoni, Georgia, serif);
    font-size: clamp(2.3rem, 4.8vw, 5.3rem);
    font-weight: 500;
    letter-spacing: -0.055em;
    line-height: 0.9;
  }

  .contact-hero__panel-inner button {
    align-self: flex-start;
    min-height: 2.8rem;
    padding: 0 1.2rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: #ffffff;
    color: var(--ink);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .contact-hero__word {
    position: absolute;
    left: clamp(1rem, 4vw, 4.5rem);
    bottom: -0.17em;
    z-index: -1;
    white-space: nowrap;
    color: rgba(25, 21, 16, 0.035);
    font-family: var(--font-kaykay-bodoni, Georgia, serif);
    font-size: clamp(5.5rem, 18vw, 23rem);
    letter-spacing: -0.1em;
    line-height: 0.8;
    pointer-events: none;
  }

  .contact-strip {
    overflow: hidden;
    border-block: 1px solid var(--line);
    background: #ffffff;
  }

  .contact-strip__track {
    display: flex;
    width: max-content;
    animation: marquee 34s linear infinite;
  }

  .contact-strip__track span {
    padding: 1rem 1.45rem;
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: clamp(2rem, 5vw, 4rem);
  }

  .section-heading h2,
  .contact-form-section__intro h2,
  .studio-map__content h2,
  .final-contact h2 {
    margin: 0;
    max-width: 12ch;
    font-family: var(--kh-font-family-ui, serif);
    font-size: clamp(3rem, 7vw, 8rem);
    font-weight: 300;
    letter-spacing: -0.075em;
    line-height: 0.88;
  }

  .contact-cards {
    margin-top: 20vh;
    background: #ffffff;
  }

  .contact-cards__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .contact-card {
    min-height: clamp(23rem, 34vw, 35rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: clamp(1.35rem, 3vw, 2.3rem);
    background: #ffffff;
    color: var(--ink);
    text-decoration: none;
    transition: background 0.6s cubic-bezier(0.19, 1, 0.22, 1),
      transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .contact-card:hover {
    background: var(--soft-2);
    transform: translateY(-0.35rem);
  }

  .contact-card span {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .contact-card h3 {
    margin: auto 0 1.2rem;
    max-width: 9ch;
    font-family: var(--kh-font-family-ui, serif);
    font-size: clamp(2.4rem, 4.8vw, 5.5rem);
    font-weight: 700;
    letter-spacing: -0.065em;
    line-height: 0.88;
  }

  .contact-card p {
    max-width: 22rem;
    margin: 0 0 2rem;
    color: var(--muted);
    font-size: 0.96rem;
    line-height: 1.72;
  }

  .contact-card strong {
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .contact-form-section {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(2rem, 6vw, 7rem);
    background: linear-gradient(180deg, #ffffff 0%, var(--soft-2) 100%);
  }

  .contact-form-section__intro {
    position: sticky;
    top: 2rem;
    align-self: start;
  }

  .contact-form-section__intro h2 {
    margin-top: 1rem;
  }

  .contact-form-section__intro p:not(.eyebrow) {
    max-width: 34rem;
    margin: 1.7rem 0 0;
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.78;
  }

  .contact-form-section__layout {
    display: grid;
    gap: 1rem;
  }

  .contact-form,
  .booking-note {
    border: 1px solid var(--line);
    border-radius: clamp(1.4rem, 3vw, 2.5rem);
    background: #ffffff;
    box-shadow: 0 2rem 6rem rgba(25, 21, 16, 0.05);
  }

  .contact-form {
    padding: clamp(1rem, 3vw, 2rem);
  }

  .field-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .contact-form label {
    display: grid;
    gap: 0.65rem;
    margin-bottom: 1rem;
  }

  .contact-form span {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .contact-form input,
  .contact-form select,
  .contact-form textarea {
    width: 100%;
    border: 1px solid var(--line);
    border-radius: 1.15rem;
    background: #ffffff;
    color: var(--ink);
    font: inherit;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease,
      background 0.3s ease;
  }

  .contact-form input,
  .contact-form select {
    min-height: 3.55rem;
    padding: 0 1rem;
  }

  .contact-form textarea {
    resize: vertical;
    padding: 1rem;
  }

  .contact-form input:focus,
  .contact-form select:focus,
  .contact-form textarea:focus {
    border-color: var(--line-strong);
    background: var(--soft-2);
    box-shadow: 0 0 0 0.25rem rgba(77, 63, 46, 0.05);
  }

  .contact-form__submit {
    width: 100%;
    margin-top: 0.25rem;
  }

  .booking-note {
    padding: clamp(1.25rem, 3vw, 2rem);
  }

  .booking-note__label {
    margin: 0;
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .booking-note h3 {
    max-width: 18rem;
    margin: 1rem 0 1.6rem;
    font-family: var(--font-kaykay-bodoni, Georgia, serif);
    font-size: clamp(2.2rem, 4.5vw, 4.6rem);
    font-weight: 500;
    letter-spacing: -0.065em;
    line-height: 0.9;
  }

  .booking-note ul {
    display: grid;
    gap: 0.85rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .booking-note li {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    color: var(--muted);
    line-height: 1.55;
  }

  .booking-note li::before {
    content: "";
    width: 0.45rem;
    height: 0.45rem;
    flex: 0 0 auto;
    border-radius: 999px;
    background: var(--ink);
  }

  .studio-map {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: center;
    background: #ffffff;
  }

  .studio-map__content p:not(.eyebrow) {
    max-width: 32rem;
    margin: 1.65rem 0 0;
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.78;
  }

  .studio-map__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 2rem;
  }

  .studio-map__visual {
    position: relative;
    min-height: clamp(27rem, 53vw, 46rem);
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: clamp(1.5rem, 3vw, 3rem);
    background: var(--soft-2);
    color: var(--ink);
    text-decoration: none;
  }

  .studio-map__grid {
    position: absolute;
    inset: -1rem;
    background-image: linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 3.2rem 3.2rem;
    opacity: 0.9;
  }

  .studio-map__visual::before,
  .studio-map__visual::after {
    content: "";
    position: absolute;
    border: 1px solid rgba(25, 21, 16, 0.12);
    border-radius: 999px;
  }

  .studio-map__visual::before {
    width: 65%;
    aspect-ratio: 1;
    left: 12%;
    top: 14%;
  }

  .studio-map__visual::after {
    width: 38%;
    aspect-ratio: 1;
    right: 10%;
    bottom: 12%;
  }

  .studio-map__pin {
    position: absolute;
    left: 52%;
    top: 45%;
    width: 5.5rem;
    height: 5.5rem;
    display: grid;
    place-items: center;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    background: rgba(25, 21, 16, 0.08);
  }

  .studio-map__pin span {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 999px;
    background: var(--ink);
    box-shadow: 0 0 0 1rem rgba(25, 21, 16, 0.06),
      0 0 0 2rem rgba(25, 21, 16, 0.035);
  }

  .studio-map__card {
    position: absolute;
    left: clamp(1rem, 3vw, 2rem);
    right: clamp(1rem, 3vw, 2rem);
    bottom: clamp(1rem, 3vw, 2rem);
    display: grid;
    gap: 0.65rem;
    padding: clamp(1rem, 3vw, 1.5rem);
    border: 1px solid var(--line);
    border-radius: 1.4rem;
    background: rgba(255, 255, 255, 0.84);
    backdrop-filter: blur(18px);
  }

  .studio-map__card span {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .studio-map__card strong {
    max-width: 36rem;
    font-family: var(--font-kaykay-bodoni, Georgia, serif);
    font-size: clamp(2rem, 4.5vw, 4.8rem);
    font-weight: 500;
    letter-spacing: -0.065em;
    line-height: 0.9;
  }

  .studio-rhythm {
    background: var(--soft-2);
  }

  .studio-rhythm__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .studio-rhythm__item {
    min-height: 17rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: clamp(1.2rem, 3vw, 2rem);
    background: #ffffff;
  }

  .studio-rhythm__item span {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .studio-rhythm__item h3 {
    max-width: 9ch;
    margin: 0;
    font-family: var(--font-kaykay-bodoni, Georgia, serif);
    font-size: clamp(2.3rem, 4.6vw, 5.3rem);
    font-weight: 500;
    letter-spacing: -0.065em;
    line-height: 0.88;
  }

  .final-contact {
    margin: clamp(1rem, 4vw, 4.5rem);
    min-height: clamp(33rem, 55vw, 50rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: clamp(1.3rem, 4vw, 3rem);
    border-radius: clamp(1.5rem, 3vw, 3rem);
    background: radial-gradient(circle at 72% 18%, rgba(255, 255, 255, 0.16), transparent 28%),
      var(--coffee);
    color: #ffffff;
  }

  .final-contact p {
    margin: 0;
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .final-contact h2 {
    max-width: 11ch;
    color: #ffffff;
  }

  .final-contact div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 980px) {
    .contact-hero__content,
    .contact-form-section,
    .studio-map {
      grid-template-columns: 1fr;
    }

    .contact-hero__panel {
      min-height: 24rem;
    }

    .contact-form-section__intro {
      position: static;
    }

    .contact-cards__grid,
    .studio-rhythm__grid {
      grid-template-columns: 1fr;
    }

    .contact-card,
    .studio-rhythm__item {
      min-height: 18rem;
    }
  }

  @media (max-width: 680px) {
    .contact-hero__topline,
    .section-heading {
      align-items: flex-start;
      flex-direction: column;
    }

    .contact-hero__content {
      padding-top: 4rem;
    }

    .contact-hero__copy h1 {
      font-size: clamp(4rem, 19vw, 7rem);
    }

    .field-grid {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .contact-form input,
    .contact-form select {
      min-height: 3.25rem;
    }

    .button {
      width: 100%;
    }

    .studio-map__actions,
    .contact-hero__actions,
    .final-contact div {
      width: 100%;
    }
  }
`;