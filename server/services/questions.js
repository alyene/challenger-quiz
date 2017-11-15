module.exports = function(app, pool) {

    // Subjects : ID
    // Genral Knowledge : 1,
    // Mathematics : 2,
    // English : 3,
    // Malayalam : 4,
    // Metal Ability: 5

    app.post('/addquestion', function(req, res){
        var questionData = req.body;
        
        if((!(questionData.question)) || 
            (!(questionData.option1)) || 
            (!(questionData.option2)) || 
            (!(questionData.option3)) || 
            (!(questionData.option4)) || 
            (!(questionData.answer)) ||
            (!(questionData.subjectid))) {
                res.json({ status:400, message: "Incomplete/Invalid Data"})
        } else {

            submitQuestion = {
                question: questionData.question,
                option1: questionData.option1,
                option2: questionData.option2,
                option3: questionData.option3,
                option4: questionData.option4,
                answer: questionData.answer,
                subjectid: questionData.subjectid
            }
    
            pool.getConnection(function(err, conn){
                if(err) {
                    console.log(err);
                } else {
                    conn.query('INSERT INTO questions SET ?', submitQuestion, function(err, dbres){
                        if(err) {
                            console.log(err);
                            conn.release();
                        } else {
                            res.json({ status:200, message: "Question Added Successfully" });
                        }
                    });
                }
            });
        }
    }); // End addquestion API
    

    app.post('/getquestions', function(req, res){
        var postData = req.body;

        if( (!(postData.userid)) || (!(postData.subjectid)) || (!(postData.count))) {
            res.json({ status:400, message: "Invalid/Incomplete Data" });
        } else {
            pool.getConnection(function(err, con) {
                if (err) {
                    console.log(err)
                } else {

                    if(postData.random) {
                        queryString = 'SELECT * FROM questions WHERE subjectid='+ postData.subjectid +' ORDER BY RAND() LIMIT ' + postData.count;
                    } else {
                        queryString = 'SELECT * FROM questions WHERE subjectid =' + postData.subjectid +' LIMIT ' + postData.count + ' OFFSET ' + postData.offset;
                    }

                    con.query(queryString, function(err,result){
                        if(err) {
                            console.log(err);
                        } else {
                            res.json({ status:200, questions: result })
                        }
                    });
                }
            });
        }
    });
    
} //End Exports