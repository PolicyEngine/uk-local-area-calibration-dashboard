"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";

export function InfoTooltip({ tip }: { tip: string }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({ x: r.left + r.width / 2, y: r.top });
    }
    setShow(true);
  };

  return (
    <>
      <span
        ref={ref}
        className="info-icon"
        onMouseEnter={onEnter}
        onMouseLeave={() => setShow(false)}
      >
        i
      </span>
      {show &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: pos.x,
              top: pos.y - 8,
              transform: "translate(-50%, -100%)",
              background: "#212529",
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 400,
              textTransform: "none",
              letterSpacing: "normal",
              lineHeight: 1.4,
              padding: "8px 12px",
              borderRadius: 6,
              width: 240,
              zIndex: 9999,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              pointerEvents: "none",
              whiteSpace: "normal",
            }}
          >
            {tip}
          </div>,
          document.body,
        )}
    </>
  );
}
