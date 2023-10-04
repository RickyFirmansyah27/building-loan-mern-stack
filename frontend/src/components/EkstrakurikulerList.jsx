import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EkstrakurikulerList = () => {
  const [ekstrakurikulers, setEkstrakurikulers] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getEkstrakurikulers();
  }, []);

  const getEkstrakurikulers = async () => {
    const response = await axios.get("http://localhost:5000/ekstrakurikulers");
    setEkstrakurikulers(response.data);
  };

  const deleteEkstrakurikuler = async (ekstrakurikulerId) => {
    try {
      await axios.delete(
        `http://localhost:5000/ekstrakurikulers/${ekstrakurikulerId}`
      );
      getEkstrakurikulers();
      toast.success("Deleted successful!");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div>
      <h1 className="title">Ekstrakulikuler</h1>
      <h2 className="subtitle">List of Ekstrakulikuler</h2>
      <ToastContainer />
      {user && user.role === "admin" && (
        <Link to="/ekstrakurikulers/add" className="button is-success">
          Add Ekstrakurikuler
        </Link>
      )}
      <div className="columns is-multiline mt-2">
        {ekstrakurikulers.map((ekstrakurikuler) => (
          <div className="column is-one-quarter" key={ekstrakurikuler.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={ekstrakurikuler.url} alt="Image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{ekstrakurikuler.name}</p>
                    <p className="subtitle is-6">
                      {ekstrakurikuler.jumlah} Siswa
                    </p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                <Link
                  to={`detail/${ekstrakurikuler.id}`}
                  className="card-footer-item"
                >
                  Detail
                </Link>
                {user && user.role === "admin" && (
                  <Link
                    to={`edit/${ekstrakurikuler.id}`}
                    className="card-footer-item"
                  >
                    Edit
                  </Link>
                )}
                {user && user.role === "admin" && (
                  <a
                    onClick={() => deleteEkstrakurikuler(ekstrakurikuler.id)}
                    className="card-footer-item"
                  >
                    Delete
                  </a>
                )}
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EkstrakurikulerList;
