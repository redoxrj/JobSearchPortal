import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import {clearErrors, getJob} from '../../actions/jobAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from  '../layout/Loader/Loader'
import {useAlert} from 'react-alert'
import './JobCard.css'

const JobCard = ({job}) => { 
    const alert = useAlert()
  const dispatch = useDispatch();
  const {loading,jobs,error} = useSelector(state=>state.jobs)  // konsi naam ki state access krni h
  
//   useEffect(() => {  
//     if(error){
//        alert.error(error)
//        dispatch(clearErrors())
//     }
   
//   }, [dispatch,error,alert]); 
  
  return (
    <>
     {loading ? <Loader/>: <> 
     <Link className="jobCard" to={`/job/${job._id}`}>  
  <div class="card mx-1" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">{job.name}</h5>
    <h5 class="card-title">{job.company}</h5>
    <h6 class="card-title">{job.location}</h6>
    <p class="card-text">{job.description.slice(0, 90)}</p>
    <a href="#" class="btn btn-primary">Apply here</a>
    <p className="card-text mt-2"><small className="text-body-secondary">{new Date(job.createdAt).toGMTString()}</small></p>
  </div>
</div>
</Link>
  </>}
    </>
  )
}

export default JobCard
