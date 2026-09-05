import React from 'react';
import styled from 'styled-components';
import { kaykayServices, KaykayServiceSlug } from "../../app/services/services";

type BookingFormV0TrayProps = {
    selectedServices: string[]
}
function BookingFormV0Tray({ selectedServices = [] }: BookingFormV0TrayProps) {
  return (
    <BookingFormV0TrayWrapper>
        <div className="booking-form-tray__content">
            <div className={`selected-items-badge ${ selectedServices.length > 0 ? 'selections-available' : ''}`} role="banner" title={`You've selected ${selectedServices.length} services to book. Click on 'Complete booking to book the services`}>{ selectedServices.length }</div>
            <div className="booking-form-tray__selected-services">
            {
                selectedServices.map((v, i) => {
                    const itm = kaykayServices.find((u) => u.slug === v);
                    const imgsrc = itm?.images[0]?.src || "";
                    const imgalt = itm?.images[0]?.alt || "";
                    if( !itm ) return null;
                    const title = itm.title;
                    return <div key={i} title={ title } className="preview-selected-item" style={{ transform: `translate(${i * 3}px, ${i * 1}px) rotate(${i * 25}deg)`, zIndex: 100 - i }}>
                        <img src={imgsrc} alt={imgalt} />
                    </div>
                })
            }
            </div>
            <button>Complete booking</button>
        </div>
    </BookingFormV0TrayWrapper>
  )
}

export default BookingFormV0Tray

const BookingFormV0TrayWrapper = styled.footer`
margin: 0 auto;
width: 100%;
height: 100px;
bottom: 0;
left: 0;
position: fixed;
display: flex;
align-items: center;
justify-content: center;
z-index: 99;
pointer-events: none;

.booking-form-tray__content {
    pointer-events: all;
    background: #fff;
    border: 0.5px solid #eee;
    border-radius: 4rem;
    width: min( 350px, 90% );
    height: auto;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    -webkit-box-shadow: 0px 30px 60px 2px rgba(0,0,0,0.3);
    -moz-box-shadow:    0px 30px 60px 2px rgba(0,0,0,0.3);
    box-shadow:         0px 30px 60px 2px rgba(0,0,0,0.3); 

    -webkit-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    -moz-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    -ms-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    .selected-items-badge {
      width: 30px;
      height: 30px;
      position: absolute;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0; left: 0;
      overflow: hidden;
      z-index: 10;
      background: #eee;
      color: #222;
      font-size: clamp(8px, 2vw, 10px);
      font-weight: bolder;

      -webkit-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      -moz-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      -ms-transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      
      &.selections-available {
        background: #f00;
        color: #f7f7f7;
      }
    }

    .booking-form-tray__selected-services {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;

      .preview-selected-item {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0; left: 20%;
        border-radius: 10px;
        border: 2px solid #fff;
        -webkit-box-shadow: 0px 10px 15px 2px rgba(0,0,0,0.03);
        -moz-box-shadow:    0px 10px 15px 2px rgba(0,0,0,0.03);
        box-shadow:         0px 10px 15px 2px rgba(0,0,0,0.03); 

        transform-origin: center center;
        overflow: hidden;
        z-index: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    
    }

    button {
        flex: 2;
        width: max-content;
        border: 0.5px solid #f7f7f7;
        border-radius: 2rem;
        background: #333;
        color: #ddd;
    
        padding: 1rem 2rem;
    
        font-weight: bolder;
        z-index: 10;
    
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

`;