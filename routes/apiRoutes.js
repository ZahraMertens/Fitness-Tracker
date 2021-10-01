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
        console.log(dbWorkoutData) //Returns all workout documents
        res.json(dbWorkoutData);
    }).catch(err => {
        res.status(400).json(err);
    })
})

// Add exercise to exting last workout
router.put("/workouts/:id", (req, res) => {
    console.log(req.params.id) //61555aeb016d5a0aa05fea0c _id of workout collection
    console.log(req.body) //returns an object
    db.Workout.findByIdAndUpdate({ _id: req.params.id }, 
        { $push: { exercises: req.body } }, 
        { new: true })
        .then((newExercise) => {
            res.json(newExercise)
        })
        .catch(err => {
            console.log(err)
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
    
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' },
                totalWeight: { $sum: '$exercises.weight' }
            }
        },
        {$sort: {day: -1}}, //If sort was 1 it would only return the first 7 dates not the latest ones
        {$limit: 7},
    ])
    .then(data => {
        console.log(data)
        res.json(data);
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    });
});


// router.get("/getCollection", (req, res) => {
//     db.getCollection("workouts")
//     .then(data => {
//         console.log(data)
//         res.json(data);
//     })
//     .catch(err => {
//         res.json(er)
//     })
// })

// //Not relevant for application just to understand data structure
// router.get("/getAll", (req, res) => {

//     db.Workout.find({})
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json(er)
//         })
// });

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