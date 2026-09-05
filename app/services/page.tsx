'use client'

import { useState, useEffect } from 'react';

import PageMenuPlaceholder from '@/components/PageMenuPlaceholder';
import { kaykayServices, KaykayServiceSlug } from "./services";
import styled from 'styled-components';
import BookingFormV0Tray from '@/components/booking/BookingFormV0Tray';


export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<KaykayServiceSlug[]>([]);

  // function to toggle booking item selection
  const toggleBookItemSelection = ( slug: KaykayServiceSlug ) => {
    if( !kaykayServices || !kaykayServices.length ) return;
    if( selectedServices.includes( slug ) ) {
      const newSel = selectedServices?.filter( (v, i) => v !== slug );
      setSelectedServices( newSel );
      return;
    } 
    setSelectedServices(prev => {
      return [...prev, slug];
    });
  }

  useEffect(() => {
    console.log( selectedServices );
  }, [ selectedServices ]);

  return (
    <>
      <BookingFormV0Tray selectedServices={ selectedServices } />
      <PageMenuPlaceholder title="Services" width="90%">
        <BookingItemWrapper aria-label="Kaykay Hair services">
          {
            kaykayServices.map((itm) => {
            const image = itm?.images?.[0];
            const titleId = `booking-service-title-${itm.slug}`;
            const descriptionId = `booking-service-description-${itm.slug}`;
            const selected = selectedServices.includes( itm.slug );

            return (
              <li key={itm.slug}>
                <article className={`booking-item ${ selected ? 'selected-item' : ''}`} aria-labelledby={titleId}>
                  <h3 id={titleId} className="booking-item__title">
                    {itm.title}
                  </h3>

                  {image?.src && (
                    <div className="booking-item__img" aria-hidden={!image?.alt}>
                      <img
                        src={image.src}
                        alt={image.alt || ""}
                        loading="lazy"
                      />
                    </div>
                  )}

                  {itm.description && (
                    <div className="booking-item__content">
                      <p id={descriptionId}>{itm.description}</p>
                    </div>
                  )}

                  <div className="booking-item__ctas">
                    <button
                      type="button"
                      aria-labelledby={titleId}
                      aria-describedby={itm.description ? descriptionId : undefined}
                      onClick={() => toggleBookItemSelection(itm.slug)}
                    >
                      Select this service
                    </button>
                  </div>

                </article>
              </li>
            );
          })}
        </BookingItemWrapper>
      </PageMenuPlaceholder>
    </>
  
  );
}

const BookingItemWrapper = styled.ul`
width: 100%;
height: auto;
display: grid;
grid-template-columns: repeat( auto-fill, minmax(40vw, 1fr) );
position: relative;
gap: 2rem;
padding: 2rem;
list-style: none;

.booking-item {
  width: 100%;
  height: 90vh;
  overflow: hidden;
  position: relative;
  padding: 2rem;

  border: 0.5px solid #f7f7f7;
  border-radius: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  -webkit-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
  -moz-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
  -ms-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
  transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);

  &.selected-item {
    border: 8px solid #eee;
  }

  h3 {
    font-family: var( --kh-font-family-ui );
    font-size: clamp( 20px, 5vw, 40px );
    font-weight: 300;
    line-height: 0.9;
    position: relative;
  }
    
  p {
    font-family: var( --kh-font-family-ui );
    font-size: clamp( 8px, 3vw, 14px );
    position: relative;
    line-height: 1.4;
  }

  .booking-item__img {
    border-radius: 1rem;
    width: 100%;
    height: 60vh;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      -webkit-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
      -moz-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
      -ms-transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
      transition: all 1s cubic-bezier(0.16, 1, 0.1, 1);
    }
    
    &:hover {
      img {
        transform: scale(1.2) rotate(3deg);
      }
    
    }
  }

  .booking-item__content {}

  .booking-item__ctas {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: max-content;
      border: 0.5px solid #f7f7f7;
      border-radius: 2rem;
      background: #fff;
      color: #222;
  
      padding: 1rem 2rem;
  
      font-weight: bolder;
  
      -webkit-box-shadow: 0px 10px 30px 2px rgba(0,0,0,0.05);
      -moz-box-shadow:    0px 10px 30px 2px rgba(0,0,0,0.05);
      box-shadow:         0px 10px 30px 2px rgba(0,0,0,0.05); 
  
      -webkit-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      -moz-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      -ms-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    button:hover {      
      background: #111;
      color: #fff;
    }
  
  }



  -webkit-box-shadow: 0px 20px 30px 2px rgba(0,0,0,0);
  -moz-box-shadow:    0px 20px 30px 2px rgba(0,0,0,0);
  box-shadow:         0px 20px 30px 2px rgba(0,0,0,0); 

  -webkit-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  -moz-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  -ms-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.booking-item:hover {
  border: 0.5px solid #eee;

  &.selected-item {
    border: 8px solid #dd3f6fbb;
  }

  -webkit-box-shadow: 0px 20px 60px 2px rgba(0,0,0,0.05);
  -moz-box-shadow:    0px 20px 60px 2px rgba(0,0,0,0.05);
  box-shadow:         0px 20px 60px 2px rgba(0,0,0,0.05); 
}

`;