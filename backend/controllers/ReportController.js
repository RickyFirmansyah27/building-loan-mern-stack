import pdfkit from "pdfkit";
import RekBooking from "../models/RekBookingModel.js";

export const generateRekBookingReport = async (req, res) => {
  try {
    const pdfDoc = new pdfkit({ margin: 50 });
    pdfDoc.pipe(res);

    function generateHeader() {
      pdfDoc
        .image("logo.png", 50, 45, { width: 300 })
        .fillColor("#444444")
        .fontSize(20)
        .text("", 110, 70)
        .fontSize(10)
        .text("", 200, 65, { align: "right" })
        .text("", 0, 80, { align: "center" })
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, 85)
        .lineTo(550, 85)
        .stroke()
        .moveDown();

    }

    function generateFooter() {
      pdfDoc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, 720)
        .lineTo(550, 720)
        .stroke()
        .fontSize(10)
        .text("Report From Booking.", 50, 730, { align: "center", width: 500 });
    }

    function generateTableRow(y, c1, c2, c3, c4, c5, c6, c7) {
      pdfDoc
        .fontSize(10)
        .text(c1, 50, y)
        .text(c2, 100, y)
        .text(c3, 200, y)
        .text(c4, 250, y, { width: 90, align: "center" })
        .text(c5, 320, y, { width: 90, align: "center" })
        .text(c6, 380, y, { width: 90, align: "center" })
        .text(c7, 440, y, { width: 90, align: "center" });
    }
    
    function generateReportTable(data) {
      let i,
        reportTableTop = 150;

      for (i = 0; i < data.length; i++) {
        const item = data[i];
        const position = reportTableTop + (i + 1) * 30;
        generateTableRow(position, ...item);
      }
    }    

    function generateHeaderTableRow(y) {
      pdfDoc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("No", 50, y)
        .text("Nama Gedung", 100, y)
        .text("Tanggal", 200, y)
        .text("Jam Mulai", 250, y, { width: 90, align: "center" })
        .text("Jam Selesai", 320, y, { width: 90, align: "center" })
        .text("Oleh", 380, y, { width: 90, align: "center" })
        .text("Status", 440, y, { width: 90, align: "center" });
    }

    const response1 = await RekBooking.findAll();
    const rowData = response1.map((data1, index) => [
      (index + 1).toString(),
      data1.namaGedung,
      data1.tanggal,
      data1.jamMulai,
      data1.jamSelesai,
      data1.request,
      data1.status,
    ]);

    generateHeader();
    pdfDoc.fontSize(18).text("Laporan Booking", { align: "center" });
    generateHeaderTableRow(150);
    pdfDoc.font("Helvetica");
    generateReportTable(rowData);
    generateFooter();
    pdfDoc.end();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
