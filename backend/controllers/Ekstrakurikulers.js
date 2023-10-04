import Ekstrakurikuler from "../models/EkstrakurikulerModel.js";
import path from "path";
import fs from "fs";

// Mendapatkan semua Ekstrakurikulers
export const getEkstrakurikulers = async(req, res)=>{
    try {
        const response = await Ekstrakurikuler.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Mendapatkan Ekstrakurikulers berdasarkan ID
export const getEkstrakurikulerById = async(req, res)=>{
    try {
        const response = await Ekstrakurikuler.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Menambahkan Ekstrakurikulers baru
export const saveEkstrakurikuler = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.name;
    const jumlah = req.body.jumlah;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/ekstrakurikuler/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/ekstrakurikuler/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Ekstrakurikuler.create({name: name, jumlah: jumlah, image: fileName, url: url});
            res.status(201).json({msg: "Ekstrakurikuler Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}
// Mengubah data Ekstrakurikuler
export const updateEkstrakurikuler = async(req, res)=>{
    const ekstrakurikuler = await Ekstrakurikuler.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!ekstrakurikuler) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = ekstrakurikuler.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/ekstrakurikuler/${ekstrakurikuler.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/ekstrakurikuler/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.name;
    const jumlah = req.body.jumlah;
    const url = `${req.protocol}://${req.get("host")}/images/ekstrakurikuler/${fileName}`;
    
    try {
        await Ekstrakurikuler.update({name: name, jumlah: jumlah, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Ekstrakurikuler Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteEkstrakurikuler = async(req, res)=>{
    const ekstrakurikuler = await Ekstrakurikuler.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!ekstrakurikuler) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/ekstrakurikuler/${ekstrakurikuler.image}`;
        fs.unlinkSync(filepath);
        await Ekstrakurikuler.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Ekstrakurikuler Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}