import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DafatrBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [rekBookingData, setRekBookingData] = useState([]);

  const pollData = async () => {
    try {
      await getBookingData();
      await getRekBookingData();
    } catch (error) {
      console.error(error);
    }
    // Atur waktu interval untuk polling (misalnya, setiap 5 detik)
    setTimeout(pollData, 5000); // 5000 ms = 5 detik
  };

  useEffect(() => {
    getBookingData();
    getRekBookingData();
    pollData(); // Mulai polling ketika komponen did mount
  }, []);

  const getBookingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bookings");
      setBookingData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRekBookingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rekbookings");
      setRekBookingData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/bookings/${id}`
      );

      console.log(response);
      getBookingData();

      toast.success("Accepted");
    } catch (error) {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const handleDeleteRekBooking = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/rekbookings/${id}`
      );

      console.log(response);
      getRekBookingData();

      toast.success("Canceled successful!");
    } catch (error) {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const handleSaveBooking = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/bookings/${id}/accept`
      );

      console.log(response);
      await saveToRekBooking(id); // Tambahkan fungsi untuk menyimpan ke rekBooking
      await handleDeleteBooking(id); // Hapus data dari tabel booking
      getBookingData();

      toast.success("Booking accepted!");
    } catch (error) {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };
  
  // Fungsi untuk menyimpan data ke tabel rekBooking
  const saveToRekBooking = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/rekbookings`,
        bookingData.find((gedung) => gedung.id === id)
      );
      console.log(response);
      getRekBookingData();
      
    } catch (error) {
      console.error("Error saving to rekBooking:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Daftar Request Booking</h1>
      <h2 className="subtitle">List of Request Booking</h2>
      <ToastContainer />
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Gedung</th>
            <th>Tanggal</th>
            <th>Jam Mulai</th>
            <th>Jam Selesai</th>
            <th>Booking By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((gedung, index) => (
            <tr key={gedung.id}>
              <td>{index + 1}</td>
              <td>Gedung {gedung.namaGedung}</td>
              <td>{gedung.tanggal}</td>
              <td>{gedung.jamMulai}</td>
              <td>{gedung.jamSelesai}</td>
              <td>{gedung.request}</td>
              <td>{gedung.status}</td>
              <td>
                <button onClick={() => handleSaveBooking(gedung.id)}>
                  Accept
                </button>
                <button onClick={() => handleDeleteBooking(gedung.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <h1 className="title">Daftar Booking</h1>
      <h2 className="subtitle">List of Booking</h2>      
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Gedung</th>
            <th>Tanggal</th>
            <th>Jam Mulai</th>
            <th>Jam Selesai</th>
            <th>Booking By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rekBookingData.map((rekBookingData, index) => (
            <tr key={rekBookingData.id}>
              <td>{index + 1}</td>
              <td>Gedung {rekBookingData.namaGedung}</td>
              <td>{rekBookingData.tanggal}</td>
              <td>{rekBookingData.jamMulai}</td>
              <td>{rekBookingData.jamSelesai}</td>
              <td>{rekBookingData.request}</td>
              <td>{rekBookingData.status}</td>
              <td>
                <button onClick={() => handleDeleteRekBooking(rekBookingData.id)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>




    </div>
  );
};

export default DafatrBookings;
