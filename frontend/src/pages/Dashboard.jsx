import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../componenets/GoalForm'
import Spinner from '../componenets/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalItem from '../componenets/GoalItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }

    //dispatch goals from the backend and put it in goals variable
    dispatch(getGoals())

    //when we leave the deshboard i want the goals to clear
    //if we want to do something when the component unmounts we need to return fron the useEffect
    return () => {
      dispatch(reset())
    }

  },[user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }
  
  return (
  <>
    <section className='heading'>
      <h1>Welcome { user && user.name } </h1>
      <p>Goals Dasboard</p>
    </section>

    <GoalForm />

    <section className="content">
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (
        <h3> You have not set any goals</h3>
      )}
    </section>
    </>
  )
}

export default Dashboard