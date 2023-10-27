const express = require('express');
const router = express.Router();
const {handleGenerateNewShortUrl,handleAnalytics,redirectShortid,deleteLink} = require('../controllers/url')

router.post("/Linkify", handleGenerateNewShortUrl)
router.get("/Linkify/analytics/:id", handleAnalytics)
router.delete("/Linkify/deleteLink/:id", deleteLink)
router.get("/:shortId",redirectShortid)
module.exports = router;
