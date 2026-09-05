"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "styled-components";

import PageMenuPlaceholder from "@/components/PageMenuPlaceholder";

type LookbookCategory =
  | "All"
  | "Wigs"
  | "Braids"
  | "Bridal"
  | "Care"
  | "Editorial";

type LookbookItem = {
  id: string;
  category: Exclude<LookbookCategory, "All">;
  title: string;
  caption: string;
  description: string;
  mood: string;
  image: string;
  orientation: "portrait" | "wide" | "tall" | "square";
};

const categories: LookbookCategory[] = [
  "All",
  "Wigs",
  "Braids",
  "Bridal",
  "Care",
  "Editorial",
];

const lookbookItems: LookbookItem[] = [
  {
    id: "soft-lace-glow",
    category: "Wigs",
    title: "Soft Lace Glow",
    caption: "Clean hairline, soft volume, everyday luxury.",
    description:
      "A polished wig install made for working days, dinner plans, and confident everyday beauty with a natural lace finish.",
    mood: "Natural / Polished / Lightweight",
    orientation: "tall",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "knotless-flow",
    category: "Braids",
    title: "Knotless Flow",
    caption: "Long, soft braids with an effortless fall.",
    description:
      "A protective braid look with movement, neat parting, and a lightweight finish that feels premium without looking overworked.",
    mood: "Protective / Sleek / Easy wear",
    orientation: "portrait",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "bridal-sculpt",
    category: "Bridal",
    title: "Bridal Sculpt",
    caption: "A soft sculpted finish for ceremony moments.",
    description:
      "Elegant event hair shaped for photographs, movement, and a graceful all-day finish from morning prep to evening celebration.",
    mood: "Elegant / Timeless / Camera ready",
    orientation: "wide",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "silk-care-reset",
    category: "Care",
    title: "Silk Care Reset",
    caption: "Healthy hair first. Styling second.",
    description:
      "A care-focused wash, treatment, and finish designed to bring softness back before the next protective style or install.",
    mood: "Hydrating / Gentle / Restorative",
    orientation: "square",
    image:
      "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "editorial-gloss",
    category: "Editorial",
    title: "Editorial Gloss",
    caption: "Beauty portrait energy with a clean studio mood.",
    description:
      "A minimal lookbook portrait direction for campaigns, product launches, and social content that makes the hair feel iconic.",
    mood: "Glossy / Minimal / Campaign",
    orientation: "tall",
    image:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "boss-install",
    category: "Wigs",
    title: "Boss Install",
    caption: "Sharp, neat, and ready for the week.",
    description:
      "A confident wig install with a smooth finish and quiet luxury styling for clients who want to look done without doing too much.",
    mood: "Executive / Sleek / Modern",
    orientation: "portrait",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "cornrow-detail",
    category: "Braids",
    title: "Cornrow Detail",
    caption: "Precise lines, clean finish, beautiful control.",
    description:
      "A close-up look at neat sectioning, scalp care, and styling discipline for cornrows that feel both protective and stylish.",
    mood: "Precise / Clean / Protective",
    orientation: "wide",
    image:
      "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "soft-glam-event",
    category: "Bridal",
    title: "Soft Glam Event",
    caption: "Hair and beauty that holds the room gently.",
    description:
      "A romantic beauty direction for special occasions, with hair, makeup, and styling working together as one polished look.",
    mood: "Romantic / Soft glam / Event ready",
    orientation: "portrait",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "careplus-polish",
    category: "Care",
    title: "CarePlus Polish",
    caption: "A monthly maintenance mood for busy women.",
    description:
      "A simple beauty routine built around consistency: healthy hair, fresh finish, and easy repeat bookings through Care Plus.",
    mood: "Consistent / Fresh / Member care",
    orientation: "square",
    image:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1400&q=90",
  },
];

export default function LookbookPage() {
  const pageRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<LookbookCategory>("All");
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  const visibleItems = useMemo(() => {
    if (activeCategory === "All") return lookbookItems;
    return lookbookItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activePreview = useMemo(() => {
    if (!activePreviewId) return null;
    return lookbookItems.find((item) => item.id === activePreviewId) || null;
  }, [activePreviewId]);

  const activePreviewIndex = activePreview
    ? visibleItems.findIndex((item) => item.id === activePreview.id)
    : -1;

  const showPreviousPreview = () => {
    if (!visibleItems.length || activePreviewIndex < 0) return;
    const nextIndex =
      activePreviewIndex === 0 ? visibleItems.length - 1 : activePreviewIndex - 1;
    setActivePreviewId(visibleItems[nextIndex].id);
  };

  const showNextPreview = () => {
    if (!visibleItems.length || activePreviewIndex < 0) return;
    const nextIndex =
      activePreviewIndex === visibleItems.length - 1 ? 0 : activePreviewIndex + 1;
    setActivePreviewId(visibleItems[nextIndex].id);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-hero-reveal]", { y: 58, opacity: 0 });
      gsap.set("[data-look-card]", { y: 88, opacity: 0, clipPath: "inset(14% 0% 0% 0%)" });

      gsap.to("[data-hero-reveal]", {
        y: 0,
        opacity: 1,
        duration: 1.18,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top 78%",
        },
      });

      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { y: 70, scale: 1.08, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.3,
            ease: "power4.out",
            scrollTrigger: {
              trigger: heroImageRef.current,
              start: "top 86%",
            },
          },
        );

        gsap.to(heroImageRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-look-card]").forEach((card, index) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.05,
          delay: index * 0.035,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });

        const image = card.querySelector("[data-look-image]");
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.08, yPercent: 5 },
            {
              scale: 1,
              yPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });

      if (railRef.current) {
        gsap.to(railRef.current, {
          xPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: railRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        "[data-statement]",
        { opacity: 0.12, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 74%",
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  useEffect(() => {
    if (!activePreview) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePreviewId(null);
      if (event.key === "ArrowLeft") showPreviousPreview();
      if (event.key === "ArrowRight") showNextPreview();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePreview, activePreviewIndex, visibleItems]);

  return (
    <PageMenuPlaceholder title="Lookbook" width="94%">
      <LookbookShell ref={pageRef}>
        <HeroSection aria-labelledby="lookbook-title">
          <HeroCopy>
            <Kicker data-hero-reveal>Kaykay Hair lookbook</Kicker>
            <HeroTitle id="lookbook-title" data-hero-reveal>
              Browse beauty in quiet luxury.
            </HeroTitle>
            <HeroText data-hero-reveal>
              A minimal gallery for wigs, braids, bridal hair, beauty care, and editorial finishes. Open any look to preview the image, caption, and styling direction.
            </HeroText>
            <HeroActions data-hero-reveal>
              <PrimaryButton type="button" onClick={() => setActiveCategory("All")}>
                Explore looks
              </PrimaryButton>
              <SecondaryButton type="button" onClick={() => setActiveCategory("Wigs")}>
                View wig installs
              </SecondaryButton>
            </HeroActions>
          </HeroCopy>

          <HeroVisual ref={heroImageRef} data-hero-reveal>
            <HeroFrame>
              <img src={lookbookItems[0].image} alt={lookbookItems[0].title} />
            </HeroFrame>
            <HeroNote>
              <span>Featured look</span>
              <strong>{lookbookItems[0].title}</strong>
            </HeroNote>
          </HeroVisual>
        </HeroSection>

        <FilterSection aria-label="Filter lookbook images">
          <FilterIntro>
            <span>Browse by mood</span>
            <strong>{visibleItems.length.toString().padStart(2, "0")} looks</strong>
          </FilterIntro>
          <FilterList>
            {categories.map((category) => (
              <FilterButton
                key={category}
                type="button"
                $active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </FilterList>
        </FilterSection>

        <GalleryGrid aria-live="polite">
          {visibleItems.map((item, index) => (
            <LookCard
              key={item.id}
              type="button"
              $orientation={item.orientation}
              data-look-card
              onClick={() => setActivePreviewId(item.id)}
              aria-label={`Preview ${item.title}`}
            >
              <ImageWrap $orientation={item.orientation}>
                <img data-look-image src={item.image} alt={item.caption} loading={index < 3 ? "eager" : "lazy"} />
                <ImageShade />
                <CardIndex>{(index + 1).toString().padStart(2, "0")}</CardIndex>
                <PreviewCue>Preview</PreviewCue>
              </ImageWrap>
              <CardCopy>
                <CardMeta>
                  <span>{item.category}</span>
                  <span>{item.mood}</span>
                </CardMeta>
                <h2>{item.title}</h2>
                <p>{item.caption}</p>
              </CardCopy>
            </LookCard>
          ))}
        </GalleryGrid>

        <StatementSection data-statement>
          <StatementKicker>Less noise. More beauty.</StatementKicker>
          <StatementTitle>
            The page should feel like a calm salon wall: white space, beautiful images, and just enough copy to make every look desirable.
          </StatementTitle>
        </StatementSection>

        <ImageRailSection aria-label="Lookbook image rail">
          <RailHeader>
            <span>Preview strip</span>
            <span>Swipe the mood through scroll</span>
          </RailHeader>
          <ImageRail ref={railRef}>
            {[...lookbookItems, ...lookbookItems.slice(0, 4)].map((item, index) => (
              <RailButton
                key={`${item.id}-${index}`}
                type="button"
                onClick={() => setActivePreviewId(item.id)}
                aria-label={`Preview ${item.title}`}
              >
                <img src={item.image} alt="" loading="lazy" />
                <span>{item.title}</span>
              </RailButton>
            ))}
          </ImageRail>
        </ImageRailSection>

        <FinalCTA>
          <span>Ready to be featured?</span>
          <h2>Book the look. Capture the finish. Build the Kaykay wall of beauty.</h2>
          <button type="button">Book your look</button>
        </FinalCTA>

        {activePreview ? (
          <PreviewOverlay
            role="dialog"
            aria-modal="true"
            aria-label={`${activePreview.title} preview`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActivePreviewId(null);
            }}
          >
            <PreviewPanel>
              <PreviewImage>
                <img src={activePreview.image} alt={activePreview.caption} />
              </PreviewImage>
              <PreviewContent>
                <PreviewTopline>
                  <span>{activePreview.category}</span>
                  <CloseButton type="button" onClick={() => setActivePreviewId(null)} aria-label="Close preview">
                    Close
                  </CloseButton>
                </PreviewTopline>
                <PreviewTitle>{activePreview.title}</PreviewTitle>
                <PreviewCaption>{activePreview.caption}</PreviewCaption>
                <PreviewDescription>{activePreview.description}</PreviewDescription>
                <PreviewMood>{activePreview.mood}</PreviewMood>
                <PreviewControls>
                  <button type="button" onClick={showPreviousPreview}>Previous</button>
                  <span>
                    {(activePreviewIndex + 1).toString().padStart(2, "0")} / {visibleItems.length.toString().padStart(2, "0")}
                  </span>
                  <button type="button" onClick={showNextPreview}>Next</button>
                </PreviewControls>
              </PreviewContent>
            </PreviewPanel>
          </PreviewOverlay>
        ) : null}
      </LookbookShell>
    </PageMenuPlaceholder>
  );
}

const LookbookShell = styled.main`
  --ink: #17130f;
  --muted: rgba(23, 19, 15, 0.62);
  --soft: rgba(23, 19, 15, 0.08);
  --line: rgba(23, 19, 15, 0.12);
  --cream: #faf8f4;
  --paper: #ffffff;
  --coffee: #4d3f2e;

  position: relative;
  width: 100%;
  min-height: 100vh;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, rgba(238, 224, 207, 0.5), transparent 32rem),
    linear-gradient(180deg, #fff 0%, #fff 42%, #faf8f4 100%);
  overflow: hidden;
`;

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(24rem, 0.7fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: end;
  min-height: clamp(42rem, 82vh, 62rem);
  padding: clamp(5rem, 9vw, 9rem) clamp(1rem, 3vw, 2.6rem) clamp(3rem, 8vw, 7rem);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const HeroCopy = styled.div`
  max-width: 68rem;
`;

const Kicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.2rem;
  color: var(--muted);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;

  &::before {
    width: 3.5rem;
    height: 1px;
    background: var(--ink);
    content: "";
  }
`;

const HeroTitle = styled.h1`
  max-width: 13ch;
  margin: 0;
  color: var(--ink);
  font-family: "Kaykay Bodoni", "Bodoni 72", "Playfair Display", Georgia, serif;
  font-size: clamp(4.4rem, 10vw, 12.6rem);
  font-weight: 600;
  letter-spacing: -0.075em;
  line-height: 0.85;
`;

const HeroText = styled.p`
  max-width: 44rem;
  margin: 2rem 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.45vw, 1.2rem);
  line-height: 1.75;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2.2rem;
`;

const PrimaryButton = styled.button`
  min-height: 3.25rem;
  padding: 0 1.5rem;
  border: 1px solid var(--ink);
  border-radius: 999rem;
  color: #fff;
  background: var(--ink);
  font-size: 0.83rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 350ms ease, background 350ms ease;

  &:hover {
    transform: translateY(-3px);
    background: var(--coffee);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  color: var(--ink);
  background: transparent;

  &:hover {
    color: #fff;
    background: var(--ink);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  justify-self: end;
  width: min(100%, 28rem);

  @media (max-width: 980px) {
    justify-self: start;
    width: min(100%, 38rem);
  }
`;

const HeroFrame = styled.div`
  position: relative;
  aspect-ratio: 0.72;
  overflow: hidden;
  border-radius: 999rem 999rem 2.2rem 2.2rem;
  background: #eee;
  box-shadow: 0 2rem 4rem rgba(23, 19, 15, 0.12);

  &::after {
    position: absolute;
    inset: 1.1rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: inherit;
    content: "";
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.04);
  }
`;

const HeroNote = styled.div`
  position: absolute;
  right: -1.5rem;
  bottom: 2rem;
  width: min(13rem, 50vw);
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 1.4rem;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 1.5rem 3rem rgba(23, 19, 15, 0.12);
  backdrop-filter: blur(18px);

  span,
  strong {
    display: block;
  }

  span {
    color: var(--muted);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 0.35rem;
    font-family: "Kaykay Bodoni", "Bodoni 72", Georgia, serif;
    font-size: 1.55rem;
    line-height: 0.95;
  }

  @media (max-width: 620px) {
    right: 1rem;
  }
`;

const FilterSection = styled.section`
  position: sticky;
  top: 0;
  z-index: 8;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  margin: 0 clamp(1rem, 3vw, 2.6rem) clamp(2rem, 5vw, 4rem);
  padding: 0.72rem;
  border: 1px solid rgba(23, 19, 15, 0.09);
  border-radius: 999rem;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 1rem 3rem rgba(23, 19, 15, 0.06);
  backdrop-filter: blur(18px);

  @media (max-width: 860px) {
    position: relative;
    top: auto;
    grid-template-columns: 1fr;
    border-radius: 1.4rem;
  }
`;

const FilterIntro = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0 1rem;
  white-space: nowrap;

  span {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  strong {
    font-size: 0.76rem;
  }
`;

const FilterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.4rem;

  @media (max-width: 860px) {
    justify-content: flex-start;
  }
`;

const FilterButton = styled.button<{ $active: boolean }>`
  min-height: 2.55rem;
  padding: 0 1rem;
  border: 1px solid ${({ $active }) => ($active ? "var(--ink)" : "transparent")};
  border-radius: 999rem;
  color: ${({ $active }) => ($active ? "#fff" : "var(--ink)")};
  background: ${({ $active }) => ($active ? "var(--ink)" : "rgba(23, 19, 15, 0.045)")};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 280ms ease, color 280ms ease, background 280ms ease;

  &:hover {
    transform: translateY(-2px);
    color: #fff;
    background: var(--ink);
  }
`;

const GalleryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.55rem);
  padding: 0 clamp(1rem, 3vw, 2.6rem) clamp(5rem, 10vw, 9rem);

  @media (max-width: 940px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const LookCard = styled.button<{ $orientation: LookbookItem["orientation"] }>`
  grid-column: span ${({ $orientation }) => ($orientation === "wide" ? 7 : $orientation === "square" ? 4 : 5)};
  display: grid;
  gap: 1rem;
  align-self: start;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  text-align: left;
  cursor: pointer;

  &:nth-child(2n) {
    margin-top: clamp(2rem, 7vw, 8rem);
  }

  &:nth-child(5n) {
    grid-column: span 6;
  }

  &:hover img {
    filter: saturate(1.08) contrast(1.03);
    transform: scale(1.045);
  }

  &:hover ${"[data-preview]"} {
    opacity: 1;
  }

  @media (max-width: 940px) {
    grid-column: span 3;

    &:nth-child(5n) {
      grid-column: span 3;
    }
  }

  @media (max-width: 640px) {
    grid-column: 1 / -1;

    &:nth-child(2n) {
      margin-top: 0;
    }
  }
`;

const ImageWrap = styled.div<{ $orientation: LookbookItem["orientation"] }>`
  position: relative;
  aspect-ratio: ${({ $orientation }) =>
    $orientation === "wide" ? "1.38" : $orientation === "square" ? "1" : $orientation === "tall" ? "0.68" : "0.82"};
  overflow: hidden;
  border-radius: clamp(1.2rem, 2.5vw, 2.2rem);
  background: #eee;

  img {
    width: 100%;
    height: 112%;
    object-fit: cover;
    transition: transform 650ms cubic-bezier(0.19, 1, 0.22, 1), filter 650ms ease;
    will-change: transform;
  }
`;

const ImageShade = styled.span`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(23, 19, 15, 0.02) 35%, rgba(23, 19, 15, 0.36) 100%),
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.35), transparent 18rem);
  pointer-events: none;
`;

const CardIndex = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.65rem;
  height: 2.65rem;
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: 999rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.18);
  font-size: 0.7rem;
  font-weight: 800;
  backdrop-filter: blur(12px);
`;

interface PreviewCueProps {
  $preview?: string;
}
const PreviewCue =styled.span<PreviewCueProps>`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: inline-flex;
  min-height: 2.45rem;
  align-items: center;
  padding: 0 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 999rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.16);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  opacity: 0.76;
  backdrop-filter: blur(14px);
  transition: opacity 300ms ease, transform 300ms ease;
`;

const CardCopy = styled.div`
  display: grid;
  gap: 0.55rem;
  padding: 0 0.15rem;

  h2 {
    margin: 0;
    font-family: "Kaykay Bodoni", "Bodoni 72", "Playfair Display", Georgia, serif;
    font-size: clamp(2rem, 3.2vw, 3.35rem);
    font-weight: 560;
    letter-spacing: -0.055em;
    line-height: 0.94;
  }

  p {
    max-width: 34rem;
    margin: 0;
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.62;
  }
`;

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  color: rgba(23, 19, 15, 0.52);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  span + span::before {
    content: "/ ";
  }
`;

const StatementSection = styled.section`
  width: min(100%, 76rem);
  margin: 0 auto;
  padding: clamp(4rem, 9vw, 9rem) clamp(1rem, 3vw, 2rem);
  text-align: center;
`;

const StatementKicker = styled.span`
  display: inline-flex;
  margin-bottom: 1rem;
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 850;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const StatementTitle = styled.h2`
  margin: 0;
  font-family: "Kaykay Bodoni", "Bodoni 72", "Playfair Display", Georgia, serif;
  font-size: clamp(2.7rem, 6.4vw, 7rem);
  font-weight: 560;
  letter-spacing: -0.065em;
  line-height: 0.92;
`;

const ImageRailSection = styled.section`
  padding: clamp(2rem, 6vw, 5rem) 0 clamp(5rem, 10vw, 9rem);
  overflow: hidden;
`;

const RailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 clamp(1rem, 3vw, 2.6rem) 1rem;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;

const ImageRail = styled.div`
  display: flex;
  gap: 1rem;
  width: max-content;
  padding: 0 clamp(1rem, 3vw, 2.6rem);
`;

const RailButton = styled.button`
  position: relative;
  width: clamp(13rem, 19vw, 22rem);
  aspect-ratio: 0.78;
  overflow: hidden;
  border: 0;
  border-radius: 1.6rem;
  background: #eee;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 650ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  span {
    position: absolute;
    right: 0.8rem;
    bottom: 0.8rem;
    left: 0.8rem;
    padding: 0.85rem;
    border-radius: 1rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.22);
    font-family: "Kaykay Bodoni", "Bodoni 72", Georgia, serif;
    font-size: 1.35rem;
    line-height: 0.95;
    backdrop-filter: blur(12px);
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

const FinalCTA = styled.section`
  display: grid;
  gap: 1rem;
  margin: 0 clamp(1rem, 3vw, 2.6rem) clamp(2rem, 4vw, 3rem);
  padding: clamp(2rem, 5vw, 4.5rem);
  border-radius: clamp(1.6rem, 3vw, 3rem);
  color: #fff;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.2), transparent 24rem),
    #17130f;

  span {
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.75rem;
    font-weight: 850;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h2 {
    max-width: 58rem;
    margin: 0;
    font-family: "Kaykay Bodoni", "Bodoni 72", Georgia, serif;
    font-size: clamp(2.6rem, 6vw, 6rem);
    font-weight: 560;
    letter-spacing: -0.065em;
    line-height: 0.92;
  }

  button {
    justify-self: start;
    min-height: 3.15rem;
    margin-top: 0.9rem;
    padding: 0 1.3rem;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 999rem;
    color: var(--ink);
    background: #fff;
    font-size: 0.76rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

const PreviewOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: clamp(0.8rem, 2vw, 1.4rem);
  background: rgba(250, 248, 244, 0.72);
  backdrop-filter: blur(18px);
`;

const PreviewPanel = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(22rem, 0.58fr);
  width: min(100%, 82rem);
  max-height: min(46rem, 92vh);
  overflow: hidden;
  border: 1px solid rgba(23, 19, 15, 0.1);
  border-radius: clamp(1.4rem, 3vw, 2.6rem);
  background: #fff;
  box-shadow: 0 2rem 6rem rgba(23, 19, 15, 0.18);

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    overflow: auto;
  }
`;

const PreviewImage = styled.div`
  min-height: 0;
  background: #eee;

  img {
    width: 100%;
    height: 100%;
    min-height: clamp(22rem, 62vh, 44rem);
    object-fit: cover;
  }
`;

const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: clamp(1.4rem, 3vw, 2.5rem);
`;

const PreviewTopline = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  border: 0;
  color: var(--ink);
  background: transparent;
  font: inherit;
  cursor: pointer;
`;

const PreviewTitle = styled.h2`
  margin: auto 0 0;
  font-family: "Kaykay Bodoni", "Bodoni 72", "Playfair Display", Georgia, serif;
  font-size: clamp(3.4rem, 6vw, 6.6rem);
  font-weight: 560;
  letter-spacing: -0.07em;
  line-height: 0.84;
`;

const PreviewCaption = styled.p`
  margin: 1.2rem 0 0;
  color: var(--ink);
  font-size: clamp(1.15rem, 2vw, 1.55rem);
  line-height: 1.4;
`;

const PreviewDescription = styled.p`
  margin: 1rem 0 0;
  color: var(--muted);
  font-size: 0.98rem;
  line-height: 1.72;
`;

const PreviewMood = styled.span`
  display: inline-flex;
  width: fit-content;
  margin-top: 1.2rem;
  padding: 0.75rem 0.95rem;
  border: 1px solid rgba(23, 19, 15, 0.1);
  border-radius: 999rem;
  color: var(--muted);
  background: rgba(23, 19, 15, 0.035);
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`;

const PreviewControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;

  button {
    min-height: 2.8rem;
    padding: 0 1rem;
    border: 1px solid rgba(23, 19, 15, 0.13);
    border-radius: 999rem;
    color: var(--ink);
    background: #fff;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 280ms ease, background 280ms ease, color 280ms ease;

    &:hover {
      transform: translateY(-2px);
      color: #fff;
      background: var(--ink);
    }
  }

  span {
    color: var(--muted);
    font-size: 0.75rem;
    font-weight: 850;
    letter-spacing: 0.12em;
  }
`;
