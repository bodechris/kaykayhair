"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";

import PageMenuPlaceholder from "@/components/PageMenuPlaceholder";

type CarePlusPlanSlug = "essential" | "glow" | "signature";

const carePlusPlans: {
  slug: CarePlusPlanSlug;
  eyebrow: string;
  title: string;
  price: string;
  description: string;
  mood: string;
  includes: string[];
  bestFor: string;
}[] = [
  {
    slug: "essential",
    eyebrow: "Starter care",
    title: "Essential Care",
    price: "From R650 / month",
    description:
      "A simple monthly beauty maintenance plan for clients who want healthy hair, neat styling, and easier booking without overthinking wash day.",
    mood: "Clean, soft, everyday polish",
    bestFor: "Protective styles, basic maintenance, and consistent hair care.",
    includes: [
      "1 monthly wash and treatment",
      "Priority weekday booking",
      "10% off selected products",
      "Monthly style check-in",
    ],
  },
  {
    slug: "glow",
    eyebrow: "Most loved",
    title: "Glow Club",
    price: "From R950 / month",
    description:
      "For working women who need their hair to stay salon-fresh through meetings, events, school runs, weekends, and everything in between.",
    mood: "Premium maintenance, always ready",
    bestFor:
      "Wig care, installs, treatments, touch-ups, and polished weekly looks.",
    includes: [
      "2 monthly care appointments",
      "Wig refresh or treatment option",
      "Priority weekend booking access",
      "15% off selected products",
    ],
  },
  {
    slug: "signature",
    eyebrow: "Luxury care",
    title: "Signature Plus",
    price: "Custom monthly plan",
    description:
      "A high-touch beauty plan for clients who want hair, makeup, nails, and event-ready styling managed by Kaykay Hair as one polished routine.",
    mood: "Full beauty management",
    bestFor:
      "Bridal prep, event seasons, executive beauty routines, and VIP maintenance.",
    includes: [
      "Personal beauty plan consultation",
      "Hair, makeup, manicure or pedicure options",
      "VIP booking support",
      "Exclusive product and service savings",
    ],
  },
];

const carePlusSteps = [
  {
    count: "01",
    title: "Choose your rhythm",
    description:
      "Pick the monthly plan that matches how often you want your hair and beauty routine maintained.",
  },
  {
    count: "02",
    title: "Book with priority",
    description:
      "Care Plus members get easier access to the best appointment slots before peak demand fills the calendar.",
  },
  {
    count: "03",
    title: "Stay polished monthly",
    description:
      "Come in for your planned treatments, wig care, installs, makeup, nails, or maintenance services.",
  },
  {
    count: "04",
    title: "Refresh your look",
    description:
      "Review your routine with Kaykay Hair and adjust your plan as your style, events, and hair goals change.",
  },
];

const carePlusPerks = [
  "Priority booking access",
  "Monthly hair-care consistency",
  "Member-only beauty savings",
  "Wig install and revamp support",
  "Makeup, manicure, and pedicure add-ons",
  "Personal recommendations for your hair goals",
];

export default function CarePlusPage() {
  const [selectedPlanSlug, setSelectedPlanSlug] =
    useState<CarePlusPlanSlug>("glow");

  const selectedPlan = useMemo(() => {
    return (
      carePlusPlans.find((plan) => plan.slug === selectedPlanSlug) ||
      carePlusPlans[1]
    );
  }, [selectedPlanSlug]);

  return (
    <PageMenuPlaceholder title="Care Plus" width="90%">
      <CarePlusWrapper aria-label="Kaykay Hair Care Plus Beauty Club">
        <section
          className="careplus-hero"
          aria-labelledby="careplus-hero-title"
        >
          <div className="careplus-hero__content">
            <span className="eyebrow">Kaykay Hair Membership</span>
            <h1 id="careplus-hero-title">Care Plus Beauty Club</h1>
            <p>
              Your monthly beauty maintenance plan for consistent hair care,
              easier bookings, polished styling, and a look that stays fresh all
              month.
            </p>

            <div
              className="careplus-hero__ctas"
              aria-label="Care Plus main actions"
            >
              <a className="primary-link" href="/book?service=care-plus">
                Join Care Plus
              </a>
              <a className="secondary-link" href="#careplus-plans">
                View plans
              </a>
            </div>
          </div>

          <div className="careplus-hero__visual" aria-hidden="true">
            <div className="visual-card visual-card--main">
              <span>Monthly</span>
              <strong>Hair care</strong>
            </div>
            <div className="visual-card visual-card--small visual-card--top">
              <span>Wig</span>
              <strong>Refresh</strong>
            </div>
            <div className="visual-card visual-card--small visual-card--bottom">
              <span>Beauty</span>
              <strong>Polish</strong>
            </div>
          </div>
        </section>

        <section className="careplus-intro" aria-label="Care Plus promise">
          <p>
            Care Plus is built for black women who want their beauty routine to
            feel planned, premium, and stress-free. Instead of booking only when
            your hair becomes urgent, Kaykay Hair helps you maintain your look
            with a monthly rhythm.
          </p>
        </section>

        <section id="careplus-plans" aria-labelledby="careplus-plans-title">
          <div className="section-heading">
            <span className="eyebrow">Membership plans</span>
            <h2 id="careplus-plans-title">Choose your monthly beauty rhythm</h2>
          </div>

          <ul
            className="careplus-plan-grid"
            aria-label="Care Plus membership plans"
          >
            {carePlusPlans.map((plan) => {
              const selected = selectedPlanSlug === plan.slug;
              const titleId = `careplus-plan-title-${plan.slug}`;
              const descriptionId = `careplus-plan-description-${plan.slug}`;

              return (
                <li key={plan.slug}>
                  <article
                    className={`careplus-card ${selected ? "selected-card" : ""}`}
                    aria-labelledby={titleId}
                  >
                    <div className="careplus-card__media">
                      <span>{plan.eyebrow}</span>
                      <strong>{plan.mood}</strong>
                    </div>

                    <div className="careplus-card__content">
                      <span className="careplus-card__eyebrow">
                        {plan.eyebrow}
                      </span>
                      <h3 id={titleId}>{plan.title}</h3>
                      <p id={descriptionId}>{plan.description}</p>
                      <strong className="careplus-card__price">
                        {plan.price}
                      </strong>

                      <div className="careplus-card__best-for">
                        <span>Best for</span>
                        <p>{plan.bestFor}</p>
                      </div>

                      <ul
                        className="careplus-card__includes"
                        aria-label={`${plan.title} includes`}
                      >
                        {plan.includes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="careplus-card__ctas">
                      <button
                        type="button"
                        aria-pressed={selected}
                        aria-labelledby={titleId}
                        aria-describedby={descriptionId}
                        onClick={() => setSelectedPlanSlug(plan.slug)}
                      >
                        {selected ? "Selected plan" : "Select this plan"}
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          className="selected-plan-tray"
          aria-live="polite"
          aria-label="Selected Care Plus plan"
        >
          <div>
            <span>Selected plan</span>
            <strong>{selectedPlan.title}</strong>
            <p>{selectedPlan.price}</p>
          </div>
          <a href={`/book?service=care-plus&plan=${selectedPlan.slug}`}>
            Book consultation
          </a>
        </section>

        <section
          className="careplus-routine"
          aria-labelledby="careplus-routine-title"
        >
          <div className="section-heading section-heading--wide">
            <span className="eyebrow">How it works</span>
            <h2 id="careplus-routine-title">
              A beauty routine that runs before life gets busy
            </h2>
          </div>

          <ol className="routine-grid">
            {carePlusSteps.map((step) => (
              <li key={step.count}>
                <article>
                  <span>{step.count}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="careplus-split"
          aria-labelledby="careplus-perks-title"
        >
          <div className="careplus-split__media" aria-hidden="true">
            <span>Care</span>
            <strong>Plus</strong>
          </div>

          <div className="careplus-split__content">
            <span className="eyebrow">Member benefits</span>
            <h2 id="careplus-perks-title">
              The easiest way to stay salon-fresh
            </h2>
            <p>
              Care Plus gives Kaykay Hair clients a more intentional way to
              manage beauty. Use it for protective styling, wig installs,
              treatments, event prep, makeup, manicure, pedicure, and everyday
              polish.
            </p>

            <ul className="perks-list">
              {carePlusPerks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>

            <a className="primary-link" href="/book?service=care-plus">
              Start my Care Plus plan
            </a>
          </div>
        </section>
      </CarePlusWrapper>
    </PageMenuPlaceholder>
  );
}

const CarePlusWrapper = styled.main`
  width: 100%;
  height: auto;
  position: relative;
  padding: 2rem;
  color: #171313;

  --careplus-dark: #171313;
  --careplus-cream: #fbf5ee;
  --careplus-sand: #d8c4aa;
  --careplus-cocoa: #4d3f2e;
  --careplus-rose: #dd3f6f;
  --careplus-border: rgba(23, 19, 19, 0.08);
  --careplus-shadow: 0px 20px 60px 2px rgba(0, 0, 0, 0.06);
  --careplus-ease: cubic-bezier(0.16, 1, 0.3, 1);

  .eyebrow {
    width: max-content;
    display: inline-flex;
    align-items: center;
    border: 0.5px solid var(--careplus-border);
    border-radius: 999px;
    padding: 0.65rem 1rem;
    font-family: var(--kh-font-family-ui);
    font-size: clamp(10px, 1.2vw, 12px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.7);
  }

  h1,
  h2,
  h3,
  p,
  a,
  button,
  li,
  strong,
  span {
    font-family: var(--kh-font-family-ui);
  }

  h1,
  h2,
  h3,
  p,
  ul,
  ol {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  .primary-link,
  .secondary-link,
  button {
    width: max-content;
    min-height: 52px;
    border: 0.5px solid #f7f7f7;
    border-radius: 999px;
    padding: 1rem 1.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    font-size: 0.85rem;
    line-height: 1;
    cursor: pointer;
    -webkit-box-shadow: 0px 10px 30px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 0px 10px 30px 2px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 10px 30px 2px rgba(0, 0, 0, 0.05);
    -webkit-transition: all 0.4s var(--careplus-ease);
    -moz-transition: all 0.4s var(--careplus-ease);
    -ms-transition: all 0.4s var(--careplus-ease);
    transition: all 0.4s var(--careplus-ease);
  }

  .primary-link,
  button {
    background: #fff;
    color: #222;
  }

  .secondary-link {
    background: transparent;
    color: #fff;
    border-color: rgba(255, 255, 255, 0.22);
    box-shadow: none;
  }

  .primary-link:hover,
  button:hover,
  .primary-link:focus-visible,
  button:focus-visible {
    background: #111;
    color: #fff;
    outline: none;
    transform: translateY(-2px);
  }

  .secondary-link:hover,
  .secondary-link:focus-visible {
    background: rgba(255, 255, 255, 0.12);
    outline: none;
  }

  .careplus-hero {
    width: 100%;
    min-height: 88vh;
    position: relative;
    overflow: hidden;
    border: 0.5px solid #f7f7f7;
    border-radius: 2rem;
    padding: clamp(1.25rem, 4vw, 4rem);
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(320px, 1fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: stretch;
    background:
      radial-gradient(
        circle at 72% 18%,
        rgba(221, 63, 111, 0.2),
        transparent 26%
      ),
      radial-gradient(
        circle at 15% 72%,
        rgba(216, 196, 170, 0.28),
        transparent 32%
      ),
      linear-gradient(135deg, #4d3f2e 0%, #201817 46%, #0f0d0d 100%);
    color: #fff;
    -webkit-box-shadow: 0px 20px 30px 2px rgba(0, 0, 0, 0);
    -moz-box-shadow: 0px 20px 30px 2px rgba(0, 0, 0, 0);
    box-shadow: 0px 20px 30px 2px rgba(0, 0, 0, 0);
    -webkit-transition: all 0.4s var(--careplus-ease);
    -moz-transition: all 0.4s var(--careplus-ease);
    -ms-transition: all 0.4s var(--careplus-ease);
    transition: all 0.4s var(--careplus-ease);
  }

  .careplus-hero::before {
    content: "";
    position: absolute;
    inset: -20%;
    background:
      linear-gradient(
        100deg,
        transparent 12%,
        rgba(255, 255, 255, 0.06) 13%,
        transparent 14%
      ),
      linear-gradient(
        100deg,
        transparent 28%,
        rgba(255, 255, 255, 0.04) 29%,
        transparent 30%
      ),
      linear-gradient(
        100deg,
        transparent 58%,
        rgba(255, 255, 255, 0.05) 59%,
        transparent 60%
      );
    transform: rotate(-8deg);
    pointer-events: none;
  }

  .careplus-hero:hover {
    border-color: #eee;
    box-shadow: var(--careplus-shadow);
  }

  .careplus-hero__content {
    min-height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .careplus-hero__content h1 {
    max-width: 780px;
    font-size: clamp(54px, 10vw, 150px);
    font-weight: 300;
    line-height: 0.82;
    letter-spacing: -0.08em;
  }

  .careplus-hero__content p {
    max-width: 620px;
    font-size: clamp(16px, 2vw, 24px);
    font-weight: 300;
    line-height: 1.35;
    color: rgba(255, 255, 255, 0.76);
  }

  .careplus-hero__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 1rem;
  }

  .careplus-hero__visual {
    position: relative;
    z-index: 1;
    min-height: 560px;
  }

  .visual-card {
    position: absolute;
    overflow: hidden;
    border: 0.5px solid rgba(255, 255, 255, 0.14);
    border-radius: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background:
      radial-gradient(
        circle at 24% 16%,
        rgba(255, 255, 255, 0.22),
        transparent 30%
      ),
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.04)
      );
    backdrop-filter: blur(18px);
    box-shadow: 0px 30px 80px rgba(0, 0, 0, 0.18);
    -webkit-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
    -moz-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
    -ms-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
    transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
  }

  .visual-card::before {
    content: "";
    position: absolute;
    inset: 1rem;
    border-radius: 1.4rem;
    background:
      radial-gradient(
        circle at 50% 20%,
        rgba(255, 255, 255, 0.22),
        transparent 20%
      ),
      linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.18));
    pointer-events: none;
  }

  .visual-card span,
  .visual-card strong {
    position: relative;
    z-index: 1;
  }

  .visual-card span {
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.65);
  }

  .visual-card strong {
    max-width: 220px;
    font-size: clamp(30px, 4vw, 58px);
    font-weight: 300;
    line-height: 0.92;
    letter-spacing: -0.05em;
  }

  .visual-card--main {
    inset: 0 8% 0 0;
    min-height: 100%;
  }

  .visual-card--small {
    width: min(42%, 240px);
    min-height: 220px;
  }

  .visual-card--top {
    top: 7%;
    right: 0;
    transform: rotate(4deg);
  }

  .visual-card--bottom {
    left: -4%;
    bottom: 8%;
    transform: rotate(-4deg);
  }

  .careplus-hero:hover .visual-card--main {
    transform: scale(1.02) rotate(1deg);
  }

  .careplus-hero:hover .visual-card--top {
    transform: rotate(1deg) translateY(-8px);
  }

  .careplus-hero:hover .visual-card--bottom {
    transform: rotate(-1deg) translateY(8px);
  }

  .careplus-intro {
    padding: clamp(2rem, 6vw, 6rem) 0;
  }

  .careplus-intro p {
    max-width: 1100px;
    font-size: clamp(28px, 5vw, 70px);
    font-weight: 300;
    line-height: 0.98;
    letter-spacing: -0.06em;
    color: var(--careplus-dark);
  }

  .section-heading {
    width: 100%;
    max-width: 760px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .section-heading--wide {
    max-width: 950px;
  }

  .section-heading h2 {
    font-size: clamp(38px, 7vw, 90px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.07em;
  }

  .careplus-plan-grid {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
    position: relative;
    gap: 2rem;
    padding: 0;
    list-style: none;
  }

  .careplus-card {
    width: 100%;
    min-height: 90vh;
    overflow: hidden;
    position: relative;
    padding: 2rem;
    border: 0.5px solid #f7f7f7;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #fff;
    -webkit-box-shadow: 0px 20px 30px 2px rgba(0, 0, 0, 0);
    -moz-box-shadow: 0px 20px 30px 2px rgba(0, 0, 0, 0);
    box-shadow: 0px 20px 30px 2px rgba(0, 0, 0, 0);
    -webkit-transition: all 0.4s var(--careplus-ease);
    -moz-transition: all 0.4s var(--careplus-ease);
    -ms-transition: all 0.4s var(--careplus-ease);
    transition: all 0.4s var(--careplus-ease);
  }

  .careplus-card.selected-card {
    border: 8px solid #eee;
  }

  .careplus-card:hover {
    border-color: #eee;
    box-shadow: var(--careplus-shadow);
  }

  .careplus-card:hover.selected-card {
    border-color: rgba(221, 63, 111, 0.74);
  }

  .careplus-card__media {
    border-radius: 1rem;
    width: 100%;
    min-height: 42vh;
    overflow: hidden;
    position: relative;
    margin-bottom: 10px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background:
      radial-gradient(
        circle at 24% 20%,
        rgba(255, 255, 255, 0.5),
        transparent 24%
      ),
      radial-gradient(
        circle at 78% 10%,
        rgba(221, 63, 111, 0.16),
        transparent 24%
      ),
      linear-gradient(
        140deg,
        var(--careplus-cream),
        var(--careplus-sand) 52%,
        var(--careplus-cocoa)
      );
    color: #fff;
    -webkit-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
    -moz-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
    -ms-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
    transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
  }

  .careplus-card__media::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        100deg,
        transparent 14%,
        rgba(255, 255, 255, 0.18) 15%,
        transparent 16%
      ),
      linear-gradient(
        100deg,
        transparent 48%,
        rgba(255, 255, 255, 0.14) 49%,
        transparent 50%
      ),
      linear-gradient(180deg, transparent 45%, rgba(0, 0, 0, 0.22));
    pointer-events: none;
  }

  .careplus-card:hover .careplus-card__media {
    transform: scale(1.03) rotate(1deg);
  }

  .careplus-card__media span,
  .careplus-card__media strong {
    position: relative;
    z-index: 1;
  }

  .careplus-card__media span {
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.76);
  }

  .careplus-card__media strong {
    max-width: 320px;
    font-size: clamp(32px, 4.5vw, 62px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.07em;
  }

  .careplus-card__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
  }

  .careplus-card__eyebrow {
    width: max-content;
    border: 0.5px solid var(--careplus-border);
    border-radius: 999px;
    padding: 0.55rem 0.85rem;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    line-height: 1;
    text-transform: uppercase;
    color: rgba(23, 19, 19, 0.65);
  }

  .careplus-card h3 {
    font-size: clamp(30px, 4vw, 54px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.06em;
    position: relative;
  }

  .careplus-card p {
    font-size: clamp(13px, 1.5vw, 15px);
    position: relative;
    line-height: 1.5;
    color: rgba(23, 19, 19, 0.68);
  }

  .careplus-card__price {
    font-size: clamp(18px, 2vw, 28px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .careplus-card__best-for {
    border-top: 0.5px solid var(--careplus-border);
    border-bottom: 0.5px solid var(--careplus-border);
    padding: 1rem 0;
  }

  .careplus-card__best-for span {
    display: block;
    margin-bottom: 0.4rem;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(23, 19, 19, 0.45);
  }

  .careplus-card__includes {
    display: grid;
    gap: 0.65rem;
    padding: 0;
    list-style: none;
  }

  .careplus-card__includes li,
  .perks-list li {
    position: relative;
    padding-left: 1.2rem;
    font-size: 0.9rem;
    line-height: 1.4;
    color: rgba(23, 19, 19, 0.72);
  }

  .careplus-card__includes li::before,
  .perks-list li::before {
    content: "";
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    left: 0;
    top: 0.48rem;
    border-radius: 999px;
    background: var(--careplus-rose);
  }

  .careplus-card__ctas {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
  }

  .selected-plan-tray {
    width: min(100%, 720px);
    position: sticky;
    bottom: 1.25rem;
    z-index: 5;
    margin: 2rem auto 0;
    border: 0.5px solid rgba(255, 255, 255, 0.7);
    border-radius: 999px;
    padding: 0.7rem 0.7rem 0.7rem 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(18px);
    box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.08);
  }

  .selected-plan-tray div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
  }

  .selected-plan-tray span {
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(23, 19, 19, 0.45);
  }

  .selected-plan-tray strong {
    font-size: 1rem;
    font-weight: 900;
    white-space: nowrap;
  }

  .selected-plan-tray p {
    font-size: 0.85rem;
    color: rgba(23, 19, 19, 0.6);
    white-space: nowrap;
  }

  .selected-plan-tray a {
    min-height: 46px;
    border-radius: 999px;
    padding: 0.9rem 1.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #111;
    color: #fff;
    font-size: 0.82rem;
    font-weight: 900;
    white-space: nowrap;
  }

  .careplus-routine {
    padding: clamp(4rem, 8vw, 8rem) 0;
  }

  .routine-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    gap: 1rem;
    list-style: none;
    padding: 0;
  }

  .routine-grid article {
    min-height: 300px;
    border: 0.5px solid #f7f7f7;
    border-radius: 2rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0px 20px 30px 2px rgba(0, 0, 0, 0);
    transition: all 0.4s var(--careplus-ease);
  }

  .routine-grid article:hover {
    border-color: #eee;
    box-shadow: var(--careplus-shadow);
    transform: translateY(-3px);
  }

  .routine-grid span {
    font-size: clamp(40px, 6vw, 84px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.08em;
    color: rgba(221, 63, 111, 0.82);
  }

  .routine-grid h3 {
    max-width: 240px;
    font-size: clamp(24px, 3vw, 38px);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.06em;
  }

  .routine-grid p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(23, 19, 19, 0.65);
  }

  .careplus-split {
    min-height: 90vh;
    display: grid;
    grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1fr);
    gap: 2rem;
    align-items: stretch;
  }

  .careplus-split__media,
  .careplus-split__content {
    border: 0.5px solid #f7f7f7;
    border-radius: 2rem;
    overflow: hidden;
  }

  .careplus-split__media {
    min-height: 70vh;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background:
      radial-gradient(
        circle at 70% 18%,
        rgba(221, 63, 111, 0.24),
        transparent 26%
      ),
      radial-gradient(
        circle at 20% 30%,
        rgba(255, 255, 255, 0.28),
        transparent 18%
      ),
      linear-gradient(140deg, #fbf5ee 0%, #d8c4aa 46%, #4d3f2e 100%);
    color: #fff;
  }

  .careplus-split__media span {
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.78);
  }

  .careplus-split__media strong {
    font-size: clamp(70px, 14vw, 180px);
    font-weight: 300;
    line-height: 0.8;
    letter-spacing: -0.1em;
  }

  .careplus-split__content {
    padding: clamp(1.5rem, 4vw, 4rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.25rem;
    background: var(--careplus-cream);
  }

  .careplus-split__content h2 {
    max-width: 720px;
    font-size: clamp(42px, 8vw, 100px);
    font-weight: 300;
    line-height: 0.88;
    letter-spacing: -0.08em;
  }

  .careplus-split__content p {
    max-width: 680px;
    font-size: clamp(15px, 1.7vw, 20px);
    line-height: 1.45;
    color: rgba(23, 19, 19, 0.66);
  }

  .perks-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem 1.2rem;
    padding: 1rem 0;
    list-style: none;
  }

  @media (max-width: 980px) {
    padding: 1rem;

    .careplus-hero,
    .careplus-split {
      grid-template-columns: 1fr;
    }

    .careplus-hero {
      min-height: auto;
    }

    .careplus-hero__visual {
      min-height: 520px;
    }

    .visual-card--main {
      inset: 0;
    }

    .selected-plan-tray {
      border-radius: 1.5rem;
      align-items: flex-start;
    }

    .selected-plan-tray,
    .selected-plan-tray div {
      flex-direction: column;
    }

    .selected-plan-tray a {
      width: 100%;
    }
  }

  @media (max-width: 640px) {
    padding: 0.75rem;

    .careplus-hero,
    .careplus-card,
    .routine-grid article,
    .careplus-split__media,
    .careplus-split__content {
      border-radius: 1.4rem;
    }

    .careplus-hero {
      padding: 1.25rem;
    }

    .careplus-hero__content h1 {
      font-size: clamp(48px, 18vw, 86px);
    }

    .careplus-hero__visual {
      min-height: 420px;
    }

    .visual-card,
    .careplus-card {
      padding: 1.25rem;
    }

    .visual-card--small {
      width: 48%;
      min-height: 170px;
    }

    .careplus-card {
      min-height: auto;
    }

    .careplus-card__media {
      min-height: 320px;
    }

    .careplus-intro p {
      line-height: 1;
    }

    .perks-list {
      grid-template-columns: 1fr;
    }
  }
`;
