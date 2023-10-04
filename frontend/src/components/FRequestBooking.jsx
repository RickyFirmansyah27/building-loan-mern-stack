import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingTable = () => {
  const [gedungData, setGedungData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [startJam, setStartJam] = useState(8);
  const [endJam, setEndJam] = useState(8);
  const [isLoadingBooking, setIsLoadingBooking] = useState(true);
  const [rekBookingData, setRekBookingData] = useState([]);
  const [selectedTanggal, setSelectedTanggal] = useState("");
  const [tanggalList, setTanggalList] = useState([]);

  const handleStartJamChange = (event) => {
    setStartJam(event.target.value);
  };

  const handleEndJamChange = (event) => {
    setEndJam(event.target.value);
  };

  useEffect(() => {
    getGedungData();
    getRekBookingData();
    const today = new Date();
    const dateList = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return date.toISOString().slice(0, 10);
    });

    setTanggalList(dateList);
    setSelectedTanggal(dateList[0]); // Pilih tanggal pertama
  }, []);

  useEffect(() => {
    if (isLoadingBooking) {
      getBookingData();
    }
  }, [isLoadingBooking]);

  const handleBooking = async (gedungId, namaGedung, jamMulai, jamSelesai) => {
    const now = new Date().toISOString().slice(0, 10);
    try {
      const response = await axios.post("http://localhost:5000/bookings", {
        gedungId,
        namaGedung,
        tanggal: selectedTanggal,
        jamMulai,
        jamSelesai,
        request: user.name,
      });

      console.log(response);

      toast.success("Booking successful!");

      setIsLoadingBooking(true);
    } catch (error) {
      console.error(error.response.data.error);

      toast.error(error.response.data.error);
    }
  };

  const getGedungData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gedungs");
      setGedungData(response.data);
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

  const getBookingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bookings");
      setBookingData(response.data);
      setIsLoadingBooking(false);
    } catch (error) {
      console.error(error);

      setIsLoadingBooking(false);
    }
  };

  const isBooked = (id, namaGedung, jamMulai, jamSelesai) => {
    // Convert jamMulai and jamSelesai to numbers if they are strings
    jamMulai = parseInt(jamMulai);
    jamSelesai = parseInt(jamSelesai);

    // Filter both bookingData and rekBookingData arrays based on the given conditions
    const isBookedFilter = [
      ...bookingData,
      ...rekBookingData
    ].filter(
      (item) =>
        item.gedungId === id &&
        item.namaGedung.trim() === namaGedung.trim() &&
        item.tanggal === selectedTanggal && 
        // Check if the item's jamMulai is between jamMulai and jamSelesai
        ((item.jamMulai >= jamMulai && item.jamMulai <= jamSelesai) ||
          // Check if the item's jamSelesai is between jamMulai and jamSelesai
          (item.jamSelesai >= jamMulai && item.jamSelesai <= jamSelesai) ||
          // Check if the item's jamMulai is before jamMulai and jamSelesai is after jamSelesai
          (item.jamMulai <= jamMulai && item.jamSelesai >= jamSelesai) ||
          // Check if the item's jamMulai is after jamMulai and jamSelesai is before jamSelesai
          (item.jamMulai >= jamMulai && item.jamSelesai <= jamSelesai))
    );
  
    // Log isBookedFilter to check its contents
    console.log(isBookedFilter);
  
    return isBookedFilter.length > 0;
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
            <th>Kapasitas</th>
            <th>Keterangan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gedungData.map((gedung, index) => (
            <tr key={gedung.id}>
              <td>{index + 1}</td>
              <td>Gedung {gedung.name}</td>
              <td>
                
      <select
        value={selectedTanggal}
        onChange={(e) => setSelectedTanggal(e.target.value)}
      >
        {tanggalList.map((tanggal) => (
          <option key={tanggal} value={tanggal}>
            {tanggal}
          </option>
        ))}
      </select>

              </td>
              <td>
                <select
                  value={gedungData[index].startJam}
                  onChange={handleStartJamChange}
                >
                  {Array.from({ length: 9 }, (_, index) => index + 8).map(
                    (jam) => (
                      <option key={jam} value={jam}>
                        {jam}
                      </option>
                    )
                  )}
                </select>
              </td>
              <td>
                <select
                  value={gedungData[index].endJam}
                  onChange={handleEndJamChange}
                >
                  {Array.from({ length: 9 }, (_, index) => index + 8).map(
                    (jam) => (
                      <option key={jam} value={jam}>
                        {jam}
                      </option>
                    )
                  )}
                </select>
              </td>
              <td>{gedung.kapasitas}</td>
              <td>
                {isBooked(gedung.id, gedung.name, startJam, endJam)
                  ? "Di Booking"
                  : "Tersedia"}
              </td>
              <td>
                <button
                  disabled={isBooked(gedung.id, gedung.name, startJam, endJam)}
                  onClick={() =>
                    handleBooking(gedung.id, gedung.name, startJam, endJam)
                  }
                >
                  Booking
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
