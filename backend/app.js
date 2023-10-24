let express = require("express");
const categoriesRoute = require("./routes/catagoryRoute");
const advertisementRoute = require("./routes/advertisment");
const UserRoute = require("./routes/UserRoute.js");
const bodyParser = require("body-parser");
const cors = require('cors');
let cookieParser=require('cookie-parser')
const imageRoute = require("./routes/imageRoute");
let app = express();
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use('*', cors({
    origin: true,
    credentials: true
}))
app.use('/categories', categoriesRoute);
app.use('/advertisment', advertisementRoute);
app.use('/user', UserRoute);
// send images  to client side
app.use('/asserts', imageRoute);

module.exports = app;