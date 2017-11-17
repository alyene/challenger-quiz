module.exports = function(app, pool, server) {

    const async = require("async");
    const uniqid = require('uniqid');
    const socketio = require('socket.io');
    const websocket = socketio(server); //Initiate Socket


    // ------------- Handling socket events starts here ---------------
    websocket.on('connection', (socket) => {

        //Connection establised. Asking for data from client.
        websocket.to(socket.id).emit('datatoserver');
        
        // Now we have the data, work with it
        socket.on('hereisthedata', function(data){
            
            pool.getConnection(function(err, con){
                if(err) {
                    console.log(err)
                } else {
                    checkGameQuery = "SELECT * FROM wlist WHERE subjectid = " + data.subjectid;

                    con.query(checkGameQuery, function(err, result){
                        if(err) {
                            console.log(err)
                        } else {

                            if(result.length > 0) {

                                console.log("Found player, setup and begin game");
                                socket.join(result[0].roomname);
                                getFiveQuery = 'SELECT * FROM questions WHERE subjectid='+ data.subjectid +' ORDER BY RAND() LIMIT 5';
                                
                                con.query(getFiveQuery, function(err, fiveQuestions){
                                    if(err) {
                                        console.log(err)
                                    } else {
                                        deleteGameQuery = `DELETE FROM wlist WHERE roomname="${result[0].roomname}"`;
                                        con.query(deleteGameQuery, function(err, deleted){
                                            if(err) {
                                                console.log(err)
                                            } else {
                                                websocket.to(result[0].roomname).emit('questions', { quizData: result[0], data: fiveQuestions });
                                            }
                                        });
                                    }
                                });

                            } else {

                                console.log("Empty Database, create new game and wait");
                                
                                gameroom = uniqid();
                                socket.join(gameroom);

                                insertData = {
                                    oneid: data.userid,
                                    onesocket: socket.id,
                                    subjectid: data.subjectid,
                                    roomname: gameroom,
                                };

                                con.query('INSERT INTO wlist SET ?', insertData, function(err, dbres){
                                    if(err) {
                                        console.log(err)
                                    } else {
                                        websocket.to(socket.id).emit('gamecreatedpleasewait');
                                    }
                                });
                            }
                        }
                    });
                }
            });
        });

        //When a user clicks an option, broadcast message to other user in the same room.
        socket.on('submitanswer', function(data){
            socket.broadcast.to(data.roomname).emit('opponentanswered', 
            { questionNumber: data.questionNumber, score: data.score, status: data.status});
        });

        socket.on('disconnecting', function(){
            socket.broadcast.to(socket.rooms[Object.keys(socket.rooms)[1]]).emit('opponentdisconnected');
        });

    });


    app.post('/submitquiz', function(req,res){
        resultData = req.body;
        
        if((!(resultData.subjectid)) || (!(resultData.playerone)) || (!(resultData.playertwo))) {
            res.json({status:400, message: "Incomplete/Invalid Data" });
        } else {
            pool.getConnection(function(err, con) {
                if(err) {
                    console.log(err)
                } else {

                    var quizSubject;
                    switch(resultData.subjectid) {
                        case 1: {
                          this.quizSubject = 'general';
                          break;
                        }
                        case 2: {
                          this.quizSubject = 'mathematics';
                          break;
                        }
                        case 3: {
                          this.quizSubject = 'english';
                          break;
                        }
                        case 4: {
                          this.quizSubject = 'malayalam';
                          break;
                        }
                        case 5: {
                          this.quizSubject = 'mental';
                          break;
                        }
                    }

                    poneQuery = `INSERT INTO score(userid, ${this.quizSubject}) 
                                 VALUES (${resultData.playerone.id}, ${resultData.playerone.score}) 
                                 ON DUPLICATE KEY UPDATE ${this.quizSubject} = ${this.quizSubject} + ${resultData.playerone.score}`;
                                 
                    ptwoQuery = `INSERT INTO score(userid, ${this.quizSubject}) 
                                 VALUES (${resultData.playertwo.id}, ${resultData.playertwo.score}) 
                                 ON DUPLICATE KEY UPDATE ${this.quizSubject} = ${this.quizSubject} + ${resultData.playertwo.score}`;
                    
                    async.parallel([
                        function(callback){
                            con.query(poneQuery, function(err, result){
                                if(err) {
                                    console.log(err)
                                }
                                callback();
                            });
                        },
                        function(callback){
                            con.query(ptwoQuery, function(err, result){
                                if(err) {
                                    console.log(err)
                                }
                                callback();
                            });
                        },
                    ], function(err, asyncResponse){
                        console.log("Shit Happens");
                        res.json({status: 200, message: "Update players score"});
                    });
                }
            });
        }
    });

}// End Module Exports