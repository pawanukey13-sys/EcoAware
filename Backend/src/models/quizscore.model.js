const mongoose = require("mongoose")
const quizScoreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    score:{
        type:Number,required:true,
        min:0
    },
    total:{
        type:Number,
        required:true
    },
    percentage:{
        type:Number,
    }
},
{
    timestamps:true
}
);
quizScoreSchema.pre('save', function (next) {
  this.percentage = Math.round((this.score / this.total) * 100);
 
});

module.exports = mongoose.model('Quizscore',quizScoreSchema)