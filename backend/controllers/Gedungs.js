import Gedung from "../models/GedungModel.js";
import Booking from "../models/BookingModel.js";
import path from "path";
import fs from "fs";

export const getGedungs = async(req, res)=>{
    try {
        const response = await Gedung.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getGedungById = async(req, res)=>{
    try {
        const response = await Gedung.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveGedung = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.title;
    const kapasitas = req.body.kapasitas;
    const detail = req.body.detail;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Gedung.create({name: name, kapasitas: kapasitas, detail: detail, image: fileName, url: url});
            res.status(201).json({msg: "Gedung Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateGedung = async(req, res)=>{
    const gedung = await Gedung.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!gedung) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = gedung.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${gedung.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.title;
    const kapasitas = req.body.kapasitas;
    const detail = req.body.detail;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Gedung.update({name: name, kapasitas: kapasitas, detail: detail, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Gedung Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteGedung = async(req, res)=>{
    const gedung = await Gedung.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!gedung) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${gedung.image}`;
        fs.unlinkSync(filepath);
        await Gedung.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Gedung Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const getBookingById = async (id) => {
    try {
      const booking = await Booking.findByPk(id);
      return booking;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching booking data");
    }
  };
  
  // Fungsi untuk memperbarui status booking menjadi "accepted"
  export const updateBookingStatus = async (booking, status) => {
    try {
      booking.status = status;
      await booking.save();
    } catch (error) {
      console.error(error);
      throw new Error("Error updating booking status");
    }
  };
  
  export const acceptBooking = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Lakukan logika untuk mengakses data booking berdasarkan ID
      const booking = await getBookingById(id);
  
      // Lakukan pengecekan apakah booking dengan ID yang diberikan ditemukan
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      // Lakukan perbarui status booking menjadi "accepted"
      await updateBookingStatus(booking, "accepted");
  
      // Kirim respons 200 (OK) atau respons sukses sesuai dengan kebutuhan Anda
      return res.status(200).json({ message: "Booking accepted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
