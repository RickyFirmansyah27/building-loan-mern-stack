import RekBooking from "../models/RekBookingModel.js";


export const getRekBookingData = async(req, res)=>{
  try {
      const response = await RekBooking.findAll();
      res.json(response);
  } catch (error) {
      console.log(error.message);
  }
}

export const createRekBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const rekBooking = await RekBooking.create(bookingData);
    res.status(201).json(rekBooking);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while saving the booking." });
  }
};

export const deleteRekBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const rekBooking = await RekBooking.findByPk(id);

    if (!rekBooking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    await rekBooking.destroy();
    res.status(204).json({ message: "Booking deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the booking." });
  }
};
