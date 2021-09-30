const router = require("express").Router();
const db = require("../models")

//Get last full workout
router.get("/workouts", (req, res) => {
    db.Workout.aggregate([ //Adds new field to existing document(Do we want to add the field to each document or to collection?)
        {
            $addFields:{
                //Sums numeric values
                //Maybe use grouping?
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ])
    .then(dbWorkoutData => {
        console.log(dbWorkoutData) //Returns all exercises of one workout
        res.json(dbWorkoutData);
    }).catch(err => {
        res.status(400).json(err);
    })
})

// Add exercise to exting last workout
router.put("/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, 
        {
            $push: {
                exercises: req.body,
            }
        })
        .then((newExercise) => {
            res.json(newExercise)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

//Create new workout
router.post("/workouts", (req, res) => {
    
    db.Workout.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        })


})

//Gets all workouts range/average and puts in in graph
router.get("/workouts/range", (req, res) => {
    console.log("Success4");


})

//Not relevant for application just to understand data structure
router.get("/getAll", (req, res) => {

    db.Workout.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(er)
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