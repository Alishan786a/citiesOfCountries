const { categoriesModel } = require("../models/categoryModel");
let getAllCategories = async (req, res) => {
    try {
        let data = await categoriesModel.find();
        if (!data) {
            return res.status(400).send({ sms: "result not found" });
        }
        res.status(200).send({
            sms: "all categories",
            data
        });

    } catch (error) {
        return res.status(400).send({ sms: "someething went wrong" });
    }
};
module.exports = { getAllCategories }