import mongoose from "mongoose";
const {Schema} = mongoose;

const resultSchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    userAnswers: {
        type: Array,
        default: []
    },
    attempts: {
        type: Number,
        default: 0
    },
    earnedPoints: {
        type: Number,
        default: 0
    },
    finalResult: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('results', resultSchema);