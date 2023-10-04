import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RekBookingReportPage = () => {
  const [reportContent, setReportContent] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rekbookings");
      setReportContent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reports/rekbookings', {
        responseType: 'blob', // Response dalam bentuk blob
      });

      // Buat blob URL dan download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'rekBooking_report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Hapus elemen <a> setelah diunduh
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Laporan Daftar Booking</h1>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <div>
        <h2>Tampilan Laporan</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Gedung</th>
              <th>Tanggal</th>
              <th>Jam Mulai</th>
              <th>Jam Selesai</th>
              <th>Booking By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportContent.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.namaGedung}</td>
                <td>{data.tanggal}</td>
                <td>{data.jamMulai}</td>
                <td>{data.jamSelesai}</td>
                <td>{data.request}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RekBookingReportPage;
