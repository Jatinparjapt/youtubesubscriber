const express = require("express")
const route = express.Router()
const susbcriberSchema = require("../models/subscribers")
const loginUserSchema = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// main route 
route.get("/" ,  (req ,res )=>{
    res.render("index")
})
// docs route 
route.get("/docs", (req ,res )=>{
res.render("docs")
})

// LOGIN ROUTE
route.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      if (!email && !password) {
        res.status(404).json({ error: "Email and password are required" });
      } else {
        const findUser = await loginUserSchema.findOne({ email });
        if (findUser) {
          const matchPassword = await bcrypt.compare(password, findUser.password);
          if (matchPassword) {
            const tokenJwt = jwt.sign(
              { _id: findUser._id },
              process.env.SCREAT_KEY
            );
            findUser.tokens.push({ token: tokenJwt });
            console.log(findUser.tokens);
            await findUser.save();
            res
              .status(200)
              .json({
                Response: "User login Successfully ...",
                token: tokenJwt,
                name: findUser.name,
                email: findUser.email,
              });
          } else {
            return res.status(401).json({ error: "Invalid password" });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  // Signup route
  route.post("/api/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // console.log(req.body.data , req.body)
      const findUser = await loginUserSchema.findOne({ email });
      if (findUser) {
        res.status(422).json({ error: "User exist" });
      } else {
        const user = new loginUserSchema({ name, email, password });
        const newUserSave = await user.save();
        if (newUserSave) {
          res.status(201).json({ Message: "User Created Successfully" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

//get all subscribers all details like name , subsribed channels etc
route.get("/subscribes",async (req ,res )=>{
    try {
        //fetch subscriber from the database
        const allSubscribers = await susbcriberSchema.find()
        res.status(200).send({subscriber : allSubscribers})
    } catch (error) {
        console.log(error)
    }
})


// get names and channels names
route.get("/subscribers/names",async  (req ,res )=>{
    try {
        //fetch subscriber from the database
        const allSubscribers = await susbcriberSchema.find().select("name subscribedChannel")
        res.status(200).send({subscriber : allSubscribers})
    } catch (error) {
        console.log(error)
    }
})



// get subscriber details using id
route.get("/subscribes/:id",  async (req ,res )=>{
    const {id} = req.params
    // console.log(id , "id")
    // handling errors using try and catch block
    try {
        if(id === ":id"){
            // error when id not found with respone code 400
            res.status(404).send({message: "Id not found "})
        }else{
        // get subscriber from database using _id
         const findSubscriber = await susbcriberSchema.findById({_id : id})
        res.status(200).send({'data' : findSubscriber})
        }
    } catch (error) {
        console.log(error)
    }
})


// post method to add data in database 
route.post("/addSubscriber", async (req ,res )=>{
    try {
        const {name , subscribedChannel  } = req.body
        console.log(name, subscribedChannel)
    if(!name && !subscribedChannel){
        res.status(404).send({error: "Enter full Details"})
    }else{
        const addData = new susbcriberSchema({
            name,
            subscribedChannel
        })
        await addData.save();
        res.status(201).send({Message : "Data Added Successfully"})
    }
    } catch (error) {
        
    }
})
module.exports = route