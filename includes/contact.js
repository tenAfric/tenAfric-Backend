const conn = require("../db/conn")

let blogodb = {}

//create a new record
blogodb.create = (userData) => {
    let messID = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
    return new Promise((resolve, reject)=>{
        conn.query('INSERT INTO contact(FullName, Email, Message, MessID) VALUES( ?, ?, ?, ? )', [ userData.fullname, userData.email, userData.message, messID ], (err, res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

module.exports = blogodb