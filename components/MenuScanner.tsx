"use client";

import { useEffect, useRef, useState } from "react";

type Detector = {
  detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>>;
};

declare global {
  interface Window {
    BarcodeDetector?: new (options?: { formats?: string[] }) => Detector;
  }
}

function slugFromScan(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    const firstPath = url.pathname.split("/").filter(Boolean)[0];
    return firstPath ?? "";
  } catch {
    return trimmed.replace(/^\//, "").split(/[?#]/)[0];
  }
}

export function MenuScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualSlug, setManualSlug] = useState("lilys-cafe");
  const [message, setMessage] = useState("Point camera at a Tapovan Menu QR code.");

  useEffect(() => {
    if (!isScanning) return;
    let cancelled = false;
    let frame = 0;

    async function start() {
      if (!window.BarcodeDetector) {
        setMessage("Camera QR scan is not supported in this browser. Use the cafe code below.");
        setIsScanning(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
        const scan = async () => {
          if (cancelled || !videoRef.current) return;
          try {
            const codes = await detector.detect(videoRef.current);
            const value = codes[0]?.rawValue;
            if (value) {
              const slug = slugFromScan(value);
              if (slug) {
                window.location.href = `/${slug}`;
                return;
              }
            }
          } catch {
            setMessage("Camera is open. Move closer to the QR code.");
          }
          frame = window.requestAnimationFrame(scan);
        };
        frame = window.requestAnimationFrame(scan);
      } catch {
        setMessage("Camera permission not available. Type or choose the cafe below.");
        setIsScanning(false);
      }
    }

    start();
    return () => {
      cancelled = true;
      if (frame) window.cancelAnimationFrame(frame);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [isScanning]);

  function openManual() {
    const slug = slugFromScan(manualSlug);
    if (slug) window.location.href = `/${slug}`;
  }

  return (
    <div className="scanner-card">
      <div className="scanner-topline">
        <span className="eyebrow">Scan at cafe</span>
        <span className="scanner-pill">QR → live menu</span>
      </div>
      <div className="scanner-frame">
        {isScanning ? <video ref={videoRef} muted playsInline className="scanner-video" /> : <div className="scanner-placeholder"><span>▣</span><strong>Tap to scan Tapovan Menu QR</strong><small>{message}</small></div>}
      </div>
      <div className="scanner-actions">
        <button className="cta" type="button" onClick={() => setIsScanning((value) => !value)}>{isScanning ? "Stop scanner" : "Start scanner"}</button>
      </div>
      <div className="manual-scan">
        <label htmlFor="manual-cafe">Cafe code or URL</label>
        <div>
          <input id="manual-cafe" className="input" value={manualSlug} onChange={(event) => setManualSlug(event.target.value)} placeholder="lilys-cafe" />
          <button className="cta secondary" type="button" onClick={openManual}>Open</button>
        </div>
      </div>
    </div>
  );
}
