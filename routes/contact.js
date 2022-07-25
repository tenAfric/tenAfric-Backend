const express = require('express')
const router = express.Router()
const db = require('../includes/contact')
const { contactSchema } = require("../schemas/contact")

router.post('/', async (req, res, next) => {
    try {
        const validate = await contactSchema.validateAsync(req.body)
        try {
            db.create(validate)
            res.json({ state: true, type: "success", message: "message has been received successfully" })
        } catch (err) {
            res.status(500).json({"status": 500,"type":"Error","details":err});
        }
    } catch (err) {
        if (err.isJoi === true) {
            res.status(400).json({"status": 400,"type":"Error","message":err.details[0].message});
        } else {
            res.status(500).json({"status": 500,"type":"Error","details":err});
        }
    }
})

module.exports = router