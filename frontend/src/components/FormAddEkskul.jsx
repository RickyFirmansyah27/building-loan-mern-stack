import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddEkskul = () => {
  const [name, setName] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveEkskul = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/ekskuls", {
        name: name,
        jadwal: jadwal,
      });
      navigate("/ekskuls");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Ekstrakurikuler</h1>
      <h2 className="subtitle">Tambah Ekstrakurikuler Baru</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveEkskul}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
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
                <label className="label">Jadwal</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={jadwal}
                    onChange={(e) => setJadwal(e.target.value)}
                    placeholder="Jadwal"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
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

export default FormAddEkskul;
