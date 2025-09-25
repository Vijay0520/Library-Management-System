const mongoose=require("mongoose")

const UserModel=require("./User-model")
const BookModel=require("./book-model")

module.exports={
    UserModel,
    BookModel
};

//this is index.js file which will export all the models in the models folder
//so that we can import them easily in other files