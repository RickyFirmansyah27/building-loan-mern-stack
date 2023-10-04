import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FormEditEkstrakurikuler = () => {
  const [name, setName] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEkstrakurikulerById();
  }, []);

  const getEkstrakurikulerById = async () => {
    const response = await axios.get(
      `http://localhost:5000/ekstrakurikulers/${id}`
    );
    setName(response.data.name);
    setJumlah(response.data.jumlah);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateEkstrakurikuler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("jumlah", jumlah);
    try {
      await axios.patch(
        `http://localhost:5000/ekstrakurikulers/${id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      navigate("/ekstrakurikulers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="title">Gedungs</h1>
      <h2 className="subtitle">Add New Gedung</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateEkstrakurikuler}>
              <div className="field">
                <label className="label">Nama Ekstrakurikuler</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Ekstrakurikuler"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Jumlah Anggota</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    placeholder="Jumlah Anggota"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Image</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        type="file"
                        className="file-input"
                        onChange={loadImage}
                      />
                      <span className="file-cta">
                        <span className="file-label">Choose a file...</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {preview ? (
                <figure className="image is-128x128">
                  <img src={preview} alt="Preview Image" />
                </figure>
              ) : (
                ""
              )}

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
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

export default FormEditEkstrakurikuler;
