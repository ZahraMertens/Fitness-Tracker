const router = require("express").Router();
const db = require("../models")

//Get latest workout
router.get("/workouts", (req, res) => {
    console.log("Success1");


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


module.exports = router;