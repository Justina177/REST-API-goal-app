const asyncHandler = require('express-async-handler');

const Goal = require('../model/goalModel')

// @desc Get goals
// @route  GET/api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
    const goals =await Goal.find()

    res.status(200).json(goals)
})

// @desc Set goals
// @route  POST/api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    
    res.status(200).json(goal)
})


// @desc  Update goal
// @route  PUT/api/goals/:id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new error('Goal not found')
    }
    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.params.body, {
        new: true,
    })

    res.status(200).json(updateGoal)
})


// @desc Delete goals
// @route  DELETE/api/goals
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new error('Goal not found')
    }
    
    await goal.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}