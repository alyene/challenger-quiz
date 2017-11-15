module.exports = function(app,pool) {

  var crypto = require('./common');
  
  app.post('/signup', function(req,res){

    userData = req.body;

    if((!(userData.password)) || (!(userData.phone)) || (!(userData.name))) {
      res.json({ status:400, message:"Invalid Data Packed Received" });
    }


    passData = crypto.setPassword(userData.password);

    var insertData = {
      name: userData.name,
      phone: userData.phone,
      dob: userData.dob,
      hash: passData.hash,
      salt: passData.salt
    }

    pool.getConnection(function(err, con){
      if(err) {
        console.log(err)
        con.release();
      } else {
        con.query('SELECT * FROM users WHERE phone='+ userData.phone, function(err, checkExisting){
          if(err){
            console.log(err);
            con.release();
          } else if (checkExisting[0] === undefined) {
            con.query('INSERT INTO users SET ?', insertData , function(err, result){
              if (err) {
                console.log(err)
              } else {
                var query = 'SELECT id, name, phone, email, dob FROM users WHERE phone=' + userData.phone;
                con.query(query, function(err, resUser){
                  if(err) {
                    console.log(err);
                    con.release();
                  } else {
                    console.log();
                    createScoreData = "INSERT INTO score (userid) VALUES (" + resUser[0].id + ")"
                    con.query(createScoreData, function(err, back){
                      if(err) {
                        console.log(err);
                      } else {
                        res.send(resUser);
                      }
                    });
                  }
                });      
              }
            });
          } else {
            res.json({ status: 400, message: "User Alerady Exists" });
          }
        });
      }
    });
  });


  app.post('/login', function(req,res){
    loginData = req.body;

    if((!(loginData.password)) || (!(loginData.phone))) {
      res.json({ status:400, message:"Invalid Data Packed Received" });
    }

    pool.getConnection(function(err, firstCon){
      if(err){
        console.log(err);
        firstCon.release();
      } else {
        queryString = 'SELECT salt, hash FROM users WHERE phone=' + loginData.phone;
        firstCon.query(queryString, function(err, firstResult){
          if(err) {
            console.log(err);
            firstCon.release();
          } else if (firstResult[0] !== undefined) {
            if(crypto.validPassword(loginData.password, firstResult[0])){
              getUserQuery = 'SELECT id, name, phone, email, score, dob FROM users WHERE phone=' + loginData.phone;
              firstCon.query(getUserQuery, function(err, secondResult){
                if(err) {
                  console.log(err);
                  firstCon.release();
                } else {
                  res.json({ status:200, data:secondResult });
                }
              });
            } else {
              res.json({ status: 400, message: "Incorrect Login Credentials" });
            }
          } else {
            res.json({ status: 400, message: "No user matching given data" });
          }
        });
      }
    });
  });

} //End Exports

