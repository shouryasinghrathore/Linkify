const express = require('express');
const router = express.Router();
const {handleGenerateNewShortUrl,handleAnalytics,redirectShortid,} = require('../controllers/url')

router.post("/Linkify", handleGenerateNewShortUrl)
router.get("/Linkify/analytics/:id", handleAnalytics)
router.get("/:shortId",redirectShortid)
module.exports = router;
