const { json } = require("express");

class ApiFeatures {
    constructor(query,queryStr){  
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword?{ 
            name:{
                $regex : this.queryStr.keyword,  
                $options : "i" // case insensitive ABC=abc
            }
        }:{}
        // console.log(keyword)
        this.query = this.query.find({...keyword}) // .find({name:"mkeyword"})
        return this 

    }
    
    pagination(resultsPerPage){
        let currentPage = Number(this.queryStr.page) || 1
        const skip  = resultsPerPage *(currentPage-1)

        this.query = this.query.limit(resultsPerPage).skip(skip)

        return this

    }
}

module.exports = ApiFeatures;