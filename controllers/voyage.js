import voyage from "../models/Voyage.js";
import {  day } from "../index.js";


export const createvoyage = async (req, res, next) => {
  const newvoyage = new voyage(req.body);

  try {
    const savedvoyage = await newvoyage.save();
    res.status(200).json(savedvoyage);
  } catch (err) {
    next(err);
  }
};
export const updatevoyage = async (req, res, next) => {
  try {
    const updatedvoyage = await voyage.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedvoyage);
  } catch (err) {
    next(err);
  }
};
export const deletevoyage = async (req, res, next) => {
  try {
    await voyage.findByIdAndDelete(req.params.id);
    res.status(200).json("voyage has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getvoyage = async (req, res, next) => {
  try {
    const voyage = await voyage.findById(req.params.id);
    res.status(200).json(voyage);
  } catch (err) {
    next(err);
  }
};
export const getAll = async (req, res, next) => {

const test = Date.now() ; 
  if  (req.params.type=="all") 
  {
    const voy = await voyage.find({})
    .where('DeparturePoint' ).equals(req.params.DeparturePoint)
    .where('ArrivalPoint' ).equals(req.params.ArrivalPoint)  
    .where( {'DepartureDate' : { $gte : test }})
    .populate("vehicle")
    .exec()
    .then((voy) => {
      res.status(200).json(voy);
    })
    .catch((err) => {
      console.log(err) ;
      res.status(500).json({ error: err });
    });
  } else  { 
    voyage.find({}) 
    .where('DeparturePoint' ).equals(req.params.DeparturePoint)
    .where('ArrivalPoint' ).equals(req.params.ArrivalPoint)  
    .where('ArrivalPoint' ).equals(req.params.ArrivalPoint)  
    .where('vehicle.type' ).equals(req.params.type)  
    .where( {'DepartureDate' : { $gte : test }})
    .populate("vehicle")
    .then((voy) => {
      res.status(200).json(voy);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

  }
  
}

