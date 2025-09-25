const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const bookSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    available:{
        type:String,
        required:false
    }
},
{
    timestamps:true
})

module.exports=mongoose.model("Book",bookSchema)