const { advertisementModel } = require("../models/advertisementModel");
let fs = require('fs');

let addAdvertisment = async (req, res, next) => {

    let data = new advertisementModel({
        ...req.body, image: req.file.filename
    })
    try {
        await data.save();
     return res.status(200).send({ sms: "advertisment added successfuly", acknowledge: true })
    } catch (error) {
      return res.status(400).send({
            sms: "somting went wrong",
            acknowledge: false,
            error
        });
    }

}

// get single advertisment
let getSingleAdvertisment = async (req, res, next) => {
    try {
        let data = await advertisementModel.findById(req.params.id).populate('country');
        if (!data) {
            return res.status(400).send({ sms: "result not found" });
        };
        res.status(200).send({
            sms: "result found",
            data
        });
    } catch (error) {
        return res.status(400).send({ sms: "please check your id " });
    }
};
// update single advertisment
let updateAdvertisment = async (req, res) => {
    let { country, city, zipcode, description } = req.body;
    try {
        let data = await advertisementModel.findById(req.params.id)
        if (!data) {
            return res.status(400).send({ sms: "Advertisment not found" });
        };
        data.country = country || data.country;
        data.city = city || data.city;
        data.zipcode = zipcode || data.zipcode;
        data.description = description || data.description;
        if (req.file?.filename) {

            fs.unlink(`backend/asserts/${data.image}`, async (err) => {
                if (err) {
                    return res.status(400).send({ sms: "image not uploaded", acknowledge: true });
                } else {
                    data.image = req.file.filename
                    await data.save();
                    res.status(200).send({ sms: "update advertisment successfuly", acknowledge: true });

                }
            })
        } else {
            await data.save();
            res.status(200).send({ sms: "updated advertisment successfully", acknowledge: true });

        }
    } catch (error) {
        res.status(400).send({ sms: "advertisment not updated", acknowledge: false });
    }

}
// update single advertisment
let getAllAdvertisment = async (req, res, next) => {
    try {
        let data = await advertisementModel.find({}).populate('country');
        if (!data) {
            return res.status(400).send({ sms: "result not found" });
        };
        res.status(200).send({
            sms: "result found",
            data
        });
    } catch (error) {
        return res.status(400).send({ sms: "something went wrong " });
    }

}

// searchAdvertisment on country base
let searchAdvertisment = async (req, res) => {
    let { country } = req.params
    // let query = `${country.charAt(0).toUpperCase()}${country.slice(1).toLowerCase()}`
    try {
        let data = await advertisementModel.find({}).populate({ path: "country", match: { name: { $regex: new RegExp("^" + country + "$", "i") }  } })
        let filtered = data.filter((e) => e.country !== null);
        res.send({ sms: "founded successfully", data: filtered })

    } catch (error) {
        res.send({ sms: "something went wrong" })
    }
}
// delete single advertisment
let delSingleAdvertisment = async (req, res, next) => {
    try {
        let data = await advertisementModel.findById(req.params.id);
        if (!data) {
            return res.status(400).send({ sms: "result not found" });
        };
        if (data.image) {
            // use to delete an image
            const imagePath = `backend/asserts/${data.image}`;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    return res.status(400).send({ sms: " image not deleted", acknowledge: false });
                }
            });
        }

    } catch (error) {

        return res.status(400).send({ sms: "somethin went wrong " });
    }


    try {
        let data = await advertisementModel.deleteOne({ _id: req.params.id });
        if (!data) {
            return res.status(400).send({ sms: "result not found" });

        };
        res.status(200).send({
            sms: "deleted sucessfully"
        });
    } catch (error) {
        return res.status(400).send({ sms: "please check your id " });
    }

}

module.exports = { addAdvertisment, delSingleAdvertisment, getSingleAdvertisment, updateAdvertisment, getAllAdvertisment, searchAdvertisment }