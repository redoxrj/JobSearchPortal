import React, { useEffect, useState } from 'react'
import './Jobs.css'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors, getJob} from '../../actions/jobAction'
import Loader from  '../layout/Loader/Loader'
import JobCard from '../Home/JobCard.js'
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData';


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Games",
    "Camera",
    "SmartPhones",
  ];


const Jobs = () => {
    
    const {keyword} = useParams();
    const dispatch = useDispatch()
    const alert = useAlert()
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0,99000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)
    

    const {jobs,loading,error,jobsCount,resultsPerPage} = useSelector(state=>state.jobs)

    const setCurrentPageNo =(e)=>{
        setCurrentPage(e)

    }
   
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
      dispatch(getJob(keyword,currentPage,price,category,ratings)) 
    },[dispatch,keyword,currentPage,price,category,ratings,error,alert]);

  return (
    <>
      {loading ? <Loader/> : 
      <> 
       <MetaData title={'Jobs : ECOMMERCE'}/>
       <h2 className="jobsHeading">Jobs</h2>

       <div className="jobs">
            {jobs &&
              jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>

       
          {resultsPerPage < jobsCount && <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={jobsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>}


       </>}
    </>
  )
}

export default Jobs
