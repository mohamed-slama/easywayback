import reservation from "../models/Reservation.js";
import voyage from "../models/Voyage.js";




export const createreservation = async (req, res, next) => {
  const newreservation = new reservation({Seatnumbers:req.body.Seatnumbers
    ,user:req.body.user
    ,voyage:req.body.voyage,totaleprice:req.body.totaleprice});
  var list = [];
  try {

    //console.log(savedreservation)
    var updatevoyage = await voyage.findById(req.body.voyage);
   // console.log(updatevoyage)
    for (const index2 in newreservation.Seatnumbers) {
     console.log(newreservation.Seatnumbers[index2])  ;
      for (const index in updatevoyage.available ) {
        console.log(updatevoyage.available[index])  ;
        if (newreservation.Seatnumbers[index2] == index) {
          console.log(newreservation.Seatnumbers[index2])
          if (updatevoyage.available[index] == true) {
            console.log("already reserved")  ;
          } else {
         var savedreservation = await newreservation.save();
            list.push(newreservation)
            let stJSON = JSON.stringify(savedreservation);
              const update = await reservation.findByIdAndUpdate(savedreservation._id, {qr:stJSON});
              //console.log(update);
              //console.log(savedreservation._id)
            updatevoyage.available[index] = true;
            updatevoyage.save();
            console.log(updatevoyage.available)  ;
            //const newvoyage = new voyage(updatevoyage);
            //const updatedV = await newvoyage.save();
           
          }
        }
      }
    }
    return res.status(200).json(savedreservation);
  } catch (err) {
    next(err);
  }
  
};

export const updatereservation = async (req, res, next) => {
  try {
    const updatedreservation = await reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedreservation);
  } catch (err) {
    next(err);
  }
};
export const deletereservation = async (req, res, next) => {
  try {
    await reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("reservation has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getreservation = async (req, res, next) => {
  console.log(req.params.id)
  const reservations = await reservation
    .findById(req.params.id)
    .populate("user")
    .populate({
      path: "voyage",
      populate: {
        path: "vehicle",
        model: "vehicle",
      },
    })
    .exec()
    .then((reservations) => {
    return res.status(200).json(reservations);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
export const getAll = async (req, res, next) => {
  console.log("aaaaaaaaa");
  const voy = await reservation
    .find({})
    .where('user').equals(req.params.user_id)
    .populate("user")
    .populate({
      path: "voyage",
      populate: {
        path: "vehicle",
        model: "vehicle",
      },
    })
    .exec()
    .then((voy) => {
      res.status(200).json(voy);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

function encode_base64(code) {
return  Buffer.from(code, 'utf8').toString('base64')
}

// from base64 to actual image 
function base64_decode(base64Image, file) {
  const buffer = Buffer.from(base64Image,"base64");
  fs.writeFileSync(file,buffer);
   console.log('******** File created from base64 encoded string ********');

}
