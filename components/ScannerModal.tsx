"use client";

import { useState } from "react";
import { MenuScanner } from "@/components/MenuScanner";

export function ScannerModal({ buttonLabel = "Scan cafe QR" }: { buttonLabel?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="cta secondary" type="button" onClick={() => setOpen(true)}>{buttonLabel}</button>
      {open ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <section className="scanner-modal" role="dialog" aria-modal="true" aria-label="Scan Tapovan Menu QR" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="eyebrow">Already at cafe</span>
                <h2>Scan the table QR</h2>
              </div>
              <button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close scanner">×</button>
            </div>
            <MenuScanner />
          </section>
        </div>
      ) : null}
    </>
  );
}
