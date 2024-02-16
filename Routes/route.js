const express = require("express")
const route = express.Router()
const susbcriberSchema = require("../models/subscribers")


// main route 
route.get("/" ,  (req ,res )=>{
        res.render("index")
})
// docs route 
route.get("/docs", (req ,res )=>{
    res.render("docs")
})
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
    // console.log(getId)
    // handling errors using try and catch block
    try {
        if(!id){
            // error when id not found with respone code 400
            res.status(404).send({message: "Id not found "})
        }
        // get subscriber from database using _id
         const findSubscriber = await susbcriberSchema.findById({_id : id})
        res.status(200).send({'data' : findSubscriber})
    
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