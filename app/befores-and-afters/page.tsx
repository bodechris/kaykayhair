"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "styled-components";

import PageMenuPlaceholder from "@/components/PageMenuPlaceholder";

type BeforeAfterCategory = "All" | "Wigs" | "Braids" | "Care" | "Bridal" | "Makeup";

type BeforeAfterJob = {
  id: string;
  category: Exclude<BeforeAfterCategory, "All">;
  title: string;
  caption: string;
  description: string;
  service: string;
  duration: string;
  resultNote: string;
  beforeImage: string;
  afterImage: string;
};

type BeforeAfterResponse = {
  items: BeforeAfterJob[];
  nextCursor: number | null;
  hasMore: boolean;
};

const categories: BeforeAfterCategory[] = ["All", "Wigs", "Braids", "Care", "Bridal", "Makeup"];
const BATCH_SIZE = 3;

const localBeforeAfterJobs: BeforeAfterJob[] = [
  {
    id: "lace-reset-glow",
    category: "Wigs",
    title: "Lace Reset Glow",
    caption: "From tired lace to a soft, natural hairline finish.",
    description:
      "A clean wig reset focused on lace correction, melt, shaping, and a soft salon finish that looks polished without feeling heavy.",
    service: "Wig revamp + installation",
    duration: "2h 30m",
    resultNote: "Soft melt, cleaner hairline, fuller frame",
    beforeImage:
      "https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "knotless-crown-flow",
    category: "Braids",
    title: "Knotless Crown Flow",
    caption: "A protective look rebuilt with clean parting and easy movement.",
    description:
      "A braid transformation designed for comfort, longevity, and a softer face frame while keeping the final look neat and premium.",
    service: "Knotless braids",
    duration: "4h 15m",
    resultNote: "Lightweight fall, neat sections, polished edges",
    beforeImage:
      "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "careplus-silk-reset",
    category: "Care",
    title: "CarePlus Silk Reset",
    caption: "Healthy hair brought back to a softer, more manageable state.",
    description:
      "A maintenance-led treatment with wash, conditioning, gentle heat styling, and finishing care for clients who want consistency month after month.",
    service: "CarePlus treatment",
    duration: "1h 45m",
    resultNote: "Less dryness, more softness, better shine",
    beforeImage:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "bridal-soft-sculpt",
    category: "Bridal",
    title: "Bridal Soft Sculpt",
    caption: "A calm, camera-ready finish for a high-emotion day.",
    description:
      "An event beauty transformation built around soft structure, controlled volume, and a timeless profile that holds beautifully in photos.",
    service: "Bridal and event hair",
    duration: "3h",
    resultNote: "Romantic volume, clean shape, picture-ready polish",
    beforeImage:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "soft-glam-lift",
    category: "Makeup",
    title: "Soft Glam Lift",
    caption: "Fresh skin, defined features, and a confident finish.",
    description:
      "A minimal glam direction for working women, birthdays, shoots, and events where the beauty should feel refined instead of overdone.",
    service: "Makeup application",
    duration: "1h 20m",
    resultNote: "Clean skin, lifted eye, soft glow",
    beforeImage:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1523264766116-1e09b3145b84?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "wig-volume-rebuild",
    category: "Wigs",
    title: "Volume Rebuild",
    caption: "A flat wig reshaped into a fuller, more luxurious silhouette.",
    description:
      "A revamp and restyle that restores shape, movement, and confidence through wash care, heat styling, trimming, and finishing detail.",
    service: "Wig revamping",
    duration: "2h",
    resultNote: "More movement, refreshed ends, stronger silhouette",
    beforeImage:
      "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "cornrow-clean-line",
    category: "Braids",
    title: "Clean Line Cornrows",
    caption: "A protective style made sharper through clean lines and balance.",
    description:
      "Cornrows shaped for a neat everyday look with attention to symmetry, scalp comfort, and a finish that feels fresh for longer.",
    service: "Cornrows",
    duration: "2h 15m",
    resultNote: "Sharper lines, balanced sections, tidy finish",
    beforeImage:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "repair-and-polish",
    category: "Care",
    title: "Repair and Polish",
    caption: "A dry, stressed look softened through treatment-first styling.",
    description:
      "A hair care session that prioritizes moisture, detangling, shine, and a clean final shape before any heavy styling decisions.",
    service: "Hair care treatment",
    duration: "1h 30m",
    resultNote: "Softer texture, calmer finish, healthier look",
    beforeImage:
      "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "event-face-frame",
    category: "Bridal",
    title: "Event Face Frame",
    caption: "A simple event upgrade with softness around the face.",
    description:
      "A beauty finish created for women who want an elevated look that still feels like themselves when they walk into the room.",
    service: "Event hair styling",
    duration: "2h",
    resultNote: "Soft frame, gentle lift, graceful finish",
    beforeImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "everyday-glam-edit",
    category: "Makeup",
    title: "Everyday Glam Edit",
    caption: "An understated beauty shift for everyday confidence.",
    description:
      "A soft, clean makeup look for clients who want polish, glow, and definition without losing the natural feel of their face.",
    service: "Soft glam makeup",
    duration: "1h",
    resultNote: "Fresh complexion, subtle definition, natural glow",
    beforeImage:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "premium-install-polish",
    category: "Wigs",
    title: "Premium Install Polish",
    caption: "A high-finish install with clean styling and a smooth shape.",
    description:
      "A premium wig session that balances lace work, placement, finishing, and client comfort for a refined Kaykay Hair result.",
    service: "Premium wig installation",
    duration: "2h 45m",
    resultNote: "Natural lace, soft volume, polished finish",
    beforeImage:
      "https://images.unsplash.com/photo-1523264766116-1e09b3145b84?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "maintenance-refresh",
    category: "Care",
    title: "Maintenance Refresh",
    caption: "A routine beauty reset for clients who want to stay ready.",
    description:
      "A maintenance-focused session for regular clients: clean care, light styling, finish check, and an easy route back to a polished look.",
    service: "Monthly care maintenance",
    duration: "1h 50m",
    resultNote: "Cleaner routine, better shape, ready-to-go finish",
    beforeImage:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=90",
  },
];

function getLocalBatch(cursor: number, category: BeforeAfterCategory): BeforeAfterResponse {
  const list = category === "All" ? localBeforeAfterJobs : localBeforeAfterJobs.filter((item) => item.category === category);
  const items = list.slice(cursor, cursor + BATCH_SIZE);
  const nextCursor = cursor + BATCH_SIZE < list.length ? cursor + BATCH_SIZE : null;

  return {
    items,
    nextCursor,
    hasMore: nextCursor !== null,
  };
}

async function fetchBeforeAfterBatch(cursor: number, category: BeforeAfterCategory): Promise<BeforeAfterResponse> {
  const params = new URLSearchParams({
    cursor: String(cursor),
    limit: String(BATCH_SIZE),
    category,
  });

  try {
    const response = await fetch(`/api/befores-and-afters?${params.toString()}`, {
      cache: "no-store",
    });

    if (response.ok) {
      return (await response.json()) as BeforeAfterResponse;
    }
  } catch {
    // Falls back to the local dataset below when the API route has not been added yet.
  }

  await new Promise((resolve) => setTimeout(resolve, 420));
  return getLocalBatch(cursor, category);
}

function getPointerPercent(event: PointerEvent | React.PointerEvent<HTMLElement>, element: HTMLElement) {
  const bounds = element.getBoundingClientRect();
  const raw = ((event.clientX - bounds.left) / bounds.width) * 100;
  return Math.min(92, Math.max(8, raw));
}

function CompareSlider({ job, index }: { job: BeforeAfterJob; index: number }) {
  const compareRef = useRef<HTMLDivElement | null>(null);
  const [split, setSplit] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromPointer = useCallback((event: PointerEvent | React.PointerEvent<HTMLElement>) => {
    if (!compareRef.current) return;
    setSplit(getPointerPercent(event, compareRef.current));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateFromPointer(event);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDragging) return;
    updateFromPointer(event);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSplit((value) => Math.max(8, value - 4));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setSplit((value) => Math.min(92, value + 4));
    }

    if (event.key === "Home") {
      event.preventDefault();
      setSplit(8);
    }

    if (event.key === "End") {
      event.preventDefault();
      setSplit(92);
    }
  };

  return (
    <CompareWrap
      ref={compareRef}
      $isDragging={isDragging}
      style={{ "--split": `${split}%` } as React.CSSProperties}
      role="group"
      aria-label={`${job.title} before and after comparison`}
    >
      <ImageLayer>
        <img src={job.beforeImage} alt={`${job.title} before`} loading={index < 2 ? "eager" : "lazy"} />
      </ImageLayer>

      <AfterLayer aria-hidden="true">
        <img src={job.afterImage} alt="" loading={index < 2 ? "eager" : "lazy"} />
      </AfterLayer>

      <CompareLabels aria-hidden="true">
        <span>Before</span>
        <span>After</span>
      </CompareLabels>

      <DragControl
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={() => setIsDragging(false)}
        onKeyDown={handleKeyDown}
        aria-label={`Drag to compare before and after for ${job.title}`}
        aria-valuemin={8}
        aria-valuemax={92}
        aria-valuenow={Math.round(split)}
        aria-valuetext={`${Math.round(split)} percent showing after image`}
      >
        <HandleLine />
        <HandleKnob>
          <span />
          <span />
        </HandleKnob>
      </DragControl>
    </CompareWrap>
  );
}

export default function BeforesAndAftersPage() {
  const pageRef = useRef<HTMLElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<BeforeAfterCategory>("All");
  const [items, setItems] = useState<BeforeAfterJob[]>([]);
  const [cursor, setCursor] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeCount = useMemo(() => items.length.toString().padStart(2, "0"), [items.length]);

  const loadMore = useCallback(async () => {
    if (isLoading || cursor === null) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchBeforeAfterBatch(cursor, activeCategory);
      setItems((currentItems) => {
        const existingIds = new Set(currentItems.map((item) => item.id));
        const nextItems = response.items.filter((item) => !existingIds.has(item.id));
        return [...currentItems, ...nextItems];
      });
      setCursor(response.nextCursor);
    } catch {
      setError("We could not load more transformations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, cursor, isLoading]);

  useEffect(() => {
    setItems([]);
    setCursor(0);
    setError(null);
  }, [activeCategory]);

  useEffect(() => {
    if (cursor === 0 && !items.length && !isLoading) {
      void loadMore();
    }
  }, [cursor, items.length, isLoading, loadMore]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "900px 0px 900px 0px", threshold: 0.01 },
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [loadMore]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-hero-reveal]", { y: 58, opacity: 0 });

      gsap.to("[data-hero-reveal]", {
        y: 0,
        opacity: 1,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top 82%",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-compare-panel]").forEach((panel) => {
        const visual = panel.querySelector("[data-compare-visual]");
        const copy = panel.querySelectorAll("[data-panel-copy]");
        const number = panel.querySelector("[data-panel-number]");

        gsap.fromTo(
          panel,
          { opacity: 0.6 },
          {
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 76%",
            },
          },
        );

        if (visual) {
          gsap.fromTo(
            visual,
            { y: 110, scale: 0.96, clipPath: "inset(8% 2% 10% 2% round 2.4rem)" },
            {
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 0rem)",
              duration: 1.25,
              ease: "power4.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 78%",
              },
            },
          );

          gsap.to(visual, {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (copy.length) {
          gsap.fromTo(
            copy,
            { y: 46, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.055,
              ease: "power4.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 62%",
              },
            },
          );
        }

        if (number) {
          gsap.fromTo(
            number,
            { opacity: 0, xPercent: -18 },
            {
              opacity: 1,
              xPercent: 0,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 70%",
              },
            },
          );
        }
      });

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, [items.length, activeCategory]);

  return (
    <PageMenuPlaceholder title="Befores and Afters" width="100%">
      <PageShell ref={pageRef}>
        <HeroSection aria-labelledby="before-after-title">
          <HeroCopy>
            <Kicker data-hero-reveal>Kaykay transformations</Kicker>
            <HeroTitle id="before-after-title" data-hero-reveal>
              Drag through the beauty story.
            </HeroTitle>
            <HeroText data-hero-reveal>
              Full-screen before-and-after case studies for wig installs, braids, treatments, bridal beauty, and soft glam. Slide each divider to reveal the finished Kaykay Hair result.
            </HeroText>
          </HeroCopy>

          <HeroCard data-hero-reveal>
            <HeroMetric>
              <span>{activeCount}</span>
              <strong>loaded transformations</strong>
            </HeroMetric>
            <HeroSmallText>
              More sections load automatically as you scroll, keeping the page light while still feeling cinematic.
            </HeroSmallText>
          </HeroCard>
        </HeroSection>

        <FilterBar data-hero-reveal aria-label="Filter before and after transformations">
          <FilterIntro>
            <span>Browse by service</span>
            <strong>{activeCategory}</strong>
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
        </FilterBar>

        <Panels aria-live="polite">
          {items.map((job, index) => (
            <ComparePanel key={job.id} data-compare-panel>
              <PanelNumber data-panel-number>{(index + 1).toString().padStart(2, "0")}</PanelNumber>

              <PanelCopy data-panel-copy-wrap>
                <PanelMeta data-panel-copy>
                  <span>{job.category}</span>
                  <span>{job.duration}</span>
                </PanelMeta>
                <PanelTitle data-panel-copy>{job.title}</PanelTitle>
                <PanelCaption data-panel-copy>{job.caption}</PanelCaption>
                <PanelDescription data-panel-copy>{job.description}</PanelDescription>
                <PanelTags data-panel-copy>
                  <span>{job.service}</span>
                  <span>{job.resultNote}</span>
                </PanelTags>
              </PanelCopy>

              <PanelVisual data-compare-visual>
                <CompareSlider job={job} index={index} />
              </PanelVisual>
            </ComparePanel>
          ))}
        </Panels>

        <AsyncLoader ref={loaderRef} aria-live="polite">
          {isLoading ? (
            <>
              <LoaderLine />
              <span>Loading the next transformation</span>
            </>
          ) : cursor !== null ? (
            <LoadMoreButton type="button" onClick={() => void loadMore()}>
              Load more transformations
            </LoadMoreButton>
          ) : (
            <EndNote>
              <span>End of current set</span>
              <strong>Replace the placeholder data with real Kaykay Hair before and afters.</strong>
            </EndNote>
          )}
          {error ? <ErrorText>{error}</ErrorText> : null}
        </AsyncLoader>
      </PageShell>
    </PageMenuPlaceholder>
  );
}

const PageShell = styled.main`
  --ink: #15120f;
  --muted: rgba(21, 18, 15, 0.62);
  --line: rgba(21, 18, 15, 0.11);
  --paper: #fffdf9;
  --soft: #f7f1ea;
  --cream: #fbf7f0;
  --taupe: #4d3f2e;

  width: 100%;
  overflow: clip;
  color: var(--ink);
  background:
    radial-gradient(circle at 80% 10%, rgba(77, 63, 46, 0.08), transparent 34rem),
    linear-gradient(180deg, #fff 0%, var(--paper) 52%, #fff 100%);
`;

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.45fr);
  gap: clamp(2rem, 5vw, 7rem);
  min-height: 88svh;
  padding: clamp(6.5rem, 10vw, 10rem) clamp(1.2rem, 4vw, 5rem) 4rem;
  border-bottom: 1px solid var(--line);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const HeroCopy = styled.div`
  align-self: end;
  max-width: 78rem;
`;

const Kicker = styled.p`
  margin: 0 0 1.4rem;
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 11ch;
  margin: 0;
  font-family: "Kaykay Bodoni", "Bodoni 72", "Playfair Display", Georgia, serif;
  font-size: clamp(4.3rem, 13.2vw, 14.5rem);
  font-weight: 560;
  letter-spacing: -0.085em;
  line-height: 0.78;
`;

const HeroText = styled.p`
  max-width: 43rem;
  margin: clamp(1.4rem, 3vw, 2.5rem) 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.7vw, 1.35rem);
  line-height: 1.7;
`;

const HeroCard = styled.aside`
  align-self: end;
  padding: clamp(1.2rem, 2.5vw, 2rem);
  border: 1px solid var(--line);
  border-radius: 1.8rem;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(18px);
  box-shadow: 0 2rem 6rem rgba(21, 18, 15, 0.07);
`;

const HeroMetric = styled.div`
  display: grid;
  gap: 0.5rem;

  span {
    font-family: "Kaykay Bodoni", "Bodoni 72", "Playfair Display", Georgia, serif;
    font-size: clamp(5rem, 10vw, 8.5rem);
    font-weight: 560;
    letter-spacing: -0.08em;
    line-height: 0.82;
  }

  strong {
    color: var(--muted);
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }
`;

const HeroSmallText = styled.p`
  margin: 3rem 0 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.65;
`;

const FilterBar = styled.section`
  position: sticky;
  top: 0;
  z-index: 8;
  display: grid;
  grid-template-columns: minmax(12rem, 0.35fr) 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.9rem clamp(1.2rem, 4vw, 5rem);
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(20px);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    position: relative;
  }
`;

const FilterIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  span {
    color: var(--muted);
    font-size: 0.68rem;
    font-weight: 850;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  strong {
    font-size: 1rem;
  }
`;

const FilterList = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.55rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 860px) {
    justify-content: flex-start;
  }
`;

const FilterButton = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  min-height: 2.85rem;
  padding: 0 1rem;
  border: 1px solid ${({ $active }) => ($active ? "var(--ink)" : "var(--line)")};
  border-radius: 999rem;
  color: ${({ $active }) => ($active ? "#fff" : "var(--ink)")};
  background: ${({ $active }) => ($active ? "var(--ink)" : "#fff")};
  font: inherit;
  font-size: 0.75rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 260ms ease, border-color 260ms ease, background 260ms ease, color 260ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--ink);
  }
`;

const Panels = styled.div`
  display: grid;
`;

const ComparePanel = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(20rem, 0.38fr) minmax(0, 1fr);
  gap: clamp(1.25rem, 3vw, 3rem);
  min-height: 100svh;
  padding: clamp(4rem, 8vw, 7.5rem) clamp(1.2rem, 4vw, 5rem);
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.72);

  &:nth-child(even) {
    grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.38fr);

    [data-panel-copy-wrap] {
      order: 2;
    }

    [data-compare-visual] {
      order: 1;
    }
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    min-height: auto;

    &:nth-child(even) {
      grid-template-columns: 1fr;

      [data-panel-copy-wrap],
      [data-compare-visual] {
        order: initial;
      }
    }
  }
`;

const PanelNumber = styled.div`
  position: absolute;
  left: clamp(1.2rem, 4vw, 5rem);
  top: clamp(1.2rem, 3vw, 2.2rem);
  color: rgba(21, 18, 15, 0.14);
  font-family: "Kaykay Bodoni", "Bodoni 72", "Playfair Display", Georgia, serif;
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 560;
  letter-spacing: -0.08em;
  line-height: 0.8;
  pointer-events: none;
`;

const PanelCopy = styled.div`
  position: sticky;
  top: 8rem;
  align-self: start;
  display: flex;
  min-height: calc(100svh - 12rem);
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 8rem;

  @media (max-width: 980px) {
    position: relative;
    top: auto;
    min-height: auto;
    padding-top: 3rem;
  }
`;

const PanelMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.1rem;

  span {
    display: inline-flex;
    min-height: 2.25rem;
    align-items: center;
    padding: 0 0.85rem;
    border: 1px solid var(--line);
    border-radius: 999rem;
    color: var(--muted);
    background: #fff;
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }
`;

const PanelTitle = styled.h2`
  max-width: 9ch;
  margin: 0;
  font-family: "Kaykay Bodoni", "Bodoni 72", "Playfair Display", Georgia, serif;
  font-size: clamp(3.8rem, 8.5vw, 9.5rem);
  font-weight: 560;
  letter-spacing: -0.085em;
  line-height: 0.82;
`;

const PanelCaption = styled.p`
  max-width: 27rem;
  margin: 1.4rem 0 0;
  color: var(--ink);
  font-size: clamp(1.08rem, 1.8vw, 1.45rem);
  line-height: 1.45;
`;

const PanelDescription = styled.p`
  max-width: 32rem;
  margin: 1rem 0 0;
  color: var(--muted);
  font-size: 0.98rem;
  line-height: 1.75;
`;

const PanelTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.4rem;

  span {
    display: inline-flex;
    align-items: center;
    min-height: 2.5rem;
    padding: 0 0.9rem;
    border-radius: 999rem;
    background: var(--soft);
    color: var(--taupe);
    font-size: 0.74rem;
    font-weight: 850;
  }
`;

const PanelVisual = styled.div`
  align-self: center;
  width: 100%;
`;

const CompareWrap = styled.div<{ $isDragging: boolean }>`
  --split: 50%;

  position: relative;
  width: 100%;
  min-height: min(76svh, 58rem);
  overflow: hidden;
  border: 1px solid rgba(21, 18, 15, 0.09);
  border-radius: clamp(1.4rem, 2.8vw, 3rem);
  background: var(--cream);
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "ew-resize")};
  box-shadow: 0 3rem 7rem rgba(21, 18, 15, 0.09);
  user-select: none;
  touch-action: none;

  @media (max-width: 980px) {
    min-height: 68svh;
  }

  @media (max-width: 640px) {
    min-height: 32rem;
  }
`;

const ImageLayer = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.96) contrast(1.02);
    pointer-events: none;
  }
`;

const AfterLayer = styled(ImageLayer)`
  clip-path: inset(0 calc(100% - var(--split)) 0 0);

  img {
    filter: saturate(1.02) contrast(1.03) brightness(1.02);
  }
`;

const CompareLabels = styled.div`
  position: absolute;
  inset: 1rem 1rem auto;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  pointer-events: none;

  span {
    display: inline-flex;
    min-height: 2.4rem;
    align-items: center;
    padding: 0 0.85rem;
    border: 1px solid rgba(255, 255, 255, 0.38);
    border-radius: 999rem;
    color: #fff;
    background: rgba(21, 18, 15, 0.26);
    backdrop-filter: blur(12px);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }
`;

const DragControl = styled.button`
  position: absolute;
  inset: 0 auto 0 var(--split);
  z-index: 4;
  width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: ew-resize;
  transform: translateX(-50%);
  touch-action: none;

  &:focus-visible {
    outline: none;
  }

  &:focus-visible div:last-child {
    box-shadow: 0 0 0 0.35rem rgba(255, 255, 255, 0.44), 0 0 0 0.55rem rgba(21, 18, 15, 0.38);
  }
`;

const HandleLine = styled.div`
  position: absolute;
  inset: 0 auto 0 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 0 2rem rgba(21, 18, 15, 0.22);
  transform: translateX(-50%);
`;

const HandleKnob = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  width: 4.8rem;
  height: 4.8rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 999rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  box-shadow: 0 1.2rem 3rem rgba(21, 18, 15, 0.2);
  transform: translate(-50%, -50%);

  &::before {
    content: "";
    position: absolute;
    width: 2.15rem;
    height: 2.15rem;
    border: 1px solid rgba(21, 18, 15, 0.13);
    border-radius: inherit;
  }

  span {
    position: absolute;
    width: 0.55rem;
    height: 0.55rem;
    border-top: 1.5px solid var(--ink);
    border-left: 1.5px solid var(--ink);
  }

  span:first-child {
    transform: translateX(-0.58rem) rotate(-45deg);
  }

  span:last-child {
    transform: translateX(0.58rem) rotate(135deg);
  }
`;

const AsyncLoader = styled.div`
  display: grid;
  min-height: 42svh;
  place-items: center;
  gap: 1rem;
  padding: 5rem 1.2rem 7rem;
  color: var(--muted);
  text-align: center;

  > span {
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
`;

const LoaderLine = styled.div`
  position: relative;
  width: min(22rem, 70vw);
  height: 1px;
  overflow: hidden;
  background: rgba(21, 18, 15, 0.1);

  &::after {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 42%;
    background: var(--ink);
    animation: loadingSlide 1.1s ease-in-out infinite;
  }

  @keyframes loadingSlide {
    0% {
      transform: translateX(-110%);
    }
    100% {
      transform: translateX(260%);
    }
  }
`;

const LoadMoreButton = styled.button`
  min-height: 3.4rem;
  padding: 0 1.2rem;
  border: 1px solid var(--ink);
  border-radius: 999rem;
  color: #fff;
  background: var(--ink);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 260ms ease, background 260ms ease, color 260ms ease;

  &:hover {
    transform: translateY(-2px);
    color: var(--ink);
    background: #fff;
  }
`;

const EndNote = styled.div`
  display: grid;
  gap: 0.45rem;
  max-width: 32rem;

  span {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  strong {
    color: var(--ink);
    font-family: "Kaykay Bodoni", "Bodoni 72", "Playfair Display", Georgia, serif;
    font-size: clamp(2.2rem, 5vw, 4rem);
    font-weight: 560;
    letter-spacing: -0.06em;
    line-height: 0.95;
  }
`;

const ErrorText = styled.p`
  margin: 0;
  color: #8a2d22;
  font-size: 0.9rem;
`;
