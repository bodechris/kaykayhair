'use client';

import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent, PropsWithChildren } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

type HeroSliderV0Props = PropsWithChildren & {};

function HeroSliderV0({ children }: HeroSliderV0Props) {
  const sliderId = useId();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const navButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const currentSlideIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const queuedSlideIndexRef = useRef<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const childNodes = Children.toArray(children);
  const slideKeys: Array<string | number> = [];

  let slideCount = 0;

  childNodes.forEach((child) => {
    if (
      isValidElement<{ 'data-hero-slide'?: string }>(child) &&
      child.props['data-hero-slide'] === 'true'
    ) {
      slideKeys.push(child.key ?? `slide-${slideCount}`);
      slideCount += 1;
    }
  });

  const clampedActiveSlideIndex = slideCount === 0 ? 0 : Math.min(activeSlideIndex, slideCount - 1);

  const getSlidePanels = useCallback(() => {
    if (!sliderRef.current) {
      return [] as HTMLElement[];
    }

    return Array.from(
      sliderRef.current.querySelectorAll<HTMLElement>('[data-hero-slide-panel="true"]')
    );
  }, []);

  const getTextItems = useCallback(
    (slide: HTMLElement) =>
      Array.from(slide.querySelectorAll<HTMLElement>('.hero-copy > *, .hero-secondary-design > *')),
    []
  );

  const getMediaItems = useCallback(
    (slide: HTMLElement) =>
      Array.from(slide.querySelectorAll<HTMLElement>('.hero-media, .hero-bg-media')),
    []
  );

  const getSlideDirection = useCallback(
    (nextIndex: number, currentIndex: number) => {
      if (slideCount <= 1) {
        return 1;
      }

      const forwardDistance = (nextIndex - currentIndex + slideCount) % slideCount;
      const backwardDistance = (currentIndex - nextIndex + slideCount) % slideCount;

      return forwardDistance <= backwardDistance ? 1 : -1;
    },
    [slideCount]
  );

  const animateToSlide = useCallback(
    (nextIndex: number) => {
      if (slideCount === 0) {
        return;
      }

      const normalizedIndex = (nextIndex + slideCount) % slideCount;
      const currentIndex = currentSlideIndexRef.current;

      if (normalizedIndex === currentIndex && !isAnimatingRef.current) {
        return;
      }

      if (isAnimatingRef.current) {
        queuedSlideIndexRef.current = normalizedIndex;
        return;
      }

      const slidePanels = getSlidePanels();
      const currentSlide = slidePanels[currentIndex];
      const nextSlide = slidePanels[normalizedIndex];

      if (!currentSlide || !nextSlide || currentSlide === nextSlide) {
        currentSlideIndexRef.current = normalizedIndex;
        setActiveSlideIndex(normalizedIndex);
        return;
      }

      const shouldReduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (shouldReduceMotion) {
        gsap.set(slidePanels, { autoAlpha: 0, pointerEvents: 'none', zIndex: 1 });
        gsap.set(nextSlide, { autoAlpha: 1, pointerEvents: 'auto', zIndex: 2 });
        currentSlideIndexRef.current = normalizedIndex;
        setActiveSlideIndex(normalizedIndex);
        return;
      }

      const direction = getSlideDirection(normalizedIndex, currentIndex);
      const currentTextItems = getTextItems(currentSlide);
      const nextTextItems = getTextItems(nextSlide);
      const currentMediaItems = getMediaItems(currentSlide);
      const nextMediaItems = getMediaItems(nextSlide);
      const animatedItems = [
        currentSlide,
        nextSlide,
        ...currentTextItems,
        ...nextTextItems,
        ...currentMediaItems,
        ...nextMediaItems,
      ];

      isAnimatingRef.current = true;
      queuedSlideIndexRef.current = null;
      gsap.killTweensOf(animatedItems);

      gsap.set(currentSlide, {
        autoAlpha: 1,
        pointerEvents: 'none',
        zIndex: 2,
      });

      gsap.set(nextSlide, {
        autoAlpha: 0,
        pointerEvents: 'none',
        zIndex: 3,
      });

      gsap.set(nextTextItems, {
        autoAlpha: 0,
        y: 36,
      });

      gsap.set(nextMediaItems, {
        autoAlpha: 0,
        scale: 1.06,
        xPercent: direction * 4,
      });

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.set(currentSlide, {
            autoAlpha: 0,
            pointerEvents: 'none',
            zIndex: 1,
          });

          gsap.set(nextSlide, {
            autoAlpha: 1,
            pointerEvents: 'auto',
            zIndex: 2,
          });

          gsap.set([...currentTextItems, ...nextTextItems, ...currentMediaItems, ...nextMediaItems], {
            clearProps: 'transform,opacity,visibility',
          });

          currentSlideIndexRef.current = normalizedIndex;
          setActiveSlideIndex(normalizedIndex);
          isAnimatingRef.current = false;

          const queuedSlideIndex = queuedSlideIndexRef.current;
          queuedSlideIndexRef.current = null;

          if (queuedSlideIndex !== null && queuedSlideIndex !== normalizedIndex) {
            requestAnimationFrame(() => animateToSlide(queuedSlideIndex));
          }
        },
      });

      timeline
        .to(
          currentTextItems,
          {
            autoAlpha: 0,
            y: -28,
            stagger: 0.035,
            duration: 0.34,
            ease: 'power2.in',
          },
          0
        )
        .to(
          currentMediaItems,
          {
            autoAlpha: 0,
            scale: 0.97,
            xPercent: direction * -3,
            duration: 0.48,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          currentSlide,
          {
            autoAlpha: 0,
            duration: 0.45,
            ease: 'power2.inOut',
          },
          0.12
        )
        .to(
          nextSlide,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.2
        )
        .to(
          nextMediaItems,
          {
            autoAlpha: 1,
            scale: 1,
            xPercent: 0,
            duration: 0.78,
          },
          0.24
        )
        .to(
          nextTextItems,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.065,
            duration: 0.62,
          },
          0.34
        );
    },
    [getMediaItems, getSlideDirection, getSlidePanels, getTextItems, slideCount]
  );

  useEffect(() => {
    const slidePanels = getSlidePanels();

    if (!slidePanels.length) {
      return;
    }

    currentSlideIndexRef.current = clampedActiveSlideIndex;

    slidePanels.forEach((slide, index) => {
      const isActive = index === clampedActiveSlideIndex;

      gsap.set(slide, {
        autoAlpha: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 2 : 1,
      });

      gsap.set([...getTextItems(slide), ...getMediaItems(slide)], {
        clearProps: 'transform,opacity,visibility',
      });
    });
  }, [clampedActiveSlideIndex, getMediaItems, getSlidePanels, getTextItems, slideCount]);

  useEffect(() => {
    return () => {
      const slidePanels = getSlidePanels();
      const animatedItems = slidePanels.flatMap((slide) => [
        slide,
        ...getTextItems(slide),
        ...getMediaItems(slide),
      ]);

      gsap.killTweensOf(animatedItems);
    };
  }, [getMediaItems, getSlidePanels, getTextItems]);

  const goToSlide = (nextIndex: number) => {
    if (slideCount === 0) {
      return;
    }

    animateToSlide(nextIndex);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'Right':
        event.preventDefault();
        goToSlide(currentSlideIndexRef.current + 1);
        break;
      case 'ArrowLeft':
      case 'Left':
        event.preventDefault();
        goToSlide(currentSlideIndexRef.current - 1);
        break;
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(slideCount - 1);
        break;
      default:
        break;
    }
  };

  const focusSlideButton = (nextIndex: number) => {
    navButtonRefs.current[nextIndex]?.focus();
  };

  const handleNavKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'Right': {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % slideCount;
        goToSlide(nextIndex);
        focusSlideButton(nextIndex);
        break;
      }
      case 'ArrowLeft':
      case 'Left': {
        event.preventDefault();
        const nextIndex = (currentIndex - 1 + slideCount) % slideCount;
        goToSlide(nextIndex);
        focusSlideButton(nextIndex);
        break;
      }
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        focusSlideButton(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(slideCount - 1);
        focusSlideButton(slideCount - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        goToSlide(currentIndex);
        break;
      default:
        break;
    }
  };

  let renderedSlideIndex = 0;
  const renderedChildren = childNodes.map((child) => {
    if (
      isValidElement<{ 'data-hero-slide'?: string }>(child) &&
      child.props['data-hero-slide'] === 'true'
    ) {
      const slideIndex = renderedSlideIndex;
      renderedSlideIndex += 1;
      const panelId = `${sliderId}-panel-${slideIndex}`;
      const tabId = `${sliderId}-tab-${slideIndex}`;
      const isActive = slideIndex === clampedActiveSlideIndex;

      return (
        <div
          key={child.key ?? `slide-${slideIndex}`}
          id={panelId}
          className={`hero-slide ${isActive ? 'active' : ''}`}
          data-hero-slide-panel="true"
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${slideIndex + 1} of ${slideCount}`}
          aria-hidden={!isActive}
          aria-labelledby={tabId}
        >
          {child}
        </div>
      );
    }

    return child;
  });

  return (
    <HeroSliderV0Wrapper
      ref={sliderRef}
      $activeSlideIndex={clampedActiveSlideIndex}
      tabIndex={slideCount > 1 ? 0 : -1}
      role="region"
      aria-roledescription="carousel"
      aria-label="Homepage featured slides"
      onKeyDown={handleKeyDown}
    >
      {!slideCount ? (
        <div className="hero-slide slide-empty">
          <p>No slides available.</p>
        </div>
      ) : (
        renderedChildren
      )}

      {slideCount > 1 ? (
        <div className="hero-slider-nav" role="tablist" aria-label="Choose a featured slide">
          {slideKeys.map((slideKey, index) => {
            const isActive = index === clampedActiveSlideIndex;

            return (
              <button
                key={slideKey}
                id={`${sliderId}-tab-${index}`}
                type="button"
                role="tab"
                ref={(element) => {
                  navButtonRefs.current[index] = element;
                }}
                aria-selected={isActive}
                aria-controls={`${sliderId}-panel-${index}`}
                aria-label={`Go to slide ${index + 1}`}
                tabIndex={isActive ? 0 : -1}
                className={isActive ? 'active' : ''}
                onClick={() => goToSlide(index)}
                onFocus={() => goToSlide(index)}
                onKeyDown={(event) => handleNavKeyDown(event, index)}
              >
                <span className="sr-only">Slide {index + 1}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </HeroSliderV0Wrapper>
  );
}

export default HeroSliderV0;

type HeroSliderV0WrapperProps = {
  $activeSlideIndex?: number;
};

const HeroSliderV0Wrapper = styled.div<HeroSliderV0WrapperProps>`
  margin: 0 auto;
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #f8edf7 0%, #f7edf5 100%);
  position: relative;
  overflow: hidden;
  outline: none;

  .hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 1;
    will-change: opacity, transform;
  }

  .hero-slide.active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    z-index: 2;
  }

  .slide-empty {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      text-align: center;
      width: min(80%, 600px);
      font-weight: 300;
      font-size: clamp(1.5rem, 2vw, 2.5rem);
    }
  }

  .hero-slider-nav {
    position: absolute;
    left: 50%;
    bottom: clamp(1.5rem, 2.5vw, 2.5rem);
    transform: translateX(-50%);
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.65rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.32);
    backdrop-filter: blur(10px);
  }

  .hero-slider-nav button {
    width: clamp(3.75rem, 7vw, 6rem);
    height: 1.85rem;
    border: 0;
    padding: 0;
    position: relative;
    border-radius: 999px;
    background: transparent;
    transition: transform 180ms ease;
  }

  .hero-slider-nav button::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 0.6rem;
    transform: translateY(-50%);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: inset 0 0 0 1px rgba(29, 19, 32, 0.06);
    transition: background 180ms ease, box-shadow 180ms ease;
  }

  .hero-slider-nav button:hover {
    transform: translateY(-1px);
  }

  .hero-slider-nav button.active::before {
    background: #151515;
    box-shadow: 0 0 0 1px rgba(21, 21, 21, 0.12);
  }

  .hero-slider-nav button:focus-visible {
    outline: 2px solid #151515;
    outline-offset: 3px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
