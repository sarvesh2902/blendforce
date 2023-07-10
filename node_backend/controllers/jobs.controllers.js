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
    const job = await JobsSchema.findOne({ job_id: Number(req.body.job_id) }).populate({ path:"applications",options: {
      sort: { ats_score: -1 }
    }})

    const candidatesData = job.applications;

    let genderArray = [0,0,0]
    let vendorObject = {
      "LinkedIn":{"men":0,"female":0,"others":0},
      "OnCampus":{"men":0,"female":0,"others":0},
      "Referals":{"men":0,"female":0,"others":0},
      "Naukri":{"men":0,"female":0,"others":0},
      "Indeed":{"men":0,"female":0,"others":0},
      "Others":{"men":0,"female":0,"others":0},
    }

    for(let i = 0; i < candidatesData.length; i++){
      // checking gender
      if(candidatesData[i].gender === "Male"){
        genderArray[0]++;
        if(candidatesData[i].vendor == "LinkedIn") vendorObject.LinkedIn.men++;
        if(candidatesData[i].vendor == "OnCampus") vendorObject.OnCampus.men++;
        if(candidatesData[i].vendor == "Referals") vendorObject.Referals.men++;
        if(candidatesData[i].vendor == "Naukri.com") vendorObject.Naukri.men++;
        if(candidatesData[i].vendor == "Indeed") vendorObject.Indeed.men++;
        if(candidatesData[i].vendor == "Others") vendorObject.Others.men++;
      }
      else if(candidatesData[i].gender === "Female"){

        genderArray[1]++;

        if(candidatesData[i].vendor == "LinkedIn") vendorObject.LinkedIn.female++;
        if(candidatesData[i].vendor == "OnCampus") vendorObject.OnCampus.female++;
        if(candidatesData[i].vendor == "Referals") vendorObject.Referals.female++;
        if(candidatesData[i].vendor == "Naukri.com") vendorObject.Naukri.female++;
        if(candidatesData[i].vendor == "Indeed") vendorObject.Indeed.female++;
        if(candidatesData[i].vendor == "Others") vendorObject.Others.female++;
      }
      else{
        genderArray[2]++;
        if(candidatesData[i].vendor == "LinkedIn") vendorObject.LinkedIn.others++;
        if(candidatesData[i].vendor == "OnCampus") vendorObject.OnCampus.others++;
        if(candidatesData[i].vendor == "Referals") vendorObject.Referals.others++;
        if(candidatesData[i].vendor == "Naukri.com") vendorObject.Naukri.others++;
        if(candidatesData[i].vendor == "Indeed") vendorObject.Indeed.others++;
        if(candidatesData[i].vendor == "Others") vendorObject.Others.others++;
      }

    }





    return res.status(200).json({"msg":"success", "gender": genderArray, "vendor":vendorObject, "candidates":candidatesData});




  }

exports.updateRound = async (req, res, next) => {
    // if job already exists
    let {job_id,round} = req.body;
    console.log(req.body);
    const job = await JobsSchema.findOneAndUpdate({"job_id":Number(job_id)},{
      "round": ++round
    });
    res.status(200).json(job);

  }
