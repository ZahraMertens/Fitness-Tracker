const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        required: "Exercise type is required!",
        trim: true,
    },
    name: {
        type: String,
        required: "Exercise name is required!",
        trim: true,
    },
    duration: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    reps: {
        type: Number,
    },
        sets: {
        type: Number,
    },
    distance: {
        type: Number,
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;