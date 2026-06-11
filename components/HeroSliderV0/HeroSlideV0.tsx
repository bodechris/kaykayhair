import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

function HeroSlideV0() {
  return (
    <HeroSlideV0Wrapper>
        <div className="hero-main-title style-1">
            <h1>
                <span className="hl-1">Glow</span>
                <span>like an</span>
                <span className="hl-2">African Queen</span>
                <span>that you are.</span>
            </h1>
            <p className="hl-p-1">Premium installs, styling, treatments, makeup, nails and beauty care for women who want to look polished every day.</p>
            <Link href="/services">Book Your Glow-Up</Link>
        </div>

        <div className="hero-secondary-title">
            <h2>Luxury Wig Installs</h2>
            <p>Shot description: Close-up of flawless lace melt, soft baby hairs, glossy black hairline detail.</p>
            <Link href="/services">View Services</Link>
        </div>

        <div className="hero-secondary-title title-2">
            <h2>CarePlus Beauty Club</h2>
            <p>Shot description: Woman seated comfortably in salon chair, hair being styled.</p>
            <Link href="/care-plus">Join CarePlus</Link>
        </div>

        <img src="/images/hero/slide-1-img.webp" alt="KayKay Hair Logo" />
    </HeroSlideV0Wrapper> 
  )
}

export default HeroSlideV0;

const HeroSlideV0Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #ffffff 0%, #fff 10%, #f9e1f7 100%);
  position: relative;

  img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

.hero-main-title {
    width: min(90%, 400px);
    position: absolute;
    top: 20%;
    left: 5%;
    color: #222;

    h1 {
        width: 100%;
        font-family: "Kaykay Fraunces", sans-serif;        
        font-style: italic;
        line-height: 0.9;
        font-weight: 900;
        display: flex;
        flex-flow: row wrap;
        // flex-direction: column;
        gap: 0.5rem;

        margin-bottom: 40px;

        span {
          font-size: clamp(1.5rem, 10vw, 3rem);
          margin-top: 10px;
        }

        .hl-1 {
            font-size: clamp(2rem, 10vw, 4rem);
            color: var(--kh-color-pink-500);
            margin-top: 0;
        }

        .hl-2 {
            font-size: clamp(3rem, 10vw, 6rem);
             color: var(--kh-color-pink-500);
             margin-top: 0;
        }
    }

    p {
        width: 100%;
        font-family: "Kaykay Montserrat", sans-serif;
        font-weight: 600;
        font-size: clamp(0.8rem, 2vw, 1.2rem);
        line-height: 1.2;
    }

    .hl-p-1 {
        display: inline; 
        
        background-color: #d8315b; 
        color: #ffffff;
        
        padding: 4px 8px;
        
        /* 4. Keeps the padding from overlapping vertical lines */
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone; /* For Safari support */
        
        line-height: 1.6;
    }

    button, a {
        width: max-content;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #111;
        color: #ccc;
        padding: 1rem 2rem;
        text-decoration: none;

        font-weight: 600;
        margin-top: 2rem;

        font-size: clamp(0.8rem, 2vw, 1.2rem);

        transform-origin: left center;
        
        -webkit-transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        -moz-transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        -ms-transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

        -webkit-box-shadow: 0px 20px 5px 2px rgba(0,0,0,0);
        -moz-box-shadow:    0px 20px 5px 2px rgba(0,0,0,0);
        box-shadow:         0px 20px 5px 2px rgba(0,0,0,0);

        &:hover {
            font-size: clamp(1.2rem, 3vw, 1.8rem);
            background: var(--kh-color-blue-500);
            color: #fff;

            -webkit-box-shadow: -20px 30px 5px 2px rgba(0,0,0,0.1);
            -moz-box-shadow:    -20px 30px 5px 2px rgba(0,0,0,0.1);
            box-shadow:         -20px 30px 5px 2px rgba(0,0,0,0.1);
        }
    }
}

.hero-secondary-title {
    width: min(90%, 300px);
    position: absolute;
    top: 20%;
    right: 5%;
    text-align: right;
    color: #222;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    h2 {
        font-weight: 500;
        font-size: clamp(1.5rem, 5vw, 2.5rem);
        line-height: 0.9;
        color: #222;
        margin-bottom: 20px;
    }
    p {
        font-size: clamp(10px, 2vw, 14px);
        line-height: 1.6;
        font-weight: 600;
    }
}
.hero-secondary-title.title-2 {
    top: 50%;
}
`;