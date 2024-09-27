const express = require("express")
const router = express.Router()
const LogsController = require("../functions/controllers/logs.cjs")
const isAdminMiddleware = require("../functions/middlewares/isAdmin.cjs")
router
.get("/", LogsController.getAllLogsTitles)
.get("/:slug", LogsController.getLog)
.delete("/:id",isAdminMiddleware,LogsController.deleteLog)
.patch("/:id/public-staus-change", isAdminMiddleware, LogsController.changePublicStatus)
.patch("/:id", isAdminMiddleware, LogsController.updateTitleAndContent)
.patch("/:id/title", isAdminMiddleware, LogsController.updateTitle)
.post("/", isAdminMiddleware, LogsController.addLog)


module.exports = router
