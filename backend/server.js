let app = require('./app');
let PORT = 1500;
require('./config.js/mongodb')


app.listen(PORT, () => {
    console.log(`server is listing on ${PORT} port`)
})