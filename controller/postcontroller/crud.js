
const task = require("../../models/task")
const mytask =require("../../models/mytask")
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;  


exports.PostHandler = async(req,res)=>{
    try{
    const{title,starttime,endtime}= req.body
    console.log(req.body)
    
    const cratoo = mytask.create({
        title,
        starttime,
        endtime
    })
     
    if(cratoo){
    res.json("Hurray Your task is added")
    
    }
    else{
        res.json("something went wrong") 
    }
    
    
    
    }
    catch(error){
       return  console.log("error",error)
    }
    
    }
    



exports.ReadHandler=(req,res)=>{
    try{
    const {postId} = req.params
    const read = task.findOne(postId)
    if(read){
    res.json("post ha chui yekya baya",read)
    }
    
    else{
       return res.json("mya chui nea basaan post chui baya id kr recheck")
    
    }
    
    }catch(err){
        console.log("cxe vonnui na error chui baya",err)
    }
    
    
    
    }






   exports.GetallHandler = async (req,res)=>{


        
            const alls = await mytask.find().exec(); 
            if (!alls || alls.length === 0) {
                return res.status(404).json({ message: "No products found" });
            }
            
            const results = alls.map(item => item.toObject());
            res.status(200).json({ message: "Products fetched successfully", data: results });
        
        
        
        
        }







     
        



    //    exports.UpdateHandler =async (req,res)=>{
    //         try{
                
    //             const{taskid,title,starttime,endtime,completed}= req.body
    //             console.log(req.body)
               
            
    //           if (!taskid||!title || !starttime || !endtime || !completed ){
    //             return res.status(400).json({ message: "Required fields are missing" });
    //         }
           
    //          const update= await mytask.findByIdAndUpdate(taskid,{
    //         title,
    //         starttime,
    //         endtime,
    //         completed
    //          })
    //          if(update){
    //           res.json("update ha gov baya")
            
    //          }
    //          else{
    //             res.json("khabar kya daleel chi gachanii chunea")
            
    //          }
            
             
            
            
    //         }
    //         catch(error){
    //         console.log("error ha chui baya",error)
            
    //         }
            
            
            
    //         }

   
    
    exports.UpdateHandler = async (req, res) => {
        try {
            const { taskid, title, starttime, endtime, completed } = req.body;
    
         
            console.log(req.body);
    
          
            if (!taskid || !title || !starttime || !endtime ) {
                return res.status(400).json({ message: "Required fields are missing" });
            }
    
          
            if (!ObjectId.isValid(taskid)) {
                return res.status(400).json({ message: "Invalid task ID" });
            }
    
            
            const completedBool = completed === 'true' || completed === true;
    
           
            const update = await mytask.findByIdAndUpdate(
                taskid,
                {
                    title,
                    starttime,
                    endtime,
                    completed: completedBool
                },
                { new: true }  
            );
    
           
            if (update) {
                return res.status(200).json({
                    message: "Task updated successfully",
                    updatedTask: update
                });
            } else {
               
                return res.status(404).json({
                    message: "Task not found"
                });
            }
    
        } catch (error) {
            console.error("Error occurred:", error);
            return res.status(500).json({
                message: "An internal server error occurred",
                error: error.message
            });
        }
    };
    





           exports.DeleteHandler = async (req, res)=>{
                const {postId} = req.query
                console.log(req.query,"id")
                if(!postId){
                    return res.status(400).json({ message: "Required fields are missing" });
                }
                console.log(postId)
                try{
                const delid =await mytask.findByIdAndDelete(postId)
                if(delid){
                    res.json("Post Deleted as per Your wish")
                }
                else{
                res.json("nasa baya delete chui nea gashaan")
                
                }
                }catch(err){
                    res.json(err,"error ha chui boya")
                }
                
                }
                
                