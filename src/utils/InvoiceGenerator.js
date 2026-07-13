import jsPDF from "jspdf";

export function downloadInvoice(bill) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("HealthSync HMS", 20, 20);

  doc.setFontSize(14);
  doc.text("Invoice", 20, 35);

  doc.line(20, 40, 190, 40);

  doc.setFontSize(12);

  doc.text(`Doctor : Dr. ${bill.doctor_name}`, 20, 55);

  doc.text(`Date : ${new Date(bill.created_at).toLocaleDateString()}`, 20, 65);

  doc.text(`Consultation Fee : ₹${bill.consultation_fee}`, 20, 85);

  doc.text(`Medicine Fee : ₹${bill.medicine_fee}`, 20, 95);

  doc.text(`Lab Fee : ₹${bill.lab_fee}`, 20, 105);

  doc.text(`Other Charges : ₹${bill.other_fee}`, 20, 115);

  doc.line(20, 125, 190, 125);

  doc.setFontSize(16);

  doc.text(`Total : ₹${bill.total_amount}`, 20, 140);

  doc.text(`Payment : ${bill.payment_status}`, 20, 155);

  doc.save("Invoice.pdf");
}