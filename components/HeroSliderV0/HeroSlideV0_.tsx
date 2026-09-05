import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import DesignRegistryRenderer, { type DesignRegistryPayload } from './design-registry';

type HeroSlideMedia = {
  fg?: string;
  bg?: string;
  alt?: string;
}

type HeroSlideV0Props = PropsWithChildren & {
  mainCss?: React.CSSProperties | Record<string, any>;
  title?: string;
  mainDesignText?: DesignRegistryPayload;
  description?: string;
  primaryCta?: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
  media?: HeroSlideMedia;
  priority?: boolean;
  secondaryDesignText?: DesignRegistryPayload[];
}

function HeroSlideV0({ children, mainCss, title, mainDesignText, description, primaryCta, secondaryCta, media, priority = false, secondaryDesignText }: HeroSlideV0Props) {
  return (
    <HeroSlideV0Wrapper $mainCss={mainCss} data-hero-slide="true">

      {media?.bg ? (
        <div className="hero-bg-media">
          <Image
            src={media.bg}
            alt={media.alt ?? title ?? 'Hero background'}
            fill
            sizes="100vw"
            priority={priority}
            aria-hidden="true"
          />
        </div>
      ) : null}

      {/* <div className="hero-overlay" /> */}

      <div className="hero-inner">

        <div className="hero-copy">
          <DesignRegistryRenderer payload={mainDesignText} />

          {description ? (
            <p className="hero-description">
              <span>{description}</span>
            </p>
          ) : null}
          
          {children}
          {(primaryCta || secondaryCta) ? (
            <div className="hero-actions">
              {primaryCta ? <Link href={primaryCta.href}>{primaryCta.label}</Link> : null}
              {secondaryCta ? <Link href={secondaryCta.href}>{secondaryCta.label}</Link> : null}
            </div>
          ) : null}

        </div>

        {media?.fg ? (
          <div className="hero-media">
            <Image
              src={media.fg}
              alt={media.alt ?? title ?? 'Hero image'}
              fill
              sizes="100vw"
              priority={priority}
            />

          </div>
        ) : null}

      </div>

      <div className="hero-secondary-design">
        {secondaryDesignText?.map((payload, index) => (
          <DesignRegistryRenderer key={index} payload={payload} />
        ))}
      </div>
    </HeroSlideV0Wrapper> 
  )
}

export default HeroSlideV0;


type HeroSlideV0WrapperProps = {
  $mainCss?: React.CSSProperties;
}
const HeroSlideV0Wrapper = styled.div<HeroSlideV0WrapperProps>`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
//   background:
//     radial-gradient(circle at top left, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.75) 32%, rgba(255, 255, 255, 0) 60%),
//     linear-gradient(135deg, #fff7fb 0%, #fce6f2 45%, #f2d9ee 100%);
  position: relative;
  isolation: isolate;
  overflow: hidden;

  

  .hero-bg-media {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    opacity: 0.18;
    z-index: -3;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .hero-bg-media :global(img) {
    object-fit: cover;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.74) 45%, rgba(255, 255, 255, 0.2) 100%);
    z-index: -2;
  }

  .hero-inner {
    width: 90%;
    align-items: center;
    gap: clamp(2rem, 5vw, 5rem);    
  }

  .hero-copy {
    display: grid;
    gap: 1.5rem;
    max-width: 40rem;
    position: relative;
    z-index: 2;
  }

  .hero-eyebrow {
    font-family: var(--kh-font-family-sans);
    font-size: var(--kh-font-size-xs);
    letter-spacing: var(--kh-letter-spacing-uppercase);
    text-transform: uppercase;
    color: var(--kh-color-pink-700);
  }

  h1 {
    font-family: var(--kh-font-family-display);
    font-size: clamp(3.5rem, 9vw, 6.5rem);
    line-height: 0.9;
    letter-spacing: var(--kh-letter-spacing-tight);
    color: #1d1320;
  }

  .hero-description {
    max-width: min(400px, 80%);
    font-size: clamp(1rem, 1.1vw, 1.15rem);
    line-height: 1.5;

    span {
      display: inline;
      padding: 0.3rem 0.5rem;      
      color: #fff;
      font-weight: 700;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
    }
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .hero-actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.25rem;
    padding: 0 1.5rem;
    border-radius: 999px;
    border: 1px solid rgba(29, 19, 32, 0.12);
    background: rgba(255, 255, 255, 0.88);
    box-shadow: 0 12px 30px rgba(94, 50, 90, 0.12);
    font-size: 0.95rem;
    font-weight: 600;
  }

  .hero-actions a:first-child {
    background: #1d1320;
    color: #fff;
  }

  .hero-media {
    width: 100%;
    height: 100vh;
    top: 0; left: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

  }

  .hero-media :global(img) {
    object-fit: cover;
  }

  .hero-secondary-design {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 5rem; left: 0;
    display: none;
  }

  @media all and (min-width: 768px) {
    min-height: auto;
    padding-top: 7rem;

    .hero-inner {
    }

    .hero-copy {
    }

    .hero-media {
    }

    .hero-secondary-design {
        display: flex;
        flex-direction: column;
    }
  }


  ${({ $mainCss }) => $mainCss && { ...$mainCss }}

`;