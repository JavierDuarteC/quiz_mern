const mongoose =require('mongoose');

const User =require('./user');
const Message =require('./message');

const connectDb = () => {
  return mongoose.connect("mongodb+srv://prueba:prueba@cluster0-9grmy.mongodb.net/quiz-mern?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>console.log("DB CONNECTED"))
  .catch(()=>console.log("MUERTAAAAAAAAAAAA"));
};

const models = { User, Message };

module.exports.connectDb = connectDb;
module.exports.models =  models;
