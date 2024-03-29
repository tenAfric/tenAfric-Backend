const conn = require("../db/conn");

//fetch all records
let blogodb = {};
blogodb.all = () => {
  return new Promise((resolve, reject)=>{
    conn.query('SELECT * FROM users', (err, results)=>{
      if(err){return reject(err);}
      return resolve(results)
    });
  });
};

//fetch one record
blogodb.one = (email, userID) => {
  return new Promise((resolve, reject)=>{
    conn.query('SELECT * FROM users WHERE Email = ? || UserID = ?', [email, userID], (err, results)=>{
      if(err){return reject(err);}
      return resolve(results[0])
    });
  });
}


//create a new record
blogodb.create = (userData) => {
  return new Promise((resolve, reject)=>{
    conn.query("SELECT Email FROM  users WHERE Email = ?", [userData.email], (err, result) => {
        if(err){return reject(err);}
        if(result.length === 0){
          conn.query('INSERT INTO users(Email, Phone, Password, UserID) VALUES( ?, ?, ?, ? )', [ userData.email, userData.phone, userData.password, userData.userID ], (err, results)=>{
            if(err){return reject(err);}
            return resolve(results)
          });
        }else{  
          return reject({"error": "Email provided is already in use!", "message":"please login to your account", "details": err});
        }
    });
  });
}

//register a new user to the system
blogodb.reguser = (userData) => {
  return new Promise((resolve, reject)=>{
    conn.query("SELECT Email FROM  users WHERE Email = ?", [userData.email], (err, result) => {
        if(err){return reject(err);}
        if(result.length === 0){
          conn.query('INSERT INTO users(FullName, Email, Phone, Password, UserID, SessionID) VALUES( ?, ?, ?, ?, ?, ? )', [ userData.fullname, userData.email, userData.phone, userData.password, userData.userID, userData.sessionID ], (err, results)=>{
            return resolve(results)
          });
        }else{
          return reject({"error": "Email provided is already in use!", "message":"please login to your account", "details": err});
        }
    });
  }).catch(err => { throw err });
}

//google reg user to sys
blogodb.googlereg = (userData) => {
  return new Promise((resolve, reject)=>{
    conn.query("SELECT Email FROM  google_auth WHERE Email = ?", [userData.email], (err, result) => {
        if(err){return reject(err);}
        if(result.length === 0){
          conn.query('INSERT INTO google_auth(Email, FamilyName, GivenName, GoogleId, ImgUrl, Name, UserID) VALUES( ?, ?, ?, ?, ?, ?, ?)', [ userData.email, userData.familyName, userData.givenName, userData.googleId, userData.imageUrl, userData.name, userData.userID ], (err, results)=>{
            if(err){return reject(err);}
            return resolve(results)
          });
        }else{
          console.log("Email provided is already in use!");
          //return reject({"error": "Email provided is already in use!", "message":"please login to your account", "details": err});
        }
    });
  });
}

//update a record
blogodb.update = (id, userData) => {
  return new Promise((resolve, reject)=>{
    conn.query('UPDATE users SET name=?, released_year=?, githut_rank=?, pypl_rank=?, tiobe_rank=? WHERE id=?', [ userData.name, userData.released_year, userData.githut_rank, userData.pypl_rank, userData.tiobe_rank, id ], (err, results)=>{
      if(err){return reject(err);}
      return resolve(results)
    });
  });
}
//remove a record
blogodb.update = (id) => {
  return new Promise((resolve, reject)=>{
    conn.query('DELETE FROM users WHERE id=?', [id], (err, results)=>{
      if(err){return reject(err);}
      return resolve(results)
    });
  });
}

module.exports = blogodb;