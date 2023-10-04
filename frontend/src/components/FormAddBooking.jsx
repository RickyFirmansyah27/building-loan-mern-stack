import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddBooking = () => {
  const [gedungs, setGedungs] = useState([]);
  const [selectedGedung, setSelectedGedung] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getGedungs();
  }, []);

  const getGedungs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gedungs");
      setGedungs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bookGedung = async (e) => {
    e.preventDefault();
    try {
      const data = {
        gedungId: selectedGedung,
        tanggal: tanggal,
        jamMulai: jamMulai,
        jamSelesai: jamSelesai,
      };
      await axios.post("http://localhost:5000/bookings", data);
      navigate("/bookings");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="title">Bookings</h1>
      <h2 className="subtitle">Tambah Booking Baru</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={bookGedung}>
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
                  <select
                    className="input"
                    value={jamMulai}
                    onChange={(e) => setJamMulai(e.target.value)}
                  >
                    {Array.from({ length: 9 }, (_, index) => index + 8).map(
                      (jam) => (
                        <option key={jam} value={`${jam}:00`}>
                          {`${jam}:00`}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Jam Selesai</label>
                <div className="control">
                  <select
                    className="input"
                    value={jamSelesai}
                    onChange={(e) => setJamSelesai(e.target.value)}
                  >
                    {Array.from({ length: 9 }, (_, index) => index + 8).map(
                      (jam) => (
                        <option key={jam} value={`${jam}:00`}>
                          {`${jam}:00`}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Booking
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddBooking;
