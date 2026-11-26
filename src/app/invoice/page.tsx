import type { Metadata } from "next";
import InvoiceClient from "./InvoiceClient";
import "../career/career.css";

export const metadata: Metadata = {
  title: "Invoice Generator",
  description: "Prompt VistaML internal invoice generator with dual templates and vector PDF export.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvoicePage() {
  return (
    <>
      <style>{`
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
      <InvoiceClient />
    </>
  );
}
