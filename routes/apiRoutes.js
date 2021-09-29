const router = require("express").Router();
const db = require("../models")

//Get latest workout
router.get("/workouts", (req, res) => {
    console.log("Success1");

    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])


})

// Add exercise to workout
router.put("/workouts/:id", (req, res) => {
    console.log("Success2");


})

//Create new workout
router.post("/workouts", (req, res) => {
    console.log("Success3");


})

//Gets all workouts and puts in in graph
router.get("/workouts/range", (req, res) => {
    console.log("Success4");


})

router.get("/getAll", (req, res) => {
    db.Workout.find({}, (error, find) => {
        if(error){
            console.log(error)
        } else {
            res.json(find)
        }
    })
});

//WHAT THE document looks like:
// [
//   {
//     "day": "2021-09-27T05:32:44.446Z",
//     "_id": "6152a8fc19a045733412eb03",
//     "exercises": [
//       {
//         "type": "resistance",
//         "name": "Military Press",
//         "duration": 20,
//         "weight": 300,
//         "reps": 10,
//         "sets": 4
//       }
//     ]
//   }
// ]


module.exports = router;