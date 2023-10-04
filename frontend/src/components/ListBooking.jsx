import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ListBooking = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bookings");
      const bookingsWithGedung = response.data.map(async (booking) => {
        const gedungResponse = await axios.get(
          `http://localhost:5000/gedungs/${booking.gedungId}`
        );
        const gedung = gedungResponse.data;
        return { ...booking, gedung };
      });
      const bookingsData = await Promise.all(bookingsWithGedung);
      setBookings(bookingsData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${id}`);
      getBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Daftar Booking Gedung</h1>
            {user && user.role === "user" && (
      <Link to="/bookings/add" className="button is-success">
        Booking
      </Link>
            )}
      <div className="columns is-multiline mt-2">
        {bookings.map((booking) => (
          <div className="column is-one-quarter" key={booking.id}>
            <div className="card">
              {booking.gedung && (
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={booking.gedung.url} alt="Gedung" />
                  </figure>
                </div>
              )}
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-5">
                      Gedung {booking.gedung ? booking.gedung.name : ""}
                    </p>
                    <p className="subtitle is-6">Tanggal: {booking.tanggal}</p>
                    <p className="subtitle is-6">
                      Jam: {booking.jamMulai} - {booking.jamSelesai}
                    </p>
                  </div>
                </div>
              </div>
              <footer className="card-footer">
                <Link
                  to={`/bookings/edit/${booking.id}`}
                  className="card-footer-item"
                >
                  Edit
                </Link>
                <a
                  onClick={() => deleteBooking(booking.id)}
                  className="card-footer-item"
                >
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBooking;
