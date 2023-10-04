import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FormEditBooking = () => {
  const [gedungs, setGedungs] = useState([]);
  const [selectedGedung, setSelectedGedung] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBookingById();
    getGedungs();
  }, []);

  const getBookingById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/bookings/${id}`);
      setSelectedGedung(response.data.gedungId);
      setTanggal(response.data.tanggal);
      setJamMulai(response.data.jamMulai);
      setJamSelesai(response.data.jamSelesai);
    } catch (error) {
      console.log(error);
    }
  };

  const getGedungs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gedungs");
      setGedungs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBooking = async (e) => {
    e.preventDefault();
    try {
      const data = {
        gedungId: selectedGedung,
        tanggal: tanggal,
        jamMulai: jamMulai,
        jamSelesai: jamSelesai,
      };
      await axios.put(`http://localhost:5000/bookings/${id}`, data);
      navigate("/bookings");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Edit Booking Gedung</h1>
      <form onSubmit={updateBooking}>
        <div className="field">
          <label className="label">Gedung</label>
          <div className="control">
            <div className="select">
              <select
                value={selectedGedung}
                onChange={(e) => setSelectedGedung(e.target.value)}
              >
                <option value="">Pilih Gedung</option>
                {gedungs.map((gedung) => (
                  <option key={gedung.id} value={gedung.id}>
                    {gedung.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Tanggal</label>
          <div className="control">
            <input
              type="date"
              className="input"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Jam Mulai</label>
          <div className="control">
            <input
              type="time"
              className="input"
              value={jamMulai}
              onChange={(e) => setJamMulai(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Jam Selesai</label>
          <div className="control">
            <input
              type="time"
              className="input"
              value={jamSelesai}
              onChange={(e) => setJamSelesai(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEditBooking;
