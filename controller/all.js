const create = require("../models/create")


exports.PostHandler = async(req,res)=>{
try{
const{title,body,description}= req.body
console.log(req.body)
if(title =="" && body =="" && description =="" ){
return console.log("all fields must be present ")
}
const cratoo = create.create({
    title,
    body,
    description

})
 
if(cratoo){
res.json("Hurray Your Item is created")

}
else{
    res.json("something went wrong") 
}



}
catch(error){
    console.log("error",error)
}

}






exports.ReadHandler=(req,res)=>{
    try{
    const {postId} = req.params
    const read = create.findOne(postId)
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






   exports.GetallHandler = (req,res)=>{


        const alls=create.find()
         if(!alls){
         res.json("atii na chui nea kehen baya")
        
         }
         res.json("yekya chui sorui khn bayaaa", alls)
        
        
        
        }







     
        



       exports.UpdateHandler = (req,res)=>{
            try{
                const {postId} = req.params
            const {title,body,description}= req.body
            
              if (!postId || !title || !body || !description) {
                return res.status(400).json({ message: "Required fields are missing" });
            }
             const update= create.findByIdAndUpdate(postId,{
            title,
            body,
            description
             })
             if(update){
              res.json("update ha gov baya",update)
            
             }
             else{
                res.json("khabar kya daleel chi gachanii chunea")
            
             }
            
             
            
            
            }
            catch(error){
            console.log("error ha chui baya",error)
            
            }
            
            
            
            }







           exports.DeleteHandler = async (req, res)=>{
                const{postId} = req.params
                try{
                const delid = create.findByIdAndDelete(postId)
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
                
                