const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const WorkoutSchema = new Schema({
//     day: {
//         type: Date,
//         default: Date.now(),
//     },
//     exercises: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Exercise"
//         }
//     ]
// })

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now(),
    },
    exercises: [                 //Only type and name are required as type can change and therefor required properties
        {
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
        }
    ]
})

//Convert workout schema into a model in order to use it
//const workout = mongoose.model("name of collection", "schema")
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;