const express = require('express')
const router = express.Router()
const db = require('../includes/blog')
const blogdata = require('../data/blogdata')

router.get('/', (req, res, next) => {
    try {
        res.json(blogdata)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router