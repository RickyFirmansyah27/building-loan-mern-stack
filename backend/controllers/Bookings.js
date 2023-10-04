import { Op } from 'sequelize';
import Booking from '../models/bookingModel.js';

// Mendapatkan semua peminjaman gedung
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    console.log(error.message);
  }
};

// Mendapatkan peminjaman gedung berdasarkan ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ error: 'Peminjaman gedung tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendapatkan data peminjaman gedung' });
  }
};

// Menambahkan peminjaman gedung baru
export const addBooking = async (req, res) => {
  const { namaGedung, request, gedungId, tanggal, jamMulai, jamSelesai } = req.body;
  try {
    // Cek apakah gedung tersedia pada tanggal dan jam yang diminta
    const existingBooking = await Booking.findOne({
      where: {
        namaGedung,
        request,
        gedungId,
        tanggal,
        [Op.or]: [
          {
            jamMulai: {
              [Op.lte]: jamMulai,
            },
            jamSelesai: {
              [Op.gt]: jamMulai,
            },
          },
          {
            jamMulai: {
              [Op.lt]: jamSelesai,
            },
            jamSelesai: {
              [Op.gte]: jamSelesai,
            },
          },
        ],
      },
    });

    if (existingBooking) {
      res.status(400).json({ error: 'Gedung sudah dipinjam pada jam tersebut' });
      return;
    }

    const newBooking = await Booking.create({
      gedungId,
      namaGedung,
      tanggal,
      jamMulai,
      jamSelesai,
      request
    });
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menambahkan peminjaman gedung baru' });
  }
};

// Mengubah data peminjaman gedung
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { namaGedung, request, gedungId, tanggal, jamMulai, jamSelesai } = req.body;
  
  try {
    const booking = await Booking.findByPk(id);
    if (booking) {
      // Cek apakah gedung tersedia pada tanggal dan jam yang diminta
      const existingBooking = await Booking.findOne({
        where: {
          gedungId,
          namaGedung,
          request,
          tanggal,
          [Op.or]: [
            {
              jamMulai: {
                [Op.lte]: jamMulai,
              },
              jamSelesai: {
                [Op.gt]: jamMulai,
              },
            },
            {
              jamMulai: {
                [Op.lt]: jamSelesai,
              },
              jamSelesai: {
                [Op.gte]: jamSelesai,
              },
            },
          ],
          id: {
            [Op.ne]: id,
          },
        },
      });

      if (existingBooking) {
        res.status(400).json({ error: 'Gedung sudah dipinjam pada jam tersebut' });
        return;
      }

      booking.gedungId = gedungId;
      booking.namaGedung = namaGedung;
      booking.tanggal = tanggal;
      booking.jamMulai = jamMulai;
      booking.jamSelesai = jamSelesai;
      booking.request = request;
      await booking.save();
      res.json(booking);
    } else {
      res.status(404).json({ error: 'Peminjaman gedung tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengubah data peminjaman gedung' });
  }
};

// Menghapus peminjaman gedung
export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (booking) {
      await booking.destroy();
      res.json({ message: 'Peminjaman gedung berhasil dihapus' });
    } else {
      res.status(404).json({ error: 'Peminjaman gedung tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus peminjaman gedung' });
  }
};
