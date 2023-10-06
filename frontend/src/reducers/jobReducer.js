
import {
    ALL_JOB_FAIL,
    ALL_JOB_REQUEST,
    ALL_JOB_SUCCESS,
    ADMIN_JOB_REQUEST,
    ADMIN_JOB_SUCCESS,
    ADMIN_JOB_FAIL,
    NEW_JOB_REQUEST,
    NEW_JOB_SUCCESS,
    NEW_JOB_FAIL,
    NEW_JOB_RESET,
    UPDATE_JOB_REQUEST,
    UPDATE_JOB_SUCCESS,
    UPDATE_JOB_FAIL,
    UPDATE_JOB_RESET,
    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAIL,
    DELETE_JOB_RESET,
    JOB_DETAILS_REQUEST,
    JOB_DETAILS_FAIL,
    JOB_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS,
  } from "../constants/jobConstants";

// initially state mien dena hai jobs ki empty array
export const jobsReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {  // kis type ka action hai like ALL_JOB_REQUEST, ALL_JOB_SUCCESS etc.
        // we used text as variabl to avoid naming mistakes 
        case ALL_JOB_REQUEST: 
        case ADMIN_JOB_REQUEST:
         return{
                loading:true,
                jobs :[]
            };
        case ALL_JOB_SUCCESS: 
         return{
                loading:false,
                jobs : action.payload.jobs,
                jobsCount : action.payload.jobsCount,
                resultsPerPage : action.payload.resultsPerPage,
                filteredProductsCount : action.payload.filteredProductsCount

            }
        case ADMIN_JOB_SUCCESS:
         return {
                loading: false,
                jobs: action.payload,
            };    
        case ALL_JOB_FAIL: 
        case ADMIN_JOB_FAIL:
         return{
                loading:false,
                error : action.payload
            }
        case CLEAR_ERRORS: 
         return{
                ...state,  // jo bhi jobs(state) array mein ho bhej do that point of time
                error : null
            }
    
        default:
            return state;  // origial state([]array) default case mein
    }

}


export const jobDetailsReducer = (state = { job: {} }, action) => {
    switch (action.type) {  
        case JOB_DETAILS_REQUEST: 
         return{
                loading:true,
                ...state
            };
        case JOB_DETAILS_SUCCESS: 
         return{
                loading:false,
                job : action.payload.job
            }
        case JOB_DETAILS_FAIL: 
         return{
                loading:false,
                error : action.payload
            }
        case CLEAR_ERRORS: 
         return{
                ...state,  
                error : null
            }
    
        default:
            return state;  
    }

}


 
 
  
 