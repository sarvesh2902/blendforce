const JobsSchema = require('../models/JobsSchema');

exports.addJobData = async (req, res, next) => {
    // if job already exists
    const job = await JobsSchema.findOne({ email: req.body.job_id });

    if (job) return res.status(400).send("Job already exists");

    const newData = {
        "job_id": req.body.job_id,
        "job_title": req.body.job_title,
        "company_name": req.body.company_name,
        "company_location": req.body.company_location,
        "skills": req.body.skills,
        "experience_level": req.body.experience_level,
        "type_of_employment": req.body.type_of_employment,
        "salary_range": req.body.salary_range,
        "experience": req.body.experience,
        "education": req.body.education,
        "description": req.body.description,
        "requirements_and_responsibilities":req.body.requirements_and_responsibilities,
        "phase":"application",
        "round":"0"
    };


    const addedJob = await JobsSchema.create(newData);

    if(addedJob){
       return res.status(201).json({
        "type":"success",
        "msg":addedJob
      })
    }else{
       return res.status(401).json({
        "type": "failure",
        "msg": "Job not created"
      })
    }

  }

exports.provideOpenJobCandidateData = async (req, res, next) => {
    // if job already exists
    const job = await JobsSchema.findOne({ email: req.body.job_id });

    if (job==null) return res.status(400).send("Job data not exists");




    const addedJob = await JobsSchema.create(newData);

    if(addedJob){
       return res.status(201).json({
        "type":"success",
        "msg":addedJob
      })
    }else{
       return res.status(401).json({
        "type": "failure",
        "msg": "Job not created"
      })
    }

  }
