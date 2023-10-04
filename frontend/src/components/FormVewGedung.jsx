import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FormVewGedung = () => {
  const [name, setName] = useState("");
  const [kapasitas, setKapasitas] = useState("");
  const [detail, setDetail] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getGedungById();
  }, []);

  const getGedungById = async () => {
    const response = await axios.get(`http://localhost:5000/gedungs/${id}`);
    setName(response.data.name);
    setKapasitas(response.data.kapasitas);
    setDetail(response.data.detail);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form>
          <div className="field">
            <label className="label">Gedung {name}</label>
            <div className="control"></div>
          </div>

          {preview ? (
            <figure className="image is-300x300">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}

          <div className="text">
            <label className="label">Kapasitas: {kapasitas} Orang</label>
            <div className="control"></div>
          </div>
          <div className="text">
            <label className="label">Detail:</label>
            <div className="control"></div>
            {detail}
          </div>
          <footer className="card-footer">
            <Link to={"/gedungs"} className="card-footer-item">
              Kembali
            </Link>
            {user && user.role === "user" && (
              <Link to={"/request-booking"} className="card-footer-item">
                Request Bookings
              </Link>
            )}
          </footer>
        </form>
      </div>
    </div>
  );
};

export default FormVewGedung;
