const Task = require("../models/Task");
const { rawListeners } = require("../models/User");

const createTask = async (req,res) => {
    try {
        const {title, description, priority, dueDate} = req.body;
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            user: req.user._id,
        });
        res.status(201).json({
            success: true, task,
        });

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find({ user: req.user._id}).sort({createdAt: -1,});
        res.status(200).json({success: true, tasks,});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const updateTask = async (req,res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({success:false, message: "Task not found",});
        }
        if (task.user.toString() !== req.user._id.toString()){
            return res.status(403).json({success: false, message: "Task not found",});
        }
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json({success:true, task: updatedTask,});
    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }
}

const deleteTask = async (req,res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({success: false, message: "Task not found",});
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({success: false, message: "Not authorised",});
        }

        await task.deleteOne();
        res.status(200).json({success: true, message: "Task deleted",});
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}
module.exports = {createTask, getTasks, updateTask, deleteTask};