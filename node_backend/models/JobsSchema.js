const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const JobsSchema = new Schema({
    job_id:{
        type: Number,
        required: true,
        unique: true
    },
    job_title:{
      type: String,
      required: true
    },
    company_name:{
      type: String,
      required: true
    },
    company_location:{
      type: String,
      required: true
    },
    skills:[{
      type: String
    }],
    experience_level:{
      type: String,
    },
    type_of_employment:{
      type: String,
    },
    salary_range:{
      type: String,
    },
    experience:{
      type: String,
    },
    education:{
      type: String,
    },
    description:{
      type: String,
    },
    requirements_and_responsibilities:{
      type: String,
    },
    applications:[{
      type: mongoose.Types.ObjectId,
      ref: 'candidates',
    }],
    phase:{
      type: String,
    },
    round:{
      type: Number,
    },
    createdAt:{
         type: Date,
         default: Date.now
    },
    updatedAt:{
         type: Date,
         default: Date.now
    }
  });

module.exports = mongoose.model('jobs', JobsSchema);