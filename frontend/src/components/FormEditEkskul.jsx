import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditEkskul = () => {
  const [name, setName] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getEkskulById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/ekskuls/${id}`
        );
        setName(response.data.name);
        setJadwal(response.data.jadwal);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getEkskulById();
  }, [id]);

  const updateEkskul = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/ekskuls/${id}`, {
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
      <h1 className="title">Eksktrakurikuler</h1>
      <h2 className="subtitle">Edit Eksktrakurikuler</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateEkskul}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name Eksktrakurikuler"
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

export default FormEditEkskul;
