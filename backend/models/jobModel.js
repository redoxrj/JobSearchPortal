const mongoose = require('mongoose') 

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
      },
    location: {
        type: String,
      },
      description: {
        type: String,
      },
      company: {
        type: String,
        
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      
 
})

module.exports = mongoose.model('Job', jobSchema)