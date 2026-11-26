"use client";

import React, { useEffect, useState } from "react";

const PHASE_STEPS = [
  { threshold: 0, code: "[01]", label: "STRUCTURING PROMPT", caption: "CRAFTING INTERFACES" },
  { threshold: 34, code: "[02]", label: "COMPILING ARCHITECTURE", caption: "ENGINEERING SYSTEMS" },
  { threshold: 72, code: "[03]", label: "CALIBRATING ASSETS", caption: "REFINING DETAILS" },
  { threshold: 100, code: "[04]", label: "SYSTEMS ONLINE", caption: "ENTERING STUDIO" },
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "curtain" | "done">("loading");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("pv_loaded") === "1") {
        setPhase("done");
        return;
      }
    } catch {
      // Ignore storage access errors
    }

    let rafId = 0;
    let targetProgress = 18;
    let currentProgress = 0;
    let lastRounded = -1;
    let windowLoaded = document.readyState === "complete";
    let fontsLoaded = false;
    let exitTriggered = false;
    const startTime = performance.now();
    const minDurationMs = 950;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const computeAssetTarget = () => {
      const imgs = Array.from(document.images);
      const total = Math.max(imgs.length, 1);
      const loaded = imgs.filter((img) => img.complete).length;
      const imgRatio = loaded / total;
      const fontBonus = fontsLoaded ? 0.14 : 0;

      if (windowLoaded) {
        return 100;
      }
      // Track real asset progress up to 92% while waiting for window load
      return Math.min(92, Math.round(22 + imgRatio * 56 + fontBonus * 100));
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontsLoaded = true;
        targetProgress = Math.max(targetProgress, computeAssetTarget());
      });
    } else {
      fontsLoaded = true;
    }

    const onImgEvent = () => {
      targetProgress = Math.max(targetProgress, computeAssetTarget());
    };

    const pendingImgs = Array.from(document.images).filter((img) => !img.complete);
    pendingImgs.forEach((img) => {
      img.addEventListener("load", onImgEvent, { once: true });
      img.addEventListener("error", onImgEvent, { once: true });
    });

    const onWindowLoad = () => {
      windowLoaded = true;
      targetProgress = 100;
    };

    if (windowLoaded) {
      targetProgress = 100;
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    // Safety fallback for stalled external requests
    const safetyTimer = setTimeout(() => {
      windowLoaded = true;
      targetProgress = 100;
    }, 10000);

    const triggerExit = () => {
      if (exitTriggered) return;
      exitTriggered = true;
      try {
        sessionStorage.setItem("pv_loaded", "1");
      } catch {
        // Ignore storage access errors
      }
      setTimeout(() => {
        // 1. First fade out lower text, then logo, then upper text
        setPhase("exiting");
        setTimeout(() => {
          // 2. Only after all text is gone, slide the 4-column curtain up
          setPhase("curtain");
          document.body.style.overflow = prevOverflow;
          setTimeout(() => {
            setPhase("done");
          }, 820);
        }, 360);
      }, 180);
    };

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const timeCap = windowLoaded ? Math.min(100, (elapsed / minDurationMs) * 100) : 92;
      const desired = Math.min(targetProgress, timeCap);

      // Smoothly ease currentProgress toward desired target
      const diff = desired - currentProgress;
      if (Math.abs(diff) < 0.35) {
        currentProgress = desired;
      } else {
        currentProgress += diff * 0.14;
      }

      const rounded = Math.min(100, Math.round(currentProgress));
      if (rounded !== lastRounded) {
        lastRounded = rounded;
        setProgress(rounded);
      }

      if (windowLoaded && rounded >= 100 && elapsed >= minDurationMs) {
        triggerExit();
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
      window.removeEventListener("load", onWindowLoad);
      pendingImgs.forEach((img) => {
        img.removeEventListener("load", onImgEvent);
        img.removeEventListener("error", onImgEvent);
      });
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === "done") return null;

  const isExiting = phase === "exiting" || phase === "curtain";
  const isCurtain = phase === "curtain";
  const formattedPct = String(progress).padStart(2, "0");
  const activeStep =
    [...PHASE_STEPS].reverse().find((s) => progress >= s.threshold) || PHASE_STEPS[0];

  return (
    <div
      id="pv-loading-screen"
      role="status"
      aria-live="polite"
      aria-label={`Loading PromptVistaML: ${formattedPct}%`}
      aria-hidden={isCurtain}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483000,
        pointerEvents: isCurtain ? "none" : "auto",
        overflow: "hidden",
        fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        color: "#d20600",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @font-face {
          font-family: "Jaro";
          src: url("/assets/fonts/ea8DadQwV_r_Rv3-7zZMCGhQgVr1SlCpNP3VpQ_a-be817f9e.woff2");
          font-display: swap;
          font-style: normal;
          font-weight: 400;
        }
        @font-face {
          font-family: "Geist Mono";
          src: url("/assets/fonts/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeEPKJ5W7ihaO_CS-851d9f34.woff2");
          font-style: normal;
          font-weight: 500;
        }
        .pv-loader-blinds {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .pv-loader-blind {
          height: 100%;
          background-color: #f8ebcb;
          border-right: 1px solid rgba(210, 6, 0, 0.08);
          border-bottom: 3px solid #d20600;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          transition: transform 0.78s cubic-bezier(0.77, 0, 0.175, 1);
          will-change: transform;
        }
        .pv-loader-blind:last-child {
          border-right: none;
        }
        .pv-loader-curtain .pv-loader-blind:nth-child(1) {
          transform: translate3d(0, -102%, 0);
          transition-delay: 0ms;
        }
        .pv-loader-curtain .pv-loader-blind:nth-child(2) {
          transform: translate3d(0, -102%, 0);
          transition-delay: 65ms;
        }
        .pv-loader-curtain .pv-loader-blind:nth-child(3) {
          transform: translate3d(0, -102%, 0);
          transition-delay: 130ms;
        }
        .pv-loader-curtain .pv-loader-blind:nth-child(4) {
          transform: translate3d(0, -102%, 0);
          transition-delay: 195ms;
        }
        .pv-loader-ui {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(20px, 3.5vw, 44px);
        }
        .pv-loader-bottom,
        .pv-loader-center,
        .pv-loader-top {
          transition: opacity 0.2s ease, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pv-loader-exiting .pv-loader-bottom {
          opacity: 0;
          transform: translateY(-10px);
          transition-delay: 0ms;
        }
        .pv-loader-exiting .pv-loader-center {
          opacity: 0;
          transform: translateY(-10px);
          transition-delay: 70ms;
        }
        .pv-loader-exiting .pv-loader-top {
          opacity: 0;
          transform: translateY(-10px);
          transition-delay: 140ms;
        }
        @media (prefers-reduced-motion: reduce) {
          .pv-loader-blind {
            transition: opacity 0.25s ease;
          }
          .pv-loader-curtain .pv-loader-blind {
            transform: translateY(0%);
            opacity: 0;
            transition-delay: 0ms !important;
          }
        }
      `,
        }}
      />

      {/* 4-Column Staggered Editorial Curtain */}
      <div className={`pv-loader-blinds ${isCurtain ? "pv-loader-curtain" : ""}`}>
        <div className="pv-loader-blind" />
        <div className="pv-loader-blind" />
        <div className="pv-loader-blind" />
        <div className="pv-loader-blind" />
      </div>

      {/* Main Content Layer */}
      <div className={`pv-loader-ui ${isExiting ? "pv-loader-exiting" : ""}`}>
        {/* Top Metadata Row */}
        <div
          className="pv-loader-top"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            borderBottom: "1px solid rgba(210, 6, 0, 0.16)",
            paddingBottom: "16px",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span>// PromptVistaML</span>
            <span style={{ opacity: 0.65 }}>Creative Digital Agency</span>
          </div>
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "4px" }}>
            <span>{activeStep.code} {activeStep.label}</span>
            <span style={{ opacity: 0.65 }}>London · Global Studio</span>
          </div>
        </div>

        {/* Centerpiece: Clean Logo Wipe + Vertical Scan Line */}
        <div
          className="pv-loader-center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto 0",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "min(300px, 72vw)",
              aspectRatio: "2.715 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Ghosted Blueprint Underlay */}
            <img
              src="/assets/images/complete_logo.avif"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.14,
                filter: "grayscale(100%) contrast(120%)",
                userSelect: "none",
              }}
            />

            {/* Full Vivid Brand Reveal clipped dynamically to progress */}
            <img
              src="/assets/images/complete_logo.avif"
              alt="PromptVistaML"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                clipPath: `inset(0 ${100 - progress}% 0 0)`,
                WebkitClipPath: `inset(0 ${100 - progress}% 0 0)`,
                userSelect: "none",
              }}
            />

            {/* Precision Plotter Scan Line tracking the exact reveal edge */}
            {progress > 1 && progress < 100 && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-8%",
                  bottom: "-8%",
                  left: `${progress}%`,
                  width: "1.5px",
                  backgroundColor: "#d20600",
                  boxShadow: "0 0 10px rgba(210, 6, 0, 0.35)",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </div>

        {/* Bottom Editorial Telemetry + Large Sculptural Counter */}
        <div
          className="pv-loader-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "16px",
            borderTop: "1px solid rgba(210, 6, 0, 0.16)",
            paddingTop: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            <span>[Apps · Websites · Business Systems]</span>
            <span style={{ opacity: 0.65 }}>© Prompt VistaML 2026</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "4px",
              lineHeight: 0.85,
            }}
          >
            <span
              style={{
                fontFamily: '"Jaro", sans-serif',
                fontSize: "clamp(48px, 7vw, 84px)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.03em",
              }}
            >
              {formattedPct}
            </span>
            <span
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                fontWeight: 500,
              }}
            >
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
