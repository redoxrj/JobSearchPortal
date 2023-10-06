import axios from "axios";
import {
    ALL_JOB_FAIL,
    ALL_JOB_REQUEST,
    ALL_JOB_SUCCESS,
    
    JOB_DETAILS_REQUEST,
    JOB_DETAILS_FAIL,
    JOB_DETAILS_SUCCESS,
    
    CLEAR_ERRORS,
  } from "../constants/jobConstants";

export const getJob =(keyword="",currentPage=1) =>async (dispatch) =>{
    try {
        dispatch({type:ALL_JOB_REQUEST })  
        let link = `/api/v1/jobs?keyword=${keyword}&page=${currentPage}`;

       
        // let link='api/v1/jobs'
        const {data} = await axios.get(link)
        console.log(data)
        dispatch({type :ALL_JOB_SUCCESS,payload : data})
        
    } catch (error) {
        dispatch({  
            type : ALL_JOB_FAIL,
            payload : error.response.data.message
        })
        
    }

}


export const getJobDetails =(id) =>async (dispatch) =>{
    try {
        dispatch({type:JOB_DETAILS_REQUEST}) 
        const {data} = await axios.get(`/api/v1/job/${id}`)
        
        dispatch({type :JOB_DETAILS_SUCCESS,payload : data})
        
    } catch (error) {
        dispatch({  
            type : JOB_DETAILS_FAIL,
            payload : error.response.data.message
        })
        
    }

}




  
 
  

  

  

  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
