import {legacy_createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from '@redux-devtools/extension'  // ye usesey se connect krney ke liye

import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer'
import { jobDetailsReducer, jobsReducer } from './reducers/jobReducer'


const reducer = combineReducers({

    user : userReducer,
    profile : profileReducer,
    jobs : jobsReducer,
    jobDetails : jobDetailsReducer,
   

})
let initialState = {  // local storage mien data ho toh wo otherwise empty
    // cart: {
    //   cartItems: localStorage.getItem("cartItems")
    //     ? JSON.parse(localStorage.getItem("cartItems")) // coz humney string miein convert krlia tha its time to get back in object(json) form
    //     : [],
    //   shippingInfo: localStorage.getItem("shippingInfo")
    //     ? JSON.parse(localStorage.getItem("shippingInfo"))
    //     : {},
    // },
  };
const middleware =[thunk]

const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store