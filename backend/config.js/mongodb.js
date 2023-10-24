let mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://alishanwd3:jnwnn6Nm7HYW1WNk@cluster0.gkl2mc2.mongodb.net/evsproject?retryWrites=true&w=majority',{
mongoose.connect('mongodb://127.0.0.1:27017/evsproject',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
let db= mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open',()=>{
    console.log("database connected");
})
