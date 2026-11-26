import type { Metadata } from "next";
import CareerClient from "./CareerClient";
import "./career.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Prompt VistaML. Explore our studio culture, engineering workshops, work environment, and open roles in software engineering, AI, mobile apps, and product design.",
};

export default function CareerPage() {
  return (
    <>
      <style>{`
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
        html, body {
          background-color: #f8ebcb;
          color: #d20600;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <CareerClient />
    </>
  );
}
