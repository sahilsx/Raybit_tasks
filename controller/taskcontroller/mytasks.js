const mongoose = require('mongoose');
const Task = require('../../models/task');





exports.TaskAddHandler = async (req, res) => {
    const {tasktitle, taskamount , taskdate} = req.body;
    console.log(req.body)
    const newTask = new Task({
        tasktitle,
        taskamount,
        taskdate,
       
    })
    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (error) {
        res.status(500).json(error);
    }
    
}


exports.getmytasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({message: "success", tasks});
    } catch (error) {
        res.status(500).json(error);
    }
}




