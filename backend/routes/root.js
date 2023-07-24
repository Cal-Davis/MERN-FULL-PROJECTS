const express = require('express')
const router = express.Router()
const path = require('path')



//gets the query(url) and sends back the html file as a response
//uses reg-ex syntax
router.get('^/$|/index(.html)?' , (req , res) => {
    res.sendFile(path.join(__dirname, '..' , 'views' , 'index.html' ))
})

module.exports = router

