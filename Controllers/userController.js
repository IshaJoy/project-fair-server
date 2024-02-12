const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

//register
exports.register =async(req,res)=>{
    const{username,email,password}=req.body
    console.log("Inside register request");
    try{
        // check email already exist
    const existingUser = await users.findOne({email})
    console.log(existingUser);
    if (existingUser) {
        res.status(406).json("User already exist!!!Please login")
    } else{
        // add user to db
        const newUser = new users({
            username,email,password,profile:"",github:"",linkedin:""
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
    
    }catch(err){
        res.status(401).json(err)
    }


}


//login
exports.login =async(req,res)=>{
    const{email,password}=req.body
    console.log("Inside login request");
    try{
        // check email,password already exist
    const existingUser = await users.findOne({email,password})
    console.log(existingUser);
    if (existingUser) {
        // generate token using jwt-
        const token = jwt.sign({userId:existingUser._id},process.env.jwt_secret)
        res.status(200).json({existingUser,token})
        
    } else{
        res.status(406).json("Invalid Email / Password")
        }
        
    
    }catch(err){
        res.status(401).json(err)
    }

}

// profile update

exports.editUser = async (req, res) => {
    const userId = req.payload
    const { username, password, email, github, linkedin, profileImage } = req.body
    // if multer active
    const profile = req.file ? req.file.filename : profileImage
    try {
        const updateUser = await users.findByIdAndUpdate({ _id: userId }, {
            username, email, password, profile, github, linkedin
        }, { new: true })
        await updateUser.save()
        res.status(200).json(updateUser)

    } catch (err) {
        res.status(401).json(err)
    }


}