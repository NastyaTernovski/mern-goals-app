const express = require('express')
const router = express.Router()
const {
        getGoals,
        setGoal,
        updateGoal, 
        deleteGoal
    } = require('../controllers/goalController')

/*router.get('/', (req,res)=>{
    res.status(200).json({message:'Get goals'})
})*/

/*router.get('/', getGoals) //instead of the function above

router.post('/', setGoal)*/

router.route('/').get(getGoals).post(setGoal) //instead of two function above

router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router
