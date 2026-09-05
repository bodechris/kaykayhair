"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "styled-components";

import PageMenuPlaceholder from "@/components/PageMenuPlaceholder";

type ProductCategory = "All" | "Wigs" | "Hair Care" | "Edge & Finish" | "Kits";

type ShopProduct = {
  id: string;
  name: string;
  category: Exclude<ProductCategory, "All">;
  price: string;
  eyebrow: string;
  description: string;
  finish: string;
  accent: string;
  tag: string;
};

const productCategories: ProductCategory[] = [
  "All",
  "Wigs",
  "Hair Care",
  "Edge & Finish",
  "Kits",
];

const featuredProducts: ShopProduct[] = [
  {
    id: "lace-glow-wig",
    name: "Lace Glow Unit",
    category: "Wigs",
    price: "From R1,850",
    eyebrow: "Ready-to-wear wig",
    description:
      "A soft, polished lace unit prepared for everyday luxury, work days, date nights, and weekend confidence.",
    finish: "Natural hairline / Soft body wave",
    accent: "#f5e9df",
    tag: "Best seller",
  },
  {
    id: "moisture-reset",
    name: "Moisture Reset Duo",
    category: "Hair Care",
    price: "R420",
    eyebrow: "Wash day care",
    description:
      "A nourishing shampoo and treatment pairing created to help restore softness, manage dryness, and prepare hair for styling.",
    finish: "Hydrating / Gentle / Salon approved",
    accent: "#eef2ed",
    tag: "Care essential",
  },
  {
    id: "edge-polish-kit",
    name: "Edge Polish Kit",
    category: "Edge & Finish",
    price: "R260",
    eyebrow: "Daily finishing kit",
    description:
      "Everything you need for sleek edges, neat parting, and quick morning touch-ups before you step out.",
    finish: "Sleek hold / Clean finish",
    accent: "#f8eeee",
    tag: "Quick touch-up",
  },
  {
    id: "wig-revival-kit",
    name: "Wig Revival Kit",
    category: "Kits",
    price: "R590",
    eyebrow: "Home refresh ritual",
    description:
      "A curated maintenance kit for refreshing your favourite unit between salon appointments and keeping it photo-ready.",
    finish: "Detangle / Shine / Protect",
    accent: "#f7f2e8",
    tag: "New ritual",
  },
  {
    id: "silk-press-serum",
    name: "Silk Press Serum",
    category: "Hair Care",
    price: "R210",
    eyebrow: "Heat styling support",
    description:
      "A lightweight finishing serum for shine, movement, and a silky salon feel without weighing the hair down.",
    finish: "Lightweight / Gloss / Smooth",
    accent: "#eef0f6",
    tag: "Gloss finish",
  },
  {
    id: "premium-bonnet",
    name: "Premium Satin Bonnet",
    category: "Edge & Finish",
    price: "R180",
    eyebrow: "Night care essential",
    description:
      "A protective satin bonnet that helps preserve your install, reduce friction, and keep your look fresh for longer.",
    finish: "Soft satin / Protective / Easy care",
    accent: "#f3edf6",
    tag: "Protective care",
  },
];

const shopRituals = [
  {
    count: "01",
    title: "Discover the finish",
    description:
      "Shop by the look you want first: polished wig install, healthy hair routine, sleek edges, or at-home refresh.",
  },
  {
    count: "02",
    title: "Pair product with service",
    description:
      "Every product is positioned around Kaykay Hair services, so clients know exactly what to use before and after appointments.",
  },
  {
    count: "03",
    title: "Keep the routine simple",
    description:
      "The shop avoids clutter. It highlights fewer, stronger products that support repeat beauty routines and monthly Care Plus plans.",
  },
];

export default function ShopPage() {
  const pageRef = useRef<HTMLElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const productTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") return featuredProducts;
    return featuredProducts.filter(
      (product) => product.category === activeCategory,
    );
  }, [activeCategory]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", { y: 44, opacity: 0 });
      gsap.set("[data-float-card]", { y: 70, opacity: 0, rotate: 0.001 });

      gsap.to("[data-reveal]", {
        y: 0,
        opacity: 1,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top 78%",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
        const items = section.querySelectorAll("[data-section-reveal]");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 76%",
            },
          },
        );
      });

      if (heroVisualRef.current) {
        gsap.to(heroVisualRef.current, {
          yPercent: -12,
          rotate: -2,
          ease: "none",
          scrollTrigger: {
            trigger: heroVisualRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.utils
        .toArray<HTMLElement>("[data-product-card]")
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 86, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power4.out",
              delay: index * 0.03,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
            },
          );

          const bottle = card.querySelector("[data-product-bottle]");
          if (bottle) {
            gsap.to(bottle, {
              yPercent: -14,
              rotate: index % 2 === 0 ? 3 : -3,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        });

      if (productTrackRef.current) {
        gsap.to(productTrackRef.current, {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: productTrackRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.to("[data-marquee]", {
        xPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-marquee-wrap]",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to("[data-float-card]", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".shop-editorial",
          start: "top 66%",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <PageMenuPlaceholder title="Shop" width="90%">
      <ShopWrapper ref={pageRef} aria-label="Kaykay Hair Shop">

        <section
          id="shop-products"
          className="shop-products"
          data-section
          aria-labelledby="shop-products-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow" data-section-reveal>
                Kaykay Hair Shop
              </span>
              <h2 id="shop-products-title" data-section-reveal>
                Products that keeps you confident everyday!
              </h2>
            </div>
            <p data-section-reveal>
              Choose any beauty products below. Add to cart. Pay. 
            </p>
          </div>

          <div
            className="category-bar"
            aria-label="Filter shop products"
            data-section-reveal
          >
            {productCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "is-active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-grid" ref={productTrackRef}>
            {visibleProducts.map((product, index) => (
              <article
                className="product-card"
                key={product.id}
                data-product-card
                style={{ "--product-accent": product.accent } as CSSProperties}
              >
                <div className="product-card__media">
                  <span className="product-card__tag">{product.tag}</span>
                  <div
                    className="product-bottle"
                    data-product-bottle
                    aria-hidden="true"
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </div>

                <div className="product-card__body">
                  <span className="product-card__eyebrow">
                    {product.eyebrow}
                  </span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-card__meta">
                    <span>{product.finish}</span>
                    <strong>{product.price}</strong>
                  </div>
                </div>

                <div className="product-card__footer">
                  <a href={`/shop/${product.id}`}>View product</a>
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="shop-editorial"
          data-section
          aria-labelledby="shop-editorial-title"
        >
          <div
            className="shop-editorial__image"
            data-section-reveal
            aria-hidden="true"
          >
            <div
              className="editorial-object editorial-object--one"
              data-float-card
            >
              <span>Aftercare</span>
            </div>
            <div
              className="editorial-object editorial-object--two"
              data-float-card
            >
              <span>Shine</span>
            </div>
          </div>

          <div className="shop-editorial__content">
            <span className="eyebrow" data-section-reveal>
              The shelf strategy
            </span>
            <h2 id="shop-editorial-title" data-section-reveal>
              Sell the routine, not just the product.
            </h2>
            <p data-section-reveal>
              Each product page should connect to a clear beauty moment: install
              aftercare, wash-day recovery, sleek finishing, travel care, bridal
              prep, or monthly Care Plus maintenance.
            </p>
            <a
              className="primary-link primary-link--dark"
              href="/care-plus"
              data-section-reveal
            >
              Explore Care Plus
            </a>
          </div>
        </section>

        

        <section
          className="shop-cta"
          data-section
          aria-labelledby="shop-cta-title"
        >
          <span className="eyebrow" data-section-reveal>
            Launch the shop softly
          </span>
          <h2 id="shop-cta-title" data-section-reveal>
            Start with hero products, then let client demand decide the next
            shelf.
          </h2>
          <p data-section-reveal>
            Use Meta ads to push one problem at a time: wig refresh, edge
            control, bonnet protection, moisture repair, or a complete Kaykay
            aftercare kit.
          </p>
          <div className="shop-cta__actions" data-section-reveal>
            <a className="primary-link" href="/book">
              Book appointment
            </a>
            <a
              className="secondary-link secondary-link--light"
              href="/lookbook"
            >
              See the lookbook
            </a>
          </div>
        </section>
      </ShopWrapper>
    </PageMenuPlaceholder>
  );
}

const ShopWrapper = styled.main`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: clamp(1rem, 2vw, 2rem);
  color: #131111;
  background: #ffffff;

  --shop-dark: #131111;
  --shop-muted: rgba(19, 17, 17, 0.62);
  --shop-soft: #f8f6f3;
  --shop-soft-2: #f3eee8;
  --shop-cocoa: #4d3f2e;
  --shop-rose: #dd3f6f;
  --shop-border: rgba(19, 17, 17, 0.09);
  --shop-border-strong: rgba(19, 17, 17, 0.16);
  --shop-shadow: 0 30px 90px rgba(20, 15, 12, 0.08);
  --shop-ease: cubic-bezier(0.16, 1, 0.3, 1);

  h1,
  h2,
  h3,
  p,
  span,
  strong,
  a,
  button,
  li {
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

  ul,
  ol {
    padding: 0;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  .eyebrow {
    width: max-content;
    max-width: 100%;
    display: inline-flex;
    align-items: center;
    border: 0.5px solid var(--shop-border);
    border-radius: 999px;
    padding: 0.7rem 1rem;
    background: rgba(255, 255, 255, 0.72);
    color: rgba(19, 17, 17, 0.75);
    font-size: clamp(10px, 1.1vw, 12px);
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    backdrop-filter: blur(18px);
  }

  .primary-link,
  .secondary-link,
  .product-card__footer button,
  .category-bar button {
    border: 0.5px solid var(--shop-border);
    border-radius: 999px;
    min-height: 52px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.95rem 1.35rem;
    font-size: 0.84rem;
    font-weight: 900;
    line-height: 1;
    cursor: pointer;
    transition:
      transform 0.42s var(--shop-ease),
      background 0.42s var(--shop-ease),
      color 0.42s var(--shop-ease),
      border-color 0.42s var(--shop-ease),
      box-shadow 0.42s var(--shop-ease);
  }

  .primary-link {
    background: var(--shop-dark);
    color: #fff;
    border-color: var(--shop-dark);
    box-shadow: 0 18px 45px rgba(19, 17, 17, 0.14);
  }

  .primary-link--dark {
    background: var(--shop-cocoa);
    border-color: var(--shop-cocoa);
  }

  .secondary-link {
    background: #fff;
    color: var(--shop-dark);
  }

  .secondary-link--light {
    border-color: rgba(255, 255, 255, 0.24);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  .primary-link:hover,
  .primary-link:focus-visible,
  .secondary-link:hover,
  .secondary-link:focus-visible,
  .product-card__footer button:hover,
  .product-card__footer button:focus-visible,
  .category-bar button:hover,
  .category-bar button:focus-visible {
    transform: translateY(-2px);
    outline: none;
  }

  .primary-link:hover,
  .primary-link:focus-visible {
    background: #fff;
    color: var(--shop-dark);
    border-color: var(--shop-border-strong);
  }

  .secondary-link:hover,
  .secondary-link:focus-visible {
    background: var(--shop-soft);
    border-color: var(--shop-border-strong);
  }

  .shop-hero {
    min-height: 92vh;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.74fr);
    align-items: stretch;
    gap: clamp(1.5rem, 5vw, 5rem);
    position: relative;
    overflow: hidden;
    border: 0.5px solid var(--shop-border);
    border-radius: clamp(1.5rem, 3vw, 3rem);
    padding: clamp(1.25rem, 4vw, 4.5rem);
    background:
      radial-gradient(
        circle at 82% 18%,
        rgba(221, 63, 111, 0.08),
        transparent 22%
      ),
      radial-gradient(
        circle at 16% 86%,
        rgba(77, 63, 46, 0.07),
        transparent 28%
      ),
      #fff;
  }

  .shop-hero::before {
    content: "";
    position: absolute;
    inset: 1rem;
    border: 0.5px solid rgba(19, 17, 17, 0.045);
    border-radius: inherit;
    pointer-events: none;
  }

  .shop-hero::after {
    content: "";
    position: absolute;
    top: 8%;
    right: 42%;
    width: 1px;
    height: 84%;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(19, 17, 17, 0.12),
      transparent
    );
    pointer-events: none;
  }

  .shop-hero__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1.35rem;
    max-width: 920px;
  }

  .shop-hero__content h1 {
    max-width: 920px;
    font-size: clamp(58px, 10.4vw, 164px);
    font-weight: 300;
    line-height: 0.84;
    letter-spacing: -0.085em;
    color: var(--shop-dark);
  }

  .shop-hero__content p {
    max-width: 640px;
    color: var(--shop-muted);
    font-size: clamp(16px, 2vw, 23px);
    font-weight: 300;
    line-height: 1.42;
  }

  .shop-hero__actions,
  .shop-cta__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    padding-top: 0.65rem;
  }

  .shop-hero__visual {
    position: relative;
    z-index: 1;
    min-height: 600px;
  }

  .hero-product {
    position: absolute;
    overflow: hidden;
    border: 0.5px solid var(--shop-border);
    border-radius: 999px 999px 2.3rem 2.3rem;
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.96),
        rgba(255, 255, 255, 0.5)
      ),
      var(--shop-soft-2);
    box-shadow: var(--shop-shadow);
  }

  .hero-product::before {
    content: "";
    position: absolute;
    inset: 1.2rem;
    border-radius: inherit;
    background:
      radial-gradient(
        circle at 52% 10%,
        rgba(255, 255, 255, 0.9),
        transparent 20%
      ),
      linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(19, 17, 17, 0.06));
  }

  .hero-product::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 9%;
    width: 42%;
    height: 78%;
    transform: translateX(-50%);
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.64),
      transparent
    );
    opacity: 0.68;
  }

  .hero-product span,
  .hero-product strong {
    position: relative;
    z-index: 1;
    display: block;
    text-align: center;
  }

  .hero-product span {
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(19, 17, 17, 0.42);
  }

  .hero-product strong {
    max-width: 220px;
    margin: auto;
    color: rgba(19, 17, 17, 0.84);
    font-size: clamp(34px, 4.4vw, 72px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.07em;
  }

  .hero-product--large {
    inset: 5% 10% 0 6%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.6rem;
    padding: 2.3rem;
  }

  .hero-product--small {
    width: min(46%, 240px);
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.4rem;
    padding: 1.55rem;
    border-radius: 999px 999px 1.5rem 1.5rem;
  }

  .hero-product--top {
    top: 10%;
    right: 0;
    transform: rotate(7deg);
  }

  .hero-product--bottom {
    left: -2%;
    bottom: 10%;
    transform: rotate(-6deg);
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.94),
        rgba(255, 255, 255, 0.56)
      ),
      #f8eeee;
  }

  .shop-strip {
    width: 100%;
    overflow: hidden;
    padding: clamp(1.25rem, 3vw, 2rem) 0;
  }

  .shop-strip__track {
    width: max-content;
    display: flex;
    align-items: center;
    gap: clamp(2rem, 4vw, 5rem);
    white-space: nowrap;
    will-change: transform;
  }

  .shop-strip__track span {
    color: rgba(19, 17, 17, 0.18);
    font-size: clamp(42px, 8vw, 128px);
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.08em;
  }

  .shop-intro {
    display: grid;
    grid-template-columns: minmax(220px, 0.35fr) minmax(0, 1fr);
    gap: clamp(2rem, 6vw, 7rem);
    border-top: 0.5px solid var(--shop-border);
    border-bottom: 0.5px solid var(--shop-border);
    padding: clamp(4rem, 8vw, 8rem) 0;
  }

  .shop-intro p {
    max-width: 1040px;
    color: var(--shop-dark);
    font-size: clamp(30px, 5vw, 78px);
    font-weight: 300;
    line-height: 0.98;
    letter-spacing: -0.07em;
  }

  .shop-products,
  .ritual-section {
    padding: clamp(4rem, 8vw, 8rem) 0;
  }

  .section-heading {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(260px, 0.42fr);
    align-items: end;
    gap: clamp(1.5rem, 5vw, 5rem);
    margin-bottom: clamp(1.5rem, 4vw, 3rem);
  }

  .section-heading--center {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .section-heading h2,
  .shop-editorial__content h2,
  .shop-cta h2 {
    max-width: 920px;
    margin-top: 1rem;
    color: var(--shop-dark);
    font-size: clamp(42px, 7vw, 112px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.08em;
  }

  .section-heading p,
  .shop-editorial__content p,
  .shop-cta p {
    color: var(--shop-muted);
    font-size: clamp(15px, 1.5vw, 18px);
    font-weight: 300;
    line-height: 1.6;
  }

  .category-bar {
    position: sticky;
    top: 1rem;
    z-index: 4;
    width: max-content;
    max-width: 100%;
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
    border: 0.5px solid var(--shop-border);
    border-radius: 999px;
    padding: 0.4rem;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(20px);
    box-shadow: 0 18px 55px rgba(19, 17, 17, 0.05);
  }

  .category-bar button {
    min-height: 44px;
    border-color: transparent;
    background: transparent;
    color: rgba(19, 17, 17, 0.62);
    box-shadow: none;
    white-space: nowrap;
  }

  .category-bar button.is-active {
    background: var(--shop-dark);
    color: #fff;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(0.9rem, 1.8vw, 1.5rem);
    will-change: transform;
  }

  .product-card {
    min-height: 650px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 0.5px solid var(--shop-border);
    border-radius: clamp(1.4rem, 2vw, 2.2rem);
    background: #fff;
    box-shadow: 0 0 0 rgba(19, 17, 17, 0);
    transition:
      transform 0.62s var(--shop-ease),
      border-color 0.62s var(--shop-ease),
      box-shadow 0.62s var(--shop-ease);
  }

  .product-card:hover {
    transform: translateY(-8px);
    border-color: var(--shop-border-strong);
    box-shadow: var(--shop-shadow);
  }

  .product-card__media {
    min-height: 360px;
    position: relative;
    overflow: hidden;
    margin: 0.6rem;
    border-radius: clamp(1rem, 1.6vw, 1.7rem);
    background:
      radial-gradient(
        circle at 50% 20%,
        rgba(255, 255, 255, 0.9),
        transparent 28%
      ),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.38),
        rgba(19, 17, 17, 0.03)
      ),
      var(--product-accent);
  }

  .product-card__media::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        90deg,
        transparent 24%,
        rgba(255, 255, 255, 0.5) 25%,
        transparent 26%
      ),
      linear-gradient(
        120deg,
        transparent 64%,
        rgba(255, 255, 255, 0.42) 65%,
        transparent 66%
      );
    opacity: 0.55;
  }

  .product-card__tag {
    position: absolute;
    z-index: 2;
    top: 1rem;
    left: 1rem;
    border: 0.5px solid rgba(19, 17, 17, 0.08);
    border-radius: 999px;
    padding: 0.62rem 0.82rem;
    background: rgba(255, 255, 255, 0.68);
    color: rgba(19, 17, 17, 0.62);
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    backdrop-filter: blur(16px);
  }

  .product-bottle {
    width: min(48%, 190px);
    height: 78%;
    position: absolute;
    left: 50%;
    bottom: -7%;
    transform: translateX(-50%);
    border: 0.5px solid rgba(19, 17, 17, 0.08);
    border-radius: 999px 999px 1.4rem 1.4rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 1.2rem;
    background:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.18),
        rgba(255, 255, 255, 0.88),
        rgba(255, 255, 255, 0.18)
      ),
      rgba(255, 255, 255, 0.42);
    box-shadow: 0 22px 50px rgba(19, 17, 17, 0.08);
    will-change: transform;
  }

  .product-bottle::before {
    content: "";
    position: absolute;
    top: 18%;
    left: 50%;
    width: 68%;
    height: 38%;
    transform: translateX(-50%);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.48);
    border: 0.5px solid rgba(19, 17, 17, 0.05);
  }

  .product-bottle span {
    position: relative;
    z-index: 1;
    color: rgba(19, 17, 17, 0.28);
    font-size: clamp(42px, 6vw, 82px);
    font-weight: 300;
    letter-spacing: -0.09em;
  }

  .product-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 1.25rem 1.25rem 0;
  }

  .product-card__eyebrow {
    color: rgba(19, 17, 17, 0.42);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .product-card__body h3 {
    max-width: 420px;
    color: var(--shop-dark);
    font-size: clamp(26px, 3vw, 42px);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.06em;
  }

  .product-card__body p {
    color: var(--shop-muted);
    font-size: 0.98rem;
    font-weight: 300;
    line-height: 1.55;
  }

  .product-card__meta {
    margin-top: auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    border-top: 0.5px solid var(--shop-border);
    padding-top: 1rem;
  }

  .product-card__meta span {
    max-width: 210px;
    color: rgba(19, 17, 17, 0.48);
    font-size: 0.84rem;
    font-weight: 500;
    line-height: 1.35;
  }

  .product-card__meta strong {
    color: var(--shop-dark);
    font-size: 1rem;
    white-space: nowrap;
  }

  .product-card__footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.7rem;
    padding: 1.25rem;
  }

  .product-card__footer a,
  .product-card__footer button {
    min-height: 48px;
    border: 0.5px solid var(--shop-border);
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.9rem 1rem;
    background: #fff;
    color: var(--shop-dark);
    font-size: 0.8rem;
    font-weight: 900;
    line-height: 1;
  }

  .product-card__footer button {
    background: var(--shop-dark);
    color: #fff;
    border-color: var(--shop-dark);
  }

  .product-card__footer a:hover,
  .product-card__footer a:focus-visible {
    outline: none;
    background: var(--shop-soft);
  }

  .product-card__footer button:hover,
  .product-card__footer button:focus-visible {
    background: var(--shop-cocoa);
    border-color: var(--shop-cocoa);
  }

  .shop-editorial {
    display: grid;
    grid-template-columns: minmax(320px, 0.86fr) minmax(0, 0.82fr);
    gap: clamp(1.25rem, 4vw, 4rem);
    align-items: stretch;
    padding: clamp(1rem, 2vw, 1.4rem);
    border: 0.5px solid var(--shop-border);
    border-radius: clamp(1.5rem, 3vw, 3rem);
    background: #fff;
  }

  .shop-editorial__image {
    min-height: 720px;
    position: relative;
    overflow: hidden;
    border-radius: clamp(1.2rem, 2vw, 2.2rem);
    background:
      radial-gradient(
        circle at 54% 22%,
        rgba(221, 63, 111, 0.1),
        transparent 24%
      ),
      linear-gradient(135deg, #f8f6f3 0%, #ffffff 50%, #f1ebe4 100%);
  }

  .shop-editorial__image::before {
    content: "";
    position: absolute;
    inset: -14%;
    background:
      linear-gradient(
        102deg,
        transparent 22%,
        rgba(19, 17, 17, 0.05) 23%,
        transparent 24%
      ),
      linear-gradient(
        102deg,
        transparent 48%,
        rgba(19, 17, 17, 0.04) 49%,
        transparent 50%
      ),
      linear-gradient(
        102deg,
        transparent 72%,
        rgba(19, 17, 17, 0.05) 73%,
        transparent 74%
      );
    transform: rotate(-8deg);
  }

  .editorial-object {
    position: absolute;
    border: 0.5px solid var(--shop-border);
    box-shadow: var(--shop-shadow);
    will-change: transform;
  }

  .editorial-object span {
    position: absolute;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
    color: rgba(19, 17, 17, 0.44);
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .editorial-object--one {
    width: min(46%, 250px);
    height: 64%;
    left: 17%;
    bottom: 8%;
    border-radius: 999px 999px 1.8rem 1.8rem;
    background:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.24)
      ),
      #f5e9df;
  }

  .editorial-object--two {
    width: min(38%, 210px);
    height: 46%;
    right: 16%;
    top: 16%;
    border-radius: 999px 999px 1.6rem 1.6rem;
    background:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.84),
        rgba(255, 255, 255, 0.24)
      ),
      #eef2ed;
  }

  .shop-editorial__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1.2rem;
    padding: clamp(1.5rem, 4vw, 4rem);
  }

  .ritual-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .ritual-grid article {
    min-height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 0.5px solid var(--shop-border);
    border-radius: 2rem;
    padding: clamp(1.25rem, 2.2vw, 2rem);
    background: #fff;
    transition:
      transform 0.5s var(--shop-ease),
      box-shadow 0.5s var(--shop-ease),
      border-color 0.5s var(--shop-ease);
  }

  .ritual-grid article:hover {
    transform: translateY(-6px);
    border-color: var(--shop-border-strong);
    box-shadow: var(--shop-shadow);
  }

  .ritual-grid article > span {
    color: rgba(19, 17, 17, 0.18);
    font-size: clamp(58px, 8vw, 120px);
    font-weight: 300;
    line-height: 0.8;
    letter-spacing: -0.09em;
  }

  .ritual-grid h3 {
    margin-top: auto;
    color: var(--shop-dark);
    font-size: clamp(26px, 3vw, 42px);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.06em;
  }

  .ritual-grid p {
    margin-top: 1rem;
    color: var(--shop-muted);
    font-size: 0.96rem;
    font-weight: 300;
    line-height: 1.55;
  }

  .shop-cta {
    min-height: 760px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
    border-radius: clamp(1.5rem, 3vw, 3rem);
    padding: clamp(1.5rem, 5vw, 5rem);
    background:
      radial-gradient(
        circle at 78% 18%,
        rgba(221, 63, 111, 0.16),
        transparent 24%
      ),
      radial-gradient(
        circle at 14% 72%,
        rgba(255, 255, 255, 0.08),
        transparent 30%
      ),
      linear-gradient(135deg, #4d3f2e, #151211 64%, #0d0c0c);
    color: #fff;
  }

  .shop-cta::before {
    content: "SHOP";
    position: absolute;
    right: -0.14em;
    top: -0.06em;
    color: rgba(255, 255, 255, 0.045);
    font-size: clamp(180px, 34vw, 560px);
    font-weight: 300;
    line-height: 0.8;
    letter-spacing: -0.12em;
  }

  .shop-cta .eyebrow {
    color: rgba(255, 255, 255, 0.78);
    border-color: rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.08);
  }

  .shop-cta h2,
  .shop-cta p,
  .shop-cta__actions {
    position: relative;
    z-index: 1;
  }

  .shop-cta h2 {
    max-width: 1080px;
    color: #fff;
  }

  .shop-cta p {
    max-width: 620px;
    margin-top: 1.2rem;
    color: rgba(255, 255, 255, 0.68);
  }

  @media (max-width: 1180px) {
    .shop-hero,
    .shop-editorial,
    .section-heading,
    .shop-intro {
      grid-template-columns: 1fr;
    }

    .shop-hero::after {
      display: none;
    }

    .shop-hero__visual {
      min-height: 520px;
    }

    .product-grid,
    .ritual-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .shop-editorial__image {
      min-height: 560px;
    }
  }

  @media (max-width: 760px) {
    padding: 0.75rem;

    .shop-hero {
      min-height: auto;
      padding: 1rem;
      border-radius: 1.4rem;
    }

    .shop-hero__content {
      padding: 3rem 0 1rem;
    }

    .shop-hero__content h1 {
      font-size: clamp(48px, 16vw, 74px);
    }

    .shop-hero__visual {
      min-height: 420px;
    }

    .hero-product--large {
      inset: 0 4% 0 4%;
    }

    .hero-product--small {
      min-height: 170px;
    }

    .shop-intro p,
    .section-heading h2,
    .shop-editorial__content h2,
    .shop-cta h2 {
      letter-spacing: -0.065em;
    }

    .category-bar {
      width: 100%;
      top: 0.75rem;
    }

    .product-grid,
    .ritual-grid {
      grid-template-columns: 1fr;
    }

    .product-card {
      min-height: auto;
    }

    .product-card__media {
      min-height: 320px;
    }

    .product-card__footer {
      grid-template-columns: 1fr;
    }

    .shop-editorial {
      padding: 0.75rem;
      border-radius: 1.4rem;
    }

    .shop-editorial__image {
      min-height: 420px;
    }

    .shop-editorial__content {
      padding: 1rem 0.25rem 0.25rem;
    }

    .ritual-grid article {
      min-height: 280px;
    }

    .shop-cta {
      min-height: 620px;
      border-radius: 1.4rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;
