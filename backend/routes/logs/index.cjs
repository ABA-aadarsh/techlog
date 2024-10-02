const express = require("express")
const router = express.Router()
const LogsController = require("../../functions/controllers/logs.cjs")
const adminRoutes = require("./admin.cjs")
const isAdminMiddleware = require("../../functions/middlewares/isAdmin.cjs")
router
// these routes should be accessible for everyone
.get("/", LogsController.getLogsList)
.get("/:slug", LogsController.getLog)
// these routes should be accessible for only admin
.use("/adminPrivate", isAdminMiddleware, adminRoutes)


module.exports = router
