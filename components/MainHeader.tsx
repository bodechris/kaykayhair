'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const navItems = [
  { href: "/", label: "Home" },
  // { href: "/book", label: "Book Now" },
  { href: "/services", label: "Services" },
  { href: "/care-plus", label: "Care Plus" },
  { href: "/shop", label: "Shop" },
  { href: "/lookbook", label: "LookBook" },
  { href: "/befores-and-afters", label: "Befores and Afters" },
  { href: "/contact", label: "Contact" },
];

function MainHeader() {
  const pathname = usePathname();

  return (
    <MainHeaderWrapper>
      <div className="main-header-holder">
        <div className="main-logo">
          <Link href="/">
            <Image src="/horizontal-logo.svg" alt="KayKay Hair Logo" width={300} height={200} />
          </Link>
        </div>
        <nav className="main-nav" aria-label="Main navigation"> 
          <ul>
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive ? "page" : undefined} className={isActive ? "active" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button className="mobile-menu-toggle" aria-label="Toggle mobile menu">
          <svg viewBox="0 0 458 166">
            <rect width="458" height="58"/>
            <rect x="143.12" y="108" width="314.88" height="58"/>
          </svg>
        </button>
      </div>
    </MainHeaderWrapper>
  )
}

export default MainHeader; 


const MainHeaderWrapper = styled.header`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0; left: 0;

  z-index: 999;


  .main-header-holder {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    position: relative;

    padding: 2rem 0;

    .main-logo {
      width: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
    }
    .main-logo:before {
      content: "";
      position: absolute;
      width: 300px;
      height: 150px;
      background: transparent;
      top: -300px; left: -20px;
      isolation: isolate;
      z-index: -1;

      box-shadow: 0 250px 80px 10px rgba(255, 255, 255, 0.8);
    }

    .main-nav {
      width: 100%;
      display: none;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      
      ul {
        margin: 0 auto;
        width: 100%;
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0;
        margin: 0;

        background: #fff;
        padding: 1rem 2rem;

        li {
          font-weight: 500;
          font-size: clamp(12px, 1vw, 16px);
        }

        a {
          display: inline-flex;
          align-items: center;
          min-height: 2.25rem;
          padding: 0 0.4rem;
          border-radius: 999px;
          transition: color 160ms ease-in-out, background-color 160ms ease-in-out;
        }

        a.active {
          color: #ffffff;
          background: #171219;
          padding: 0.2rem 1rem;
        }

        a:focus-visible {
          outline: 2px solid #171219;
          outline-offset: 2px;
        }
      }
    }

    .mobile-menu-toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: clamp(60px, 5vw, 80px);
      height: clamp(40px, 5vw, 60px);
      background: #fff;
      padding: 1rem;
    }

    @media all and (min-width: 1200px) {
      .main-nav {
        display: flex;
        ul { }
      }
      .mobile-menu-toggle {
        display: none;
      }
    }
  }
`;
