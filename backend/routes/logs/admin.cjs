// these routes should be accessible for only admin
const express = require("express")
const router = express.Router()
const LogsController = require("../../functions/controllers/logs.cjs")
router
.get("/:id", LogsController.getLogDataForAdmin)
.get("/", LogsController.getLogsListForAdmin)
.delete("/:id",LogsController.deleteLog)
.patch("/:id/public-staus-change", LogsController.changePublicStatus)
.patch("/:id", LogsController.updateTitleAndContent)
.patch("/:id/title", LogsController.updateTitle)
.post("/", LogsController.addLog)

module.exports = router
