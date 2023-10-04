import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EkskulList = () => {
  const [ekskuls, setEkskuls] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getEkskuls();
  }, []);

  const getEkskuls = async () => {
    const response = await axios.get("http://localhost:5000/ekskuls");
    setEkskuls(response.data);
  };

  const deleteEkskul = async (ekskulId) => {
    await axios.delete(`http://localhost:5000/ekskuls/${ekskulId}`);
    getEkskuls();
  };

  return (
    <div>
      <h1 className="title">Ekstrakurikuler</h1>
      <h2 className="subtitle">List Jadwal Ekstrakurikuler</h2>
      {user && user.role === "admin" && (
        <Link to="/ekskuls/add" className="button is-primary mb-2">
          Tambah Baru
        </Link>
      )}
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Gedung</th>
            <th>Hari</th>
            {user && user.role === "admin" && <th>Created By</th>}
            {user && user.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {ekskuls.map((ekskul, index) => (
            <tr key={ekskul.uuid}>
              <td>{index + 1}</td>
              <td>{ekskul.name}</td>
              <td>{ekskul.jadwal}</td>
              {user && user.role === "admin" && <td>{ekskul.user.name}</td>}
              <td>
                {user && user.role === "admin" && (
                  <Link
                    to={`/ekskuls/edit/${ekskul.uuid}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                )}
                {user && user.role === "admin" && (
                  <button
                    onClick={() => deleteEkskul(ekskul.uuid)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EkskulList;
