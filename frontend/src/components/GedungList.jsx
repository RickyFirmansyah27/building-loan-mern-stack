import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GedungList = () => {
  const [gedungs, setGedungs] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getGedungs();
  }, []);

  const getGedungs = async () => {
    const response = await axios.get("http://localhost:5000/gedungs");
    setGedungs(response.data);
  };

  const deleteGedung = async (id) => {
    try {
      // Menghapus data peminjaman terlebih dahulu
      await axios.delete(`http://localhost:5000/bookings/gedungs/${id}`);
      // Menghapus gedung
      await axios.delete(`http://localhost:5000/gedungs/${id}`);
      getGedungs();
      toast.success("Deleted successful!");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const deleteStyle = {
    color: "red",
  };

  
  return (
    <div>
      <h1 className="title">Gedung</h1>
      <h2 className="subtitle">List of Gedung</h2>
      {user && user.role === "admin" && (
        <Link to="/gedungs/add" className="button is-success">
          Tambah Gedung
        </Link>
      )}
      <div className="columns is-multiline mt-2">
        {gedungs.map((gedung) => (
          <div className="column is-one-quarter" key={gedung.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={gedung.url} alt="Gedung" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Gedung {gedung.name}</p>
                    <p className="subtitle is-6">
                      Kapasitas: {gedung.kapasitas} Orang
                    </p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                <Link
                  to={`/gedungs/view/${gedung.id}`}
                  className="card-footer-item"
                >
                  Detail
                </Link>

                {user && user.role === "admin" && (
                  <Link
                    to={`/gedungs/edit/${gedung.id}`}
                    className="card-footer-item"
                  >
                    Ubah
                  </Link>
                )}

                {user && user.role === "admin" && (
                  <button
                    onClick={() => deleteGedung(gedung.id)}
                    className="card-footer-item"
                    style={deleteStyle}
                  >
                    Hapus
                  </button>
                )}
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default GedungList;
