"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Download, Plus, Trash2, RotateCcw, ArrowLeft, FileText } from "lucide-react";
import { generateInvoicePdf, InvoiceData, InvoiceItem } from "./pdfGenerator";

const INITIAL_DATA: InvoiceData = {
  template: "classic",
  currency: "₹",
  companyName: "PromptVistaML",
  companyTagline: "Creative Digital Agency",
  companyAddress: "Hostel 32, Shillong",
  companyCity: "East Khasi Hills, Meghalaya",
  companyContact: "+91 9301228280",
  companyEmail: "promptvistaml@gmail.com",
  invoiceNumber: "#PV-1024",
  invoiceDate: "November 27, 2026",
  dueDate: "December 12, 2026",
  clientName: "Grodex Media",
  clientAddress: "42 Market Street, Suite 300",
  clientContact: "billing@grodexmedia.com",
  paymentBank: "PromptVistaML Business Bank",
  paymentAccountName: "PromptVistaML",
  paymentAccountDetail: "ACCT •••• 4829 / promptvistaml@gmail.com",
  items: [
    {
      id: "item-1",
      name: "Web Platform & UI Architecture",
      description: "Custom responsive website design & Next.js build",
      qty: 1,
      price: 45000,
    },
    {
      id: "item-2",
      name: "Brand Campaign Assets",
      description: "Digital marketing visuals and launch kit",
      qty: 2,
      price: 12000,
    },
    {
      id: "item-3",
      name: "CRM Integration & Analytics",
      description: "Automated lead capture and reporting setup",
      qty: 1,
      price: 18000,
    },
  ],
  taxRate: 18,
  terms:
    "Payment is due within 15 days of invoice date. Please reference the invoice number on all bank transfers.",
  signatoryName: "",
  signatoryTitle: "",
  signatureDataUrl: null,
};

export default function InvoiceClient() {
  const [data, setData] = useState<InvoiceData>(INITIAL_DATA);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const subtotal = data.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const updateField = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          name: `Product / Service ${prev.items.length + 1}`,
          description: "Custom deliverable",
          qty: 1,
          price: 250,
        },
      ],
    }));
  };

  const removeItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }));
  };

  // Signature pad handlers
  const getCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) * canvas.width) / rect.width,
      y: ((clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.strokeStyle = data.template === "modern" ? "#d20600" : "#262320";
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    if (!isDrawing || !canvasRef.current) return;
    setIsDrawing(false);
    updateField("signatureDataUrl", canvasRef.current.toDataURL("image/png"));
  };

  const clearSignature = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    updateField("signatureDataUrl", null);
  };

  const fmt = (val: number) => `${data.currency}${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)}`;

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "#f8ebcb",
        color: "#d20600",
        fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      {/* Top Studio Bar */}
      <header
        className="sticky top-0 z-40 border-b px-5 py-4 md:px-10"
        style={{
          backgroundColor: "rgba(248, 235, 203, 0.94)",
          backdropFilter: "blur(10px)",
          borderColor: "rgba(210, 6, 0, 0.16)",
        }}
      >
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[4px] border border-[#d20600]/40 px-3 py-1.5 text-[12px] uppercase hover:bg-[#d20600] hover:text-[#f8ebcb]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Site
            </Link>

          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-[4px] border border-[#d20600] p-0.5">
              <button
                type="button"
                onClick={() => updateField("template", "classic")}
                className="rounded-[2px] px-3 py-1.5 text-[12px] font-medium uppercase transition-colors"
                style={{
                  backgroundColor: data.template === "classic" ? "#d20600" : "transparent",
                  color: data.template === "classic" ? "#f8ebcb" : "#d20600",
                }}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => updateField("template", "modern")}
                className="rounded-[2px] px-3 py-1.5 text-[12px] font-medium uppercase transition-colors"
                style={{
                  backgroundColor: data.template === "modern" ? "#d20600" : "transparent",
                  color: data.template === "modern" ? "#f8ebcb" : "#d20600",
                }}
              >
                Red Banner
              </button>
            </div>

            <button
              type="button"
              onClick={() => generateInvoicePdf(data)}
              className="inline-flex items-center gap-2 rounded-[4px] bg-[#d20600] px-5 py-2 text-[13px] font-medium uppercase text-[#f8ebcb] transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 md:px-10 lg:grid-cols-12">
        {/* Left Pane: Form Controls */}
        <section className="space-y-6 lg:col-span-5">
          {/* Invoice Meta */}
          <div
            className="space-y-4 rounded-[8px] border p-5"
            style={{ borderColor: "rgba(210, 6, 0, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.35)" }}
          >
            <h2 className="text-[13px] font-medium uppercase">[01] Invoice &amp; Currency</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Invoice Number</span>
                <input
                  type="text"
                  value={data.invoiceNumber}
                  onChange={(e) => updateField("invoiceNumber", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Currency</span>
                <select
                  value={data.currency}
                  onChange={(e) => updateField("currency", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                >
                  <option value="$">USD ($)</option>
                  <option value="₹">INR (₹)</option>
                  <option value="£">GBP (£)</option>
                  <option value="€">EUR (€)</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Issue Date</span>
                <input
                  type="text"
                  value={data.invoiceDate}
                  onChange={(e) => updateField("invoiceDate", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Due Date</span>
                <input
                  type="text"
                  value={data.dueDate}
                  onChange={(e) => updateField("dueDate", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
            </div>
          </div>

          {/* Client Details */}
          <div
            className="space-y-4 rounded-[8px] border p-5"
            style={{ borderColor: "rgba(210, 6, 0, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.35)" }}
          >
            <h2 className="text-[13px] font-medium uppercase">[02] Bill To (Client)</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Client / Company Name</span>
                <input
                  type="text"
                  value={data.clientName}
                  onChange={(e) => updateField("clientName", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Client Address</span>
                <input
                  type="text"
                  value={data.clientAddress}
                  onChange={(e) => updateField("clientAddress", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Client Phone / Email</span>
                <input
                  type="text"
                  value={data.clientContact}
                  onChange={(e) => updateField("clientContact", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
            </div>
          </div>

          {/* Products / Line Items */}
          <div
            className="space-y-4 rounded-[8px] border p-5"
            style={{ borderColor: "rgba(210, 6, 0, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.35)" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-medium uppercase">[03] Products &amp; Services</h2>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 rounded-[4px] border border-[#d20600] px-2.5 py-1 text-[11px] uppercase hover:bg-[#d20600] hover:text-[#f8ebcb]"
              >
                <Plus className="h-3.5 w-3.5" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {data.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="space-y-2.5 rounded-[6px] border p-3.5"
                  style={{ borderColor: "rgba(210, 6, 0, 0.2)", backgroundColor: "rgba(248, 235, 203, 0.45)" }}
                >
                  <div className="flex items-center justify-between text-[11px] uppercase opacity-75">
                    <span>Product {idx + 1}</span>
                    {data.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="inline-flex items-center gap-1 text-[#d20600] hover:opacity-70"
                        aria-label={`Remove item ${idx + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    placeholder="Product or service name"
                    className="w-full rounded-[4px] border border-[#d20600]/30 bg-white/50 px-3 py-1.5 text-[13px] focus:border-[#d20600] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    placeholder="Short description (shown in Template 2)"
                    className="w-full rounded-[4px] border border-[#d20600]/30 bg-white/50 px-3 py-1.5 text-[12px] focus:border-[#d20600] focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="block">
                      <span className="mb-0.5 block text-[10px] uppercase opacity-70">Qty</span>
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, "qty", Math.max(1, Number(e.target.value) || 1))}
                        className="w-full rounded-[4px] border border-[#d20600]/30 bg-white/50 px-3 py-1.5 text-[13px] focus:border-[#d20600] focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-0.5 block text-[10px] uppercase opacity-70">Unit Price</span>
                      <input
                        type="number"
                        min={0}
                        value={item.price}
                        onChange={(e) => updateItem(item.id, "price", Math.max(0, Number(e.target.value) || 0))}
                        className="w-full rounded-[4px] border border-[#d20600]/30 bg-white/50 px-3 py-1.5 text-[13px] focus:border-[#d20600] focus:outline-none"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <label className="block">
              <span className="mb-1 block text-[11px] uppercase opacity-75">Tax Rate (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={data.taxRate}
                onChange={(e) => updateField("taxRate", Math.max(0, Number(e.target.value) || 0))}
                className="w-32 rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
              />
            </label>
          </div>

          {/* Payment, Terms & Signature */}
          <div
            className="space-y-4 rounded-[8px] border p-5"
            style={{ borderColor: "rgba(210, 6, 0, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.35)" }}
          >
            <h2 className="text-[13px] font-medium uppercase">[04] Payment, Terms &amp; Signature</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Bank / Payment Method</span>
                <input
                  type="text"
                  value={data.paymentBank}
                  onChange={(e) => updateField("paymentBank", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Account Holder</span>
                <input
                  type="text"
                  value={data.paymentAccountName}
                  onChange={(e) => updateField("paymentAccountName", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase opacity-75">Account / UPI / Payment Detail</span>
              <input
                type="text"
                value={data.paymentAccountDetail}
                onChange={(e) => updateField("paymentAccountDetail", e.target.value)}
                className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase opacity-75">Terms &amp; Conditions</span>
              <textarea
                rows={2}
                value={data.terms}
                onChange={(e) => updateField("terms", e.target.value)}
                className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[12px] focus:border-[#d20600] focus:outline-none"
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Signatory Name</span>
                <input
                  type="text"
                  value={data.signatoryName}
                  onChange={(e) => updateField("signatoryName", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] uppercase opacity-75">Signatory Title</span>
                <input
                  type="text"
                  value={data.signatoryTitle}
                  onChange={(e) => updateField("signatoryTitle", e.target.value)}
                  className="w-full rounded-[4px] border border-[#d20600]/30 bg-[#f8ebcb]/60 px-3 py-2 text-[13px] focus:border-[#d20600] focus:outline-none"
                />
              </label>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[11px] uppercase opacity-75">Draw Custom Signature (Optional)</span>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="inline-flex items-center gap-1 text-[11px] uppercase hover:opacity-70"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>
              <canvas
                ref={canvasRef}
                width={420}
                height={110}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
                className="h-24 w-full cursor-crosshair rounded-[4px] border border-dashed border-[#d20600]/45 bg-white/60 touch-none"
              />
            </div>
          </div>
        </section>

        {/* Right Pane: Live Print-Accurate A4 Preview */}
        <section className="lg:col-span-7">
          <div className="sticky top-24">
            <div className="mb-3 flex items-center justify-between text-[12px] uppercase opacity-75">
              <span>[Live A4 Preview — {data.template === "classic" ? "Grid" : "Red Banner"}]</span>
              <span>Vector PDF Export Ready</span>
            </div>

            {data.template === "classic" ? (
              /* TEMPLATE 1 PREVIEW */
              <div
                className="mx-auto w-full max-w-[720px] rounded-[4px] border p-7 shadow-lg md:p-10"
                style={{
                  backgroundColor: "#ebe3d2",
                  borderColor: "rgba(38, 35, 32, 0.25)",
                  color: "#262320",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h2
                    className="text-[44px] font-bold leading-none tracking-tight md:text-[54px]"
                    style={{ color: "#d20600", fontFamily: "sans-serif" }}
                  >
                    INVOICE
                  </h2>
                  <div className="text-right">
                    <p className="text-[16px] font-bold uppercase" style={{ color: "#d20600", fontFamily: "sans-serif" }}>
                      {data.companyName}
                    </p>
                    <p className="text-[10px] uppercase opacity-70">{data.companyTagline}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap justify-between gap-4 text-[12px]">
                  <div className="space-y-1">
                    <p>INVOICE NUMBER: {data.invoiceNumber}</p>
                    <p>DATE: {data.invoiceDate}</p>
                    <p>DUE DATE: {data.dueDate}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p>{data.companyAddress}</p>
                    <p>{data.companyCity}</p>
                    <p>{data.companyContact}</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap justify-between gap-4 text-[12px]">
                  <div>
                    <p className="mb-1 text-[13px] font-bold" style={{ fontFamily: "sans-serif" }}>Bill To:</p>
                    <p>{data.clientName}</p>
                    <p>{data.clientAddress}</p>
                    <p>{data.clientContact}</p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-[13px] font-bold" style={{ fontFamily: "sans-serif" }}>Payment Method</p>
                    <p>{data.paymentBank}</p>
                    <p>{data.paymentAccountName}</p>
                    <p>{data.paymentAccountDetail}</p>
                  </div>
                </div>

                <div className="mt-7 overflow-x-auto">
                  <table className="w-full border-collapse border border-[#262320] text-[12px]">
                    <thead>
                      <tr className="border-b border-[#262320] font-bold">
                        <th className="border-r border-[#262320]/40 px-3 py-2.5 text-left">DESCRIPTION</th>
                        <th className="border-r border-[#262320]/40 px-3 py-2.5 text-center">QTY</th>
                        <th className="border-r border-[#262320]/40 px-3 py-2.5 text-right">PRICE</th>
                        <th className="px-3 py-2.5 text-right">SUBTOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: Math.max(data.items.length, 6) }).map((_, i) => {
                        const item = data.items[i];
                        return (
                          <tr key={i} className="border-b border-[#262320]/35">
                            <td className="border-r border-[#262320]/35 px-3 py-2.5 uppercase">
                              {item ? item.name : "\u00A0"}
                            </td>
                            <td className="border-r border-[#262320]/35 px-3 py-2.5 text-center">
                              {item ? String(item.qty).padStart(2, "0") : ""}
                            </td>
                            <td className="border-r border-[#262320]/35 px-3 py-2.5 text-right">
                              {item ? fmt(item.price) : ""}
                            </td>
                            <td className="px-3 py-2.5 text-right">
                              {item ? fmt(item.qty * item.price) : ""}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="border-t border-[#262320] font-bold">
                        <td colSpan={3} className="border-r border-[#262320] px-3 py-2.5 text-right">
                          TAX ({data.taxRate}%)
                        </td>
                        <td className="px-3 py-2.5 text-right">{fmt(taxAmount)}</td>
                      </tr>
                      <tr className="border-t border-[#262320] font-bold text-[13px]">
                        <td colSpan={3} className="border-r border-[#262320] px-3 py-2.5 text-right">
                          GRAND TOTAL
                        </td>
                        <td className="px-3 py-2.5 text-right">{fmt(grandTotal)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 grid items-end gap-6 text-[10px] sm:grid-cols-12">
                  <div className="sm:col-span-5">
                    <p className="mb-1 font-bold uppercase" style={{ fontFamily: "sans-serif" }}>TERM &amp; CONDITION</p>
                    <p className="leading-[1.5] opacity-80">{data.terms}</p>
                  </div>
                  <div className="text-[8.5px] leading-[1.45] sm:col-span-4">
                    <p className="font-bold uppercase">FOR ANY QUESTIONS, PLEASE CONTACT</p>
                    <p className="uppercase">{data.companyEmail}</p>
                    <p className="uppercase">OR {data.companyContact}</p>
                  </div>
                  <div className="flex justify-end sm:col-span-3">
                    {data.signatureDataUrl ? (
                      <img src={data.signatureDataUrl} alt="Signature" className="h-12 w-auto object-contain" />
                    ) : (
                      <svg viewBox="0 0 120 45" className="h-12 w-28 text-[#262320]">
                        <path
                          d="M12 34 C18 8, 28 8, 24 32 C22 40, 36 14, 44 24 C50 32, 62 18, 74 22 C84 25, 96 18, 106 20 M8 38 L108 35"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* TEMPLATE 2 PREVIEW */
              <div
                className="mx-auto w-full max-w-[720px] overflow-hidden rounded-[4px] border shadow-lg"
                style={{
                  backgroundColor: "#f8ebcb",
                  borderColor: "rgba(210, 6, 0, 0.25)",
                  color: "#d20600",
                }}
              >
                <div className="h-6 w-full bg-[#d20600]" />
                <div className="p-7 md:p-10">
                  <div className="flex flex-wrap justify-between gap-2 text-[10px] font-bold uppercase">
                    <span>INVOICE TO: {data.clientName}</span>
                    <span>INVOICE NO: {data.invoiceNumber} · {data.invoiceDate}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4 border-b border-[#d20600]/40 pb-5">
                    <h2
                      className="text-[48px] font-bold lowercase leading-none tracking-tight md:text-[58px]"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      invoice
                    </h2>
                    <span className="rounded-full border border-[#d20600] px-5 py-2 text-[11px] font-bold uppercase">
                      {data.companyName}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 border-b border-[#d20600]/40 pb-5 text-[12px] sm:grid-cols-2">
                    <div>
                      <p className="mb-1 font-bold" style={{ fontFamily: "sans-serif" }}>Invoice To</p>
                      <p className="text-[#262320]">{data.clientName}</p>
                      <p className="text-[#262320]">{data.clientAddress}</p>
                      <p className="text-[#262320]">{data.clientContact}</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="mb-1 font-bold" style={{ fontFamily: "sans-serif" }}>Invoice From</p>
                      <p className="text-[#262320]">{data.companyName}</p>
                      <p className="text-[#262320]">{data.companyAddress}</p>
                      <p className="text-[#262320]">{data.companyCity}</p>
                    </div>
                  </div>

                  {/* Pill Table Header */}
                  <div className="mt-6 grid grid-cols-12 rounded-full bg-[#d20600] px-5 py-2.5 text-[12px] font-bold text-white">
                    <div className="col-span-2">Qty</div>
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  <div className="divide-y divide-[#d20600]/20 px-3">
                    {data.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 items-start py-3.5 text-[12px]">
                        <div className="col-span-2 font-bold">{item.qty}</div>
                        <div className="col-span-6 pr-2">
                          <p className="font-bold">{item.name}</p>
                          {item.description && <p className="mt-0.5 text-[11px] text-[#262320]/75">{item.description}</p>}
                        </div>
                        <div className="col-span-2 text-right font-bold">{fmt(item.price)}</div>
                        <div className="col-span-2 text-right font-bold">{fmt(item.qty * item.price)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pill Total Bar */}
                  <div className="mt-5 flex items-center justify-between rounded-full bg-[#d20600] px-5 py-2.5 text-[13px] font-bold text-white">
                    <span>Total + {data.taxRate}% Tax</span>
                    <span>{fmt(grandTotal)}</span>
                  </div>

                  <div className="mt-8 grid items-end gap-6 text-[10px] sm:grid-cols-12">
                    <div className="sm:col-span-5">
                      <p className="mb-1 font-bold" style={{ fontFamily: "sans-serif" }}>Terms &amp; Conditions</p>
                      <p className="text-[#262320]/80">{data.terms}</p>
                    </div>
                    <div className="text-[#262320] sm:col-span-4">
                      <p className="font-bold text-[#d20600]">Payment &amp; Contact</p>
                      <p>{data.paymentBank}</p>
                      <p>{data.paymentAccountDetail}</p>
                      <p>{data.companyEmail}</p>
                    </div>
                    <div className="flex flex-col items-end sm:col-span-3">
                      {data.signatureDataUrl ? (
                        <img src={data.signatureDataUrl} alt="Signature" className="h-12 w-auto object-contain" />
                      ) : (
                        <svg viewBox="0 0 120 45" className="h-12 w-28 text-[#d20600]">
                          <path
                            d="M12 34 C18 8, 28 8, 24 32 C22 40, 36 14, 44 24 C50 32, 62 18, 74 22 C84 25, 96 18, 106 20 M8 38 L108 35"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
