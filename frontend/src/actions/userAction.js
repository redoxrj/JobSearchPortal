import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    
    CLEAR_ERRORS,
  } from "../constants/userConstants";
  
  import axios from "axios";
  
  //user login
  export const login  =(email,password)=>async(dispatch)=>{
      try {
          dispatch({type:LOGIN_REQUEST})
  
          const config = {headers : {'Content-Type': 'application/json'}}
          const {data} = await axios.post('api/v1/login',{email,password},config)
          // we passed config bcoz its a post request
  
          dispatch({type: LOGIN_SUCCESS,payload: data.user });
          
      } catch (error) {
          dispatch({type: LOGIN_FAIL,payload: error.response.data.message})
      }
  
  }
  
  
  //user register/signup
  export const register  =(userData)=>async(dispatch)=>{ // userData is myFormData
      try {
          dispatch({type: REGISTER_USER_REQUEST})
  
          const config = {headers : {'Content-Type': 'multipart/form-data'}} // afc to reccive data including media/images from the user
          const {data} = await axios.post('api/v1/register',userData,config)
          // we passed config bcoz its a post request
  
          dispatch({type: REGISTER_USER_SUCCESS,payload: data.user});
          
      } catch (error) {
          dispatch({type: REGISTER_USER_FAIL,payload: error.response.data.message})
      }
  
  }
  
  // Load User
  export const loadUser = () => async (dispatch) => {
      try {
        dispatch({ type: LOAD_USER_REQUEST });
    
        const { data } = await axios.get(`/api/v1/me`); // get user profile api
        // console.log(data)
    
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
      } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
      }
    };
  
  
  // Logout User
  export const logout = () => async (dispatch) => {
      try {
        await axios.get(`/api/v1/logout`);
    
        dispatch({ type: LOGOUT_SUCCESS });
      } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
      }
    };
  
  
  // Update Profile
  export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.put(`/api/v1/me/update`, userData, config);
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };  
  
  // Update Password
  export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/api/v1/password/update`,
        passwords,  
        config
      );
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  
 
 

  


 
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  