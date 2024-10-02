const { request, response } = require("express")
const Log = require("../../models/logs.cjs")
const {isObjectRequirementFullfilled } = require("../libs.cjs")
const mongoose = require("mongoose")
const getLogsList = async (req = request, res = response) => {
    try {
        const selectionObject = {title:1, updatedAt: 1, slug: 1, _id: 0}
        const filterQuery = {public:true}
        const logsTitlesArray = await Log.find(filterQuery).sort({ updatedAt: -1 }).limit(limit).select(selectionObject)
        return res.status(200).json(
            {
                data: logsTitlesArray
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Failure"
        })
    }
}
const getLogsListForAdmin = async (req = request, res = response) => {
    try {
        const queries = req.query
        let page = 1, limit = 10
        if (queries.hasOwn("page")) {
            page = Number(queries.page)
        }
        if (queries.hasOwn("limit")) {
            limit = Number(queries.limit)
        }        
        const selectionObject = {title:1, updatedAt: 1, slug: 1, _id: 1}
        const logsTitlesArray = await Log.find({}).skip((page - 1) * limit).sort({ updatedAt: -1 }).limit(limit).select(selectionObject)
        return res.status(200).json(
            {
                data: logsTitlesArray
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Failure"
        })
    }
}
const getLog = async (req = request, res = response) => {
    try {
        if (!req.params.hasOwn("slug")) {
            return res.status(400).json({ message: "Slug Not Passed" })
        }
        const slug = req.params.slug
        const log = await Log.findOne({ slug: slug })
        if (log) {
            const isPublic = log.public
            if (isPublic) {
                return res.status(201).json(
                    {
                        data: log
                    }
                )
            }
        }
        return res.status(404).json(
            {
                message: "Log not found"
            }
        )

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Failure"
        })
    }
}
const getLogDataForAdmin = async (req = request, res = response) => {
    try {
        if (!req.params.hasOwn("id")) {
            return res.status(400).json({ message: "Id Not Passed" })
        }
        const id = req.params.id
        const log = await Log.findById(req.params.id)
        return res.status(201).json(
            {
                data: log
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Failure"
        })
    }
}
const addLog = async (req = request, res = response) => {
    try {
        const bodyObj = req.body
        if (!isObjectRequirementFullfilled(bodyObj, ["title","content", "tags"])) {
            return res.status(401).json(
                {
                    message: "Data not passed"
                }
            )
        }
        const newLog = await Log(
            {
                title: bodyObj.title,
                content: bodyObj.content,
                tags: bodyObj.tags,
                public: false
            }
        ) //default new logs are private
        const savedLog = await newLog.save()
        return res.status(202).json(
            {
                data: savedLog
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Failure"
        })
    }
}
const changePublicStatus = async (req=request, res=response) => {
    try {
        // required id and newStatus
        const params = req.params
        const body = req.body
        if(!params.hasOwn("id")) return res.status(400).json({message:"Log id must be passed"});
        if(!body.hasOwn("newPublicStatus")) return res.status(400).json({message: "Body object must have property: newPublicStatus"});

        const updatedlog = await Log.findByIdAndUpdate(params.id, {public: body.newPublicStatus}, {runValidators:true, new:true}).select("_id")
        if(!updatedlog){
            return res.status(404).json(
                {
                    message: "Log with this id does not exist"
                }
            )
        }
        return res.status(200).json({
            message: "Public status changed"
        })
        
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(406).json(
                {
                    message: "New update value fails schema validation"
                }
            )
        }
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Failure"
        })
    }
}
const deleteLog = async (req, res) => {
    try {
        const params = req.params
        if(!params.hasOwn("id")) return res.status(400).json({message:"Log id must be passed"});
        const deletedLog = await Log.findByIdAndDelete(id)
        return res.status(206).json({message: "Log deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Failure"
        })
    }
}
const updateTitle = async (req, res) => {

}
const updateTitleAndContent = async (req, res) => {
    try {
        const params = req.params
        const body = req.body
        if(!params.hasOwn("id")){
            return res.status(400).json(
                {
                    message: "Log id is required"
                }
            )   
        }
        if(!isObjectRequirementFullfilled(body, ["title", "content", "tags"])){
            return res.status(400).json(
                {
                    message: "Body must have title and content properties"
                }
            )  
        }
        const updatedLog = await Log.findByIdAndUpdate(params.id, 
            {
                title: body.title,
                content: body.content,
                tags: body.tags
            },
            {
                runValidators: true,
                new: true
            }
        ).select("_id")
        if(!updatedLog){
            return res.status(404).json(
                {
                    message: "Doc does not exit"
                }
            )
        }
        return res.status(200).json(
            {
                id: updatedLog._id
            }
        )
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(406).json(
                {
                    message: "New update value fails schema validation"
                }
            )
        }
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Failure"
        })
    }
}
module.exports = { getLogsList, getLog, addLog, changePublicStatus, deleteLog, updateTitle, updateTitleAndContent, getLogDataForAdmin, getLogsListForAdmin }