import mongoose from "mongoose";
const {Schema} = mongoose;

const questionSchema = new Schema({
    questions: {
        type: Array,
        default: []
    },
    answers: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('questions', questionSchema);