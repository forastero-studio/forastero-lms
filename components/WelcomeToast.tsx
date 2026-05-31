"use client";

import { useEffect, useRef, useState } from "react";
import Wordmark from "@/components/ui/Wordmark";

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
    setTimeout(() => setMounted(false), 700);
  }

  useEffect(() => {
    if (localStorage.getItem(WELCOME_KEY)) return;
    localStorage.setItem(WELCOME_KEY, "true");
    setMounted(true);
    const t1 = setTimeout(() => setEntered(true), 20);
    const t2 = setTimeout(exit, 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      onClick={exit}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: entered ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0)",
        transition: exiting ? "background 600ms ease" : "background 400ms ease",
        cursor: "default",
      }}
    >
      <div
        className="bg-paper border border-line px-12 py-10"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered || exiting ? "translateY(0)" : "translateY(8px)",
          transition: exiting
            ? "opacity 600ms ease"
            : "opacity 400ms ease, transform 400ms ease",
        }}
      >
        <Wordmark suffix=".lms" />
      </div>
    </div>
  );
}
