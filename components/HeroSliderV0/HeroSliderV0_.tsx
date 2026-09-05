'use client';

import { useId, useRef, useState, PropsWithChildren, Children, isValidElement, KeyboardEvent } from 'react';
import styled from 'styled-components';

type HeroSliderV0Props = PropsWithChildren & {
}
function HeroSliderV0({ children }: HeroSliderV0Props) {
  const sliderId = useId();
  const navButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
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

  const goToSlide = (nextIndex: number) => {
    if (slideCount === 0) {
      return;
    }

    const normalizedIndex = (nextIndex + slideCount) % slideCount;
    setActiveSlideIndex(normalizedIndex);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'Right':
        event.preventDefault();
        goToSlide(clampedActiveSlideIndex + 1);
        break;
      case 'ArrowLeft':
      case 'Left':
        event.preventDefault();
        goToSlide(clampedActiveSlideIndex - 1);
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
      $activeSlideIndex={clampedActiveSlideIndex}
      tabIndex={slideCount > 1 ? 0 : -1}
      role="region"
      aria-roledescription="carousel"
      aria-label="Homepage featured slides"
      onKeyDown={handleKeyDown}
    >
        {
          !slideCount ? (
            <div className="hero-slide slide-empty">
              <p>No slides available.</p>
            </div>
          ) : (
            renderedChildren
          )
        }
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
  )
}

export default HeroSliderV0;


type HeroSliderV0WrapperProps = {
  $activeSlideIndex?: number;
}
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
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
  }
  .hero-slide.active {
    display: flex;
  }

  .slide-empty {
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