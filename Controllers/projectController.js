const projects = require('../Models/projectModel')

//add project
exports.addProjects = async(req,res)=>{
    console.log("Inside add project API");
    const {title,overview,languages,github,website}=  req.body 
    const projectImage = req.file.filename
    const userId = req.payload
    console.log(title,overview,languages,github,website,projectImage,userId);
    try{
        const existingProject =await projects.findOne({github})
        if (existingProject) {
            res.status(406).json("Project already exist in our collection!!! Please upload another...")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }

    
}

//  get homepage projects

exports.getHomeProjects = async(req,res)=>{
    try{
        const allProjects = await projects.find().limit(3)
        res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err)
    }
}

// get all projects
exports.getAllProjects = async(req,res)=>{
    const searchKey =req.query.search
    console.log(searchKey);
    const query={
        languages:{$regex:searchKey,$options:"i"}
        // i = case insensitive
    }
    try{
        const allProjects = await projects.find(query)
        // only object in find
        res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err)
    }
}

// get user projects
exports.getUserProjects = async(req,res)=>{
    const userId = req.payload
    try{
        const allProjects = await projects.find({userId})
        res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err)
    }
}

// edit project
exports.editProject = async (req,res)=>{
    const {title,overview,languages,github,website,projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage
    const userId = req.payload
    const {pid} = req.params
    console.log(title,overview,languages,github,website,uploadImage,userId,pid);
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,languages,overview,github,website,projectImage:uploadImage,userId
        },{new:true})
        console.log(updateProject);
        await updateProject.save()
        res.status(200).json(updateProject)
               
    }catch(err){
        res.status(401).json(err)
    }
}

// delete project
exports.removeProject = async(req,res)=>{
    const {pid} = req.params
    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
    }catch{
        res.status(401).json(err)
    }
}
