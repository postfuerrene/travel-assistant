"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    _wcomWidget?: (config: {
      id: string;
      location: string;
      format: string;
      type: string;
    }) => void;
  }
}

const SCRIPT_SRC = "https://cs3.wettercomassets.com/woys/5/js/w.js";
let scriptLoadPromise: Promise<void> | null = null;

function loadWcomScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!scriptLoadPromise) {
    scriptLoadPromise = new Promise((resolve) => {
      if (window._wcomWidget) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }
  return scriptLoadPromise;
}

export default function WetterComWidget({
  widgetId,
  location,
  cityLabel,
  pageUrl,
}: {
  widgetId: string;
  location: string;
  cityLabel: string;
  pageUrl: string;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    loadWcomScript().then(() => {
      window._wcomWidget?.({
        id: widgetId,
        location,
        format: "300x250",
        type: "summary",
      });
    });
  }, [widgetId, location]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cs3.wettercomassets.com/woys/5/css/w.css"
      />
      <div
        id={widgetId}
        className="wcom-default w300x250"
        style={{
          border: "1px solid #ccc",
          backgroundColor: "#fcfcfc",
          borderRadius: "5px",
        }}
      >
        <div className="wcom-city">
          <a
            style={{ color: "#000" }}
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            title={`Wetter ${cityLabel}`}
          >
            Wetter {cityLabel}
          </a>
        </div>
        <div id={`${widgetId}-weather`} />
      </div>
    </div>
  );
}
