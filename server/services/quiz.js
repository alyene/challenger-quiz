module.exports = function(app, pool, server) {

    const uniqid = require('uniqid');
    const socketio = require('socket.io');

    var websocket = socketio(server);


    websocket.on('connection', (socket) => {

        console.log(socket.adapter.rooms);

        //Connection establised. Get data now
        websocket.to(socket.id).emit('datatoserver');
        
        socket.on('hereisthedata', function(data){
            // Now we have the data, work with it
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
    });



    app.post('/submitquiz', function(req,res){
        resultData = req.body;
        
        if((!(resultData.userid)) || (!(resultData.subjectid)) || (!(resultData.quizscore))) {
            res.json({status:400, message: "Incomplete/Invalid Data" });
        } else {
            
            pool.getConnection(function(err, con) {
                if(err) {
                    console.log(err)
                } else {
                    queryString = "SELECT 1 FROM score WHERE userid=" + resultData.userid + " ORDER BY userid LIMIT 1"; 
                    con.query(queryString, function(err, result){
                        if(err) {
                            console.log(err)
                        } else if (results.length > 0) {
                            console.log(result.length);
                            res.json({status:200});
                        } else {

                        }
                    });
                }
            });
        }
    });

}// End Module Exports