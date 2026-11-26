import { jsPDF } from "jspdf";

export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  qty: number;
  price: number;
}

export interface InvoiceData {
  template: "classic" | "modern";
  currency: string;
  companyName: string;
  companyTagline: string;
  companyAddress: string;
  companyCity: string;
  companyContact: string;
  companyEmail: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  clientName: string;
  clientAddress: string;
  clientContact: string;
  paymentBank: string;
  paymentAccountName: string;
  paymentAccountDetail: string;
  items: InvoiceItem[];
  taxRate: number;
  terms: string;
  signatoryName: string;
  signatoryTitle: string;
  signatureDataUrl?: string | null;
}

function fmtMoney(currency: string, amount: number): string {
  const fixed = amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2);
  return `${currency}${fixed}`;
}

function drawDefaultSignature(doc: jsPDF, x: number, y: number, color: [number, number, number]) {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.7);
  // Stylized calligraphic vector signature
  doc.lines(
    [
      [4, -10],
      [6, 12],
      [5, -8],
      [6, 6],
      [8, -4],
      [10, 2],
      [7, -2],
    ],
    x,
    y,
    [1, 1],
    "S"
  );
  doc.setLineWidth(0.4);
  doc.line(x - 2, y + 4, x + 46, y + 3);
}

export function generateInvoicePdf(data: InvoiceData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const margin = 16;
  const contentW = pageW - margin * 2;

  const subtotal = data.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const red: [number, number, number] = [210, 6, 0];
  const cream: [number, number, number] = [235, 227, 210];
  const dark: [number, number, number] = [38, 35, 32];
  const muted: [number, number, number] = [95, 88, 80];

  if (data.template === "classic") {
    // Background cream paper
    doc.setFillColor(...cream);
    doc.rect(0, 0, pageW, pageH, "F");

    // Header: INVOICE + Company Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(34);
    doc.setTextColor(...red);
    doc.text("INVOICE", margin, 28);

    doc.setFontSize(12);
    const companyLines = doc.splitTextToSize(data.companyName.toUpperCase(), 65);
    doc.text(companyLines, pageW - margin, 22, { align: "right" });
    if (data.companyTagline) {
      doc.setFont("courier", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...muted);
      doc.text(data.companyTagline.toUpperCase(), pageW - margin, 22 + companyLines.length * 5, {
        align: "right",
      });
    }

    // Meta row
    let y = 45;
    doc.setFont("courier", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...dark);
    doc.text(`INVOICE NUMBER: ${data.invoiceNumber}`, margin, y);
    doc.text(`DATE: ${data.invoiceDate}`, margin, y + 5.5);
    doc.text(`DUE DATE: ${data.dueDate}`, margin, y + 11);

    doc.text(data.companyAddress, pageW - margin, y, { align: "right" });
    doc.text(data.companyCity, pageW - margin, y + 5.5, { align: "right" });
    doc.text(data.companyContact, pageW - margin, y + 11, { align: "right" });

    // Bill To & Payment Method
    y = 72;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...dark);
    doc.text("Bill To:", margin, y);
    doc.text("Payment Method", pageW - margin, y, { align: "right" });

    doc.setFont("courier", "normal");
    doc.setFontSize(9.5);
    doc.text(data.clientName || "Client Name", margin, y + 6);
    const clientAddrLines = doc.splitTextToSize(data.clientAddress || "", 80);
    doc.text(clientAddrLines, margin, y + 11.5);
    doc.text(data.clientContact || "", margin, y + 11.5 + clientAddrLines.length * 4.8);

    doc.text(data.paymentBank, pageW - margin, y + 6, { align: "right" });
    doc.text(data.paymentAccountName, pageW - margin, y + 11.5, { align: "right" });
    doc.text(data.paymentAccountDetail, pageW - margin, y + 17, { align: "right" });

    // Table
    const tableTop = 104;
    const rowH = 11;
    const colDescW = contentW * 0.5;
    const colQtyW = contentW * 0.14;
    const colPriceW = contentW * 0.18;
    const colSubW = contentW * 0.18;

    const xDesc = margin;
    const xQty = xDesc + colDescW;
    const xPrice = xQty + colQtyW;
    const xSub = xPrice + colPriceW;

    // Header row
    doc.setDrawColor(...dark);
    doc.setLineWidth(0.5);
    doc.rect(margin, tableTop, contentW, rowH);
    doc.setFont("courier", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...dark);
    doc.text("DESCRIPTION", xDesc + 4, tableTop + 7);
    doc.text("QTY", xQty + colQtyW / 2, tableTop + 7, { align: "center" });
    doc.text("PRICE", xPrice + colPriceW - 4, tableTop + 7, { align: "right" });
    doc.text("SUBTOTAL", xSub + colSubW - 4, tableTop + 7, { align: "right" });

    const totalRows = Math.max(data.items.length, 7);
    let currY = tableTop + rowH;

    doc.setFont("courier", "normal");
    doc.setFontSize(9.5);
    for (let i = 0; i < totalRows; i++) {
      doc.setDrawColor(160, 152, 140);
      doc.setLineWidth(0.25);
      doc.rect(margin, currY, contentW, rowH);

      const item = data.items[i];
      if (item) {
        const label = item.name.toUpperCase();
        doc.setTextColor(...dark);
        doc.text(doc.splitTextToSize(label, colDescW - 8)[0] || "", xDesc + 4, currY + 7);
        doc.text(String(item.qty).padStart(2, "0"), xQty + colQtyW / 2, currY + 7, { align: "center" });
        doc.text(fmtMoney(data.currency, item.price), xPrice + colPriceW - 4, currY + 7, { align: "right" });
        doc.text(fmtMoney(data.currency, item.qty * item.price), xSub + colSubW - 4, currY + 7, {
          align: "right",
        });
      }
      currY += rowH;
    }

    // Vertical column dividers
    doc.setDrawColor(160, 152, 140);
    doc.setLineWidth(0.25);
    doc.line(xQty, tableTop, xQty, currY);
    doc.line(xPrice, tableTop, xPrice, currY);
    doc.line(xSub, tableTop, xSub, currY);

    // Tax & Grand Total rows
    doc.setDrawColor(...dark);
    doc.setLineWidth(0.5);
    doc.rect(margin, currY, contentW, rowH);
    doc.line(xSub, currY, xSub, currY + rowH);
    doc.setFont("courier", "bold");
    doc.text(`TAX (${data.taxRate}%)`, xSub - 5, currY + 7, { align: "right" });
    doc.text(fmtMoney(data.currency, taxAmount), xSub + colSubW - 4, currY + 7, { align: "right" });
    currY += rowH;

    doc.rect(margin, currY, contentW, rowH + 1);
    doc.line(xSub, currY, xSub, currY + rowH + 1);
    doc.setFontSize(10.5);
    doc.text("GRAND TOTAL", xSub - 5, currY + 7.5, { align: "right" });
    doc.text(fmtMoney(data.currency, grandTotal), xSub + colSubW - 4, currY + 7.5, { align: "right" });

    // Outer table border
    doc.setLineWidth(0.6);
    doc.rect(margin, tableTop, contentW, currY + rowH + 1 - tableTop);

    // Footer section
    const footY = Math.max(currY + 26, 238);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...dark);
    doc.text("TERM & CONDITION", margin, footY);

    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    const termsLines = doc.splitTextToSize(data.terms, 65);
    doc.text(termsLines, margin, footY + 5.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...dark);
    const midX = margin + 74;
    doc.text("FOR ANY QUESTIONS, PLEASE CONTACT", midX, footY);
    doc.setFont("courier", "normal");
    doc.setFontSize(7);
    doc.text(data.companyEmail.toUpperCase(), midX, footY + 4);
    doc.text(`OR ${data.companyContact}`, midX, footY + 8);

    // Signature
    const sigX = pageW - margin - 48;
    if (data.signatureDataUrl) {
      doc.addImage(data.signatureDataUrl, "PNG", sigX, footY - 2, 46, 20);
    } else {
      drawDefaultSignature(doc, sigX + 2, footY + 12, dark);
    }
  } else {
    // Template 2: Modern Bold Red Banner & Pill Table
    doc.setFillColor(248, 235, 203);
    doc.rect(0, 0, pageW, pageH, "F");

    // Top Red Banner
    doc.setFillColor(...red);
    doc.rect(0, 0, pageW, 18, "F");

    // Meta strip
    doc.setFont("courier", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...red);
    doc.text(`INVOICE TO: ${(data.clientName || "CLIENT").toUpperCase()}`, margin, 26);
    doc.text(`INVOICE NO: ${data.invoiceNumber}  |  DATE: ${data.invoiceDate}`, pageW - margin, 26, {
      align: "right",
    });

    // Big lowercase "invoice" + pill badge
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(...red);
    doc.text("invoice", margin, 47);

    // Oval pill badge on right
    doc.setDrawColor(...red);
    doc.setLineWidth(0.5);
    doc.roundedRect(pageW - margin - 48, 33, 48, 15, 7.5, 7.5, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(data.companyName.toUpperCase(), pageW - margin - 24, 41.8, { align: "center" });

    // Horizontal divider
    doc.setDrawColor(...red);
    doc.setLineWidth(0.4);
    doc.line(margin, 55, pageW - margin, 55);

    // Invoice To / Invoice From
    let y = 64;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...red);
    doc.text("Invoice To", margin, y);
    doc.text("Invoice From", pageW - margin, y, { align: "right" });

    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...dark);
    doc.text(data.clientName || "Client Name", margin, y + 6);
    const cLines = doc.splitTextToSize(data.clientAddress || "", 78);
    doc.text(cLines, margin, y + 11);
    doc.text(data.clientContact || "", margin, y + 11 + cLines.length * 4.5);

    doc.text(data.companyName, pageW - margin, y + 6, { align: "right" });
    doc.text(data.companyAddress, pageW - margin, y + 11, { align: "right" });
    doc.text(`${data.companyCity} • ${data.companyContact}`, pageW - margin, y + 15.5, { align: "right" });

    doc.setDrawColor(...red);
    doc.line(margin, 93, pageW - margin, 93);

    // Red Pill Table Header
    const pillY = 102;
    doc.setFillColor(...red);
    doc.roundedRect(margin, pillY, contentW, 10, 5, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text("Qty", margin + 8, pillY + 6.5);
    doc.text("Description", margin + 26, pillY + 6.5);
    doc.text("Price", pageW - margin - 38, pillY + 6.5, { align: "right" });
    doc.text("Total", pageW - margin - 8, pillY + 6.5, { align: "right" });

    // Line items
    let currY = pillY + 18;
    for (const item of data.items) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...red);
      doc.text(String(item.qty), margin + 8, currY);
      doc.text(item.name, margin + 26, currY);
      doc.text(fmtMoney(data.currency, item.price), pageW - margin - 38, currY, { align: "right" });
      doc.text(fmtMoney(data.currency, item.qty * item.price), pageW - margin - 8, currY, { align: "right" });

      if (item.description) {
        doc.setFont("courier", "normal");
        doc.setFontSize(8.2);
        doc.setTextColor(...muted);
        const descLines = doc.splitTextToSize(item.description, 95);
        doc.text(descLines, margin + 26, currY + 4.8);
        currY += 7 + descLines.length * 4.2;
      } else {
        currY += 10;
      }

      doc.setDrawColor(210, 6, 0);
      doc.setLineWidth(0.15);
      doc.line(margin + 4, currY - 2, pageW - margin - 4, currY - 2);
      currY += 3;
    }

    // Total Red Pill Bar
    const totalPillY = Math.max(currY + 8, 200);
    doc.setFillColor(...red);
    doc.roundedRect(margin, totalPillY, contentW, 11, 5.5, 5.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`Total + ${data.taxRate}% Tax`, margin + 8, totalPillY + 7);
    doc.text(fmtMoney(data.currency, grandTotal), pageW - margin - 8, totalPillY + 7, { align: "right" });

    // Footer: Terms + Payment + Signature
    const footY = Math.max(totalPillY + 26, 240);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...red);
    doc.text("Terms & Conditions", margin, footY);

    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...dark);
    const tLines = doc.splitTextToSize(data.terms, 72);
    doc.text(tLines, margin, footY + 5.5);

    const midX = margin + 82;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...red);
    doc.text("Payment & Contact", midX, footY);
    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...dark);
    doc.text(data.paymentBank, midX, footY + 5);
    doc.text(data.paymentAccountDetail, midX, footY + 9.5);
    doc.text(data.companyEmail, midX, footY + 14);

    // Signature on right
    const sigX = pageW - margin - 44;
    if (data.signatureDataUrl) {
      doc.addImage(data.signatureDataUrl, "PNG", sigX, footY - 2, 42, 18);
    } else {
      drawDefaultSignature(doc, sigX, footY + 10, red);
    }
  }

  const safeNum = (data.invoiceNumber || "001").replace(/[^a-zA-Z0-9_-]/g, "");
  doc.save(`PromptVistaML-Invoice-${safeNum}.pdf`);
}
