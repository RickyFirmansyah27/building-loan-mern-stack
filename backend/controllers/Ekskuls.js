import Ekskul from "../models/EkskulModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getEkskuls = async (req, res) =>{
    try {
        let response;
        if(req.role === "user"){
            response = await Ekskul.findAll({
                attributes:['uuid','name','jadwal'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Ekskul.findAll({
                attributes:['uuid','name','jadwal'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getEkskulById = async(req, res) =>{
    try {
        const ekskul = await Ekskul.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!ekskul) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Ekskul.findOne({
                attributes:['uuid','name','jadwal'],
                where:{
                    id: ekskul.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Ekskul.findOne({
                attributes:['uuid','name','jadwal'],
                where:{
                    [Op.and]:[{id: ekskul.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createEkskul = async(req, res) =>{
    const {name, jadwal} = req.body;
    try {
        await Ekskul.create({
            name: name,
            jadwal: jadwal,
            userId: req.userId
        });
        res.status(201).json({msg: "Ekskul Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateEkskul = async(req, res) =>{
    try {
        const ekskul = await Ekskul.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!ekskul) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, jadwal} = req.body;
        if(req.role === "admin"){
            await Ekskul.update({name, jadwal},{
                where:{
                    id: ekskul.id
                }
            });
        }else{
            if(req.userId !== ekskul.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Ekskul.update({name, jadwal},{
                where:{
                    [Op.and]:[{id: ekskul.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Ekskul updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteEkskul = async(req, res) =>{
    try {
        const ekskul = await Ekskul.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!ekskul) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, jadwal} = req.body;
        if(req.role === "admin"){
            await Ekskul.destroy({
                where:{
                    id: ekskul.id
                }
            });
        }else{
            if(req.userId !== ekskul.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Ekskul.destroy({
                where:{
                    [Op.and]:[{id: ekskul.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Ekskul deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}