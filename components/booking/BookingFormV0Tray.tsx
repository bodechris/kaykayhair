"use client"

import React from "react"
import styled from "styled-components"
import { kaykayServices, type KaykayServiceSlug } from "../../app/services/services"
import { formatZar } from "./booking-config"

type BookingFormV0TrayProps = {
  selectedServices: KaykayServiceSlug[]
  onContinue: () => void
}

export default function BookingFormV0Tray({ selectedServices = [], onContinue }: BookingFormV0TrayProps) {
  const selected = selectedServices
    .map((slug) => kaykayServices.find((service) => service.slug === slug))
    .filter(Boolean)
  const fromTotal = selected.reduce((sum, item) => sum + (item?.fromPrice ?? 0), 0)
  const hasSelection = selected.length > 0

  return (
    <BookingFormV0TrayWrapper aria-live="polite">
      <div className="booking-form-tray__content">
        <div className={`selected-items-badge ${hasSelection ? "selections-available" : ""}`} aria-label={`${selected.length} selected services`}>
          {selected.length}
        </div>
        <div className="booking-form-tray__selected-services" aria-hidden="true">
          {selected.slice(0, 4).map((item, i) => {
            if (!item) return null
            const image = item.images[0]
            return (
              <div
                key={item.slug}
                title={item.title}
                className="preview-selected-item"
                style={{ transform: `translate(${i * 10}px, ${i * 1}px) rotate(${i * 8 - 10}deg)`, zIndex: 100 - i }}
              >
                {image?.src ? <img src={image.src} alt="" /> : null}
              </div>
            )
          })}
        </div>
        <button type="button" onClick={onContinue} disabled={!hasSelection}>
          <span>{hasSelection ? `${selected.length} service${selected.length === 1 ? "" : "s"} · from ${formatZar(fromTotal)}` : "Select a service"}</span>
          <strong>{hasSelection ? "Continue booking" : "Browse services"}</strong>
        </button>
      </div>
    </BookingFormV0TrayWrapper>
  )
}

const BookingFormV0TrayWrapper = styled.footer`
  margin: 0 auto;
  width: 100%;
  min-height: 108px;
  bottom: 0;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  pointer-events: none;
  padding: 12px;

  .booking-form-tray__content {
    pointer-events: all;
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(18px);
    border: 1px solid #e9e9e9;
    border-radius: 999px;
    width: min(520px, 96vw);
    min-height: 76px;
    padding: 8px 8px 8px 14px;
    display: flex;
    align-items: center;
    position: relative;
    box-shadow: 0 24px 60px rgba(0,0,0,0.16);
  }

  .selected-items-badge {
    width: 26px;
    height: 26px;
    position: absolute;
    border-radius: 999px;
    display: grid;
    place-items: center;
    top: -4px;
    left: 2px;
    z-index: 10;
    background: #eee;
    color: #222;
    font-size: 10px;
    font-weight: 800;

    &.selections-available {
      background: #dd3f6f;
      color: white;
    }
  }

  .booking-form-tray__selected-services {
    position: relative;
    width: 86px;
    height: 44px;
    flex: 0 0 86px;

    .preview-selected-item {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 2px;
      left: 10px;
      border-radius: 12px;
      border: 2px solid #fff;
      box-shadow: 0 8px 18px rgba(0,0,0,0.12);
      overflow: hidden;

      img { width: 100%; height: 100%; object-fit: cover; }
    }
  }

  button {
    flex: 1;
    min-width: 0;
    border: 0;
    border-radius: 999px;
    background: #1d1d1f;
    color: #fff;
    min-height: 58px;
    padding: 9px 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    transition: transform 180ms ease, background 180ms ease;

    span { font-size: 10px; opacity: 0.7; font-weight: 600; }
    strong { font-size: 13px; margin-top: 2px; }

    &:hover:not(:disabled) { background: #000; transform: translateY(-1px); }
    &:disabled { background: #efefef; color: #777; cursor: default; }
  }

  @media (max-width: 560px) {
    .booking-form-tray__selected-services { width: 62px; flex-basis: 62px; }
    button { padding-inline: 16px; }
  }
`
