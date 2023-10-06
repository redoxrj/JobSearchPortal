import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getJobDetails,
  
} from "../../actions/jobAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useParams } from 'react-router-dom';


const JobDetailss = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { job, loading, error } = useSelector(
      (state) => state.jobDetails
    );

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
       
    
     
        dispatch(getJobDetails(id));
      }, [dispatch, id, error, alert]);
  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
      <div class="card text-center">
  
  <div class="card-body">
    <h3 class="card-title">Job Designation : {job.name}</h3>
    <h4 class="card-title">Company :{job.company}</h4>
    <h5 class="card-title">Location : {job.location}</h5>
    <h6 class="card-title">Posted At : {new Date(job.createdAt).toGMTString()}</h6>
    <a href={job.link} class="btn btn-primary my-4" target="_blank">Click to apply</a>
    <p class="card-text">{job.description}.</p>
  </div>
</div>
       </>
    )}
  </>
  )
}

export default JobDetailss
