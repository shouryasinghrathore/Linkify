const shortid = require('shortid');
const URL = require('../models/url')
const mongoose = require('mongoose')
//generate a unique link
async function handleGenerateNewShortUrl(req, res) {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(404).json({
                result: "Url not found"
            })
        }
        const shortId = shortid(8);
        await URL.create({
            shortId: shortId,
            redirectURL: url,
            visitHistory: [
            ],
        });

        return res.json({
            link: `the link is  ${shortId}`,

        })

    } catch (err) {
        console.log(err);
        return res.json({
            sucess: false,
            err: err
        })
    }

}
//redirection route
async function redirectShortid(req, res) {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId, },
            {
                $push: {
                    visitHistory:
                        { timestamp: (new Date(Date.now()).toDateString()), }
                },
            },)

        if (!entry) {
            return res.json({
                result: "No link is present"
            })
        }
        res.redirect(entry.redirectURL)
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                error: error.message,
            }
        )
    }
}
//analytics
async function handleAnalytics(req, res) {
    try {
        const id = req.params.id;
        const analytics_result = await URL.findOne({ shortId: id });
        if (!analytics_result) {
            return res.status(400).json({
                result: "Link  not found",
            })
        } else if (analytics_result.visitHistory.length == 0) {
            return res.status(400).json({
                result: "The link has not been used yet",
            })
        }
        return res.status(200).json({
            sucess: true,
            totalClicks: analytics_result.visitHistory.length,
            analytics_result: analytics_result,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            sucess: false,
            err: err
        })
    }
}
// delete link //
async function deleteLink(req, res) {
    try {
        const id = req.params.id
        const result = await URL.findOneAndDelete({ shortId: id })
        if (!result) {
            return res.json({
                result: "link not found",
            })
        }
        return res.status(200).json({
            sucess: true,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            sucess: false,
            err: err
        })
    }
}

module.exports = { handleGenerateNewShortUrl, redirectShortid, handleAnalytics, deleteLink };

