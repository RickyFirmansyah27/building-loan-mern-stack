import express from "express";
import { getGedungs } from "../controllers/Gedungs.js";

const router = express.Router();

router.get('/laporan/gedung/minggu', async (req, res) => {
  try {
    // Ambil data gedung dari database
    const gedungs = await getGedungs();

    // Ambil tanggal hari ini
    const today = new Date();
    // Hitung tanggal awal minggu ini (Minggu dimulai pada hari Minggu)
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

    // Filter data gedung yang dipakai dalam seminggu
    const gedungsSeminggu = gedungs.filter(gedung => {
      const tanggalBooking = new Date(gedung.tanggalBooking); // Ganti 'tanggalBooking' dengan properti tanggal booking pada data gedung dari database
      return tanggalBooking >= startOfWeek && tanggalBooking <= today;
    });

    // Lakukan pengolahan data lainnya sesuai kebutuhan, misalnya menghitung total gedung yang dipakai dalam seminggu

    // Kirim hasil laporan sebagai response
    res.json(gedungsSeminggu);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/laporan/gedung/bulan', async (req, res) => {
  try {
    // Ambil data gedung dari database
    const gedungs = await getGedungs();

    // Ambil tanggal hari ini
    const today = new Date();
    // Hitung tanggal awal bulan ini
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Filter data gedung yang dipakai dalam sebulan
    const gedungsSebulan = gedungs.filter(gedung => {
      const tanggalBooking = new Date(gedung.tanggalBooking); // Ganti 'tanggalBooking' dengan properti tanggal booking pada data gedung dari database
      return tanggalBooking >= startOfMonth && tanggalBooking <= today;
    });

    // Lakukan pengolahan data lainnya sesuai kebutuhan, misalnya menghitung total gedung yang dipakai dalam sebulan

    // Kirim hasil laporan sebagai response
    res.json(gedungsSebulan);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
