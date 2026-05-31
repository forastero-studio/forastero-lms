"use client";

import { useEffect, useRef, useState } from "react";

const WELCOME_KEY = "forastero-welcome-shown";

export default function WelcomeToast() {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const didExit = useRef(false);

  function exit() {
    if (didExit.current) return;
    didExit.current = true;
    setExiting(true);
    setEntered(false);
    setTimeout(() => setMounted(false), 750);
  }

  useEffect(() => {
    if (localStorage.getItem(WELCOME_KEY)) return;
    localStorage.setItem(WELCOME_KEY, "true");
    setMounted(true);
    // Trigger fade-in on next frame
    const t1 = setTimeout(() => setEntered(true), 20);
    // After 500ms fade-in + 3000ms hold, start fade-out
    const t2 = setTimeout(exit, 3520);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      onClick={exit}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        backgroundColor: "#f5f4f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        cursor: "default",
        padding: "2rem",
        opacity: entered ? 1 : 0,
        transition: exiting ? "opacity 700ms ease" : "opacity 500ms ease",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "760px" }}>
        <p style={{
          fontSize: "clamp(28px, 4.5vw, 52px)",
          fontWeight: 300,
          color: "#1c1c1a",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          margin: 0,
        }}>
          Te damos la bienvenida a forastero.lms
        </p>
        <p style={{
          fontSize: "clamp(17px, 2.2vw, 24px)",
          fontWeight: 300,
          color: "#6b6a66",
          margin: 0,
        }}>
          Gracias por sumarte.
        </p>
        <p style={{
          fontSize: "clamp(14px, 1.8vw, 19px)",
          fontWeight: 300,
          color: "#6b6a66",
          margin: 0,
        }}>
          Ante cualquier duda, escribinos a{" "}
          <a
            href="mailto:info@forastero.studio"
            onClick={(e) => e.stopPropagation()}
            style={{ color: "#1c1c1a", textDecoration: "none" }}
          >
            info@forastero.studio
          </a>
        </p>
      </div>
    </div>
  );
}
