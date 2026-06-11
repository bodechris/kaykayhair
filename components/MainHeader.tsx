
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

function MainHeader() {
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
            <li><Link href="/">Home</Link></li>
            <li><Link href="/book">Book Now</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/care-plus">Care Plus</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/lookbook">LookBook</Link></li>
            <li><Link href="/befores-and-afters">Befores and Afters</Link></li>
            <li><Link href="/contact">Contact</Link></li>
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
          // font-family: "Kaykay Vogue Sans", sans-serif;
          // font-weight: 700;
          font-size: clamp(12px, 1vw, 16px);
          // letter-spacing: 0.08em;
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
