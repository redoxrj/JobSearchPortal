import React, { useState } from 'react'
import "./Search.css";
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData.js';

const Search = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler =(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/jobs/${keyword}`); // ispe redirect hojaga wo

        }
        else{
            navigate("/jobs"); 

        }

    }
  return (
    <>
       <MetaData title={'Search jobs: RedoxCart'}/>

    <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Enter a language to search jobs...."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  )
}

export default Search
