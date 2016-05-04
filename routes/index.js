var express = require('express');
var router = express.Router();
var databaseFunction = require('../services/records');
var Todo = require('../models/databaseModels').Todo;
var userServices = require('../services/users');
//allows for req JSON elements to be accessed

var session = require('express-session');
var app = express();

app.use(session({secret: 'ssshhhhh'}));

var sess;
/* GET home page. */
router.get('/', function (req, res, next) {
    sess = req.session;
    if (sess.username) {
        res.redirect('/FirstScreen/');
    } else {
        res.render('LogIn', {title: 'LogIn'});
    }


});

router.get('/logout', function (req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

router.get('/RegistrationPage', function (req, res, next) {


/*    databaseFunction.getCalendarEvents({}, function (err, calendarObject) {
        if (err) {
            console.log("Error upon calendar retrieval");
        }
        res.render('FirstScreen', {title: 'FirstScreen', calendarObject: calendarObject});
    });*/
    res.render('RegistrationPage', {title: 'RegistrationPage'});

});

router.post('/register/:username/:password', function (req, res) {
    username = req.params.username;
    password = req.params.password;
    console.log("IN METHOD");

    userServices.lookup(username, function(e, o) {
        console.log("O:" + o);
        if (!o) {
            console.log("User being created");
            var newUser = {
                username : username,
                password : password,
            }
            console.log(newUser);

            userServices.lookup(username)

            userServices.addUser(newUser, function(err, result){
                if (err) {
                    console.log("Error upon user creation");
                    res.send("")
                }
            });

            res.send("SUCCESS");

        } else {
            console.log("User found");
            res.send("user exists");
        }
    });




});

router.post('/login/:username/:password', function (req, res) {
        username = req.params.username;
        password = req.params.password;

        userServices.login(username, password, function(e, o) {
            if (!o) {
                console.log('Unable to log in');
            } else {
                sess = req.session;
                sess.username = username;
                password = password;
                console.log("SESS: " + sess.username);
                console.log("Login successful");

                res.send("SUCCESS");
            }
        });
});



router.get('/FirstScreen/', function (req, res, next) {
    databaseFunction.getCalendarEvents({}, function (err, calendarObject) {
        if (err) {
            console.log("Error upon calendar retrieval");
        }


        var userInfo = [];
        for (var i = 0; i < calendarObject.length; i++) {
            console.log(calendarObject[i]);
            if (calendarObject[i].user == sess.username) {
                userInfo.push({
                            recordDate : calendarObject[i].recordDate,
                            reliever : calendarObject[i].reliever,
                            tired : calendarObject[i].tired,
                            sleep : calendarObject[i].sleep,
                            school : calendarObject[i].school,
                            note : calendarObject[i].note
                        });
            }
        }

        console.log(userInfo);
        res.render('FirstScreen', {title: 'FirstScreen', userInfo: userInfo});
    });

});
/*
router.get('/FirstScreen', function (req, res, next) {

    databaseFunction.getCalendarEvents({}, function (err, calendarObject) {
        if (err) {
            console.log("Error upon calendar retrieval");
        }
        res.render('FirstScreen', {title: 'FirstScreen', calendarObject: calendarObject});
    });

});*/

router.get('/Chart/', function (req, res, next) {
    databaseFunction.getCalendarEvents({}, function (err, calendarObject) {
        if (err) {

        }
        var reliever = 0;
        var school = 0;
        var sleep = 0;
        var tired = 0;
        var dates = []; //array of dates
        var incidences = []; // number of incidences associated with the dates;


        for (var i = 0; i < calendarObject.length; i++) {
            dates[i] = Date.parse(calendarObject[i].recordDate);
            incidences[i] = 0;
            console.log("Current user : " + sess.username);
            if (calendarObject[i].user == sess.username) {
                console.log(calendarObject[i]);
                if (calendarObject[i].reliever) {
                    reliever++;
                    incidences[i]++;
                }
                if (calendarObject[i].school) {
                    school++;
                    incidences[i]++;
                }
                if (calendarObject[i].sleep) {
                    sleep++;
                    incidences[i]++;
                }
                if (calendarObject[i].tired) {
                    tired++;
                    incidences[i]++;

                }

                if (calendarObject[i].reliever &&
                    calendarObject[i].school &&
                    calendarObject[i].sleep &&
                    calendarObject[i].tired) {
                    console.log("hmm");
                }
            }
        }
        console.log(incidences);

        res.render('Chart', {
            title: 'Chart', chart: {
                reliever: reliever,
                school: school,
                sleep: sleep,
                tired: tired,
                dates: dates,
                incidences: incidences
            }
        });
    });
});

router.get('/Chart', function (req, res, next) {
    databaseFunction.getCalendarEvents({}, function (err, calendarObject) {
        if (err) {

        }
        var reliever = 0;
        var school = 0;
        var sleep = 0;
        var tired = 0;
        var dates = []; //array of dates
        var incidences = []; // number of incidences associated with the dates;
        for (var i = 0; i < calendarObject.length; i++) {
            dates[i] = Date.parse(calendarObject[i].recordDate);
            incidences[i] = 0;

            if (calendarObject[i].reliever) {
                reliever++;
                incidences[i]++;
            }
            if (calendarObject[i].school) {
                school++;
                incidences[i]++;
            }
            if (calendarObject[i].sleep) {
                sleep++;
                incidences[i]++;
            }
            if (calendarObject[i].tired) {
                tired++;
                incidences[i]++;

            }


        }

        res.render('Chart', {
            title: 'Chart', chart: {
                reliever: reliever,
                school: school,
                sleep: sleep,
                tired: tired,
                dates: dates,
                incidences: incidences
            }
        });
    });

});

router.get('/GreenZone', function (req, res, next) {
    res.render('GreenZone', {title: 'GreenZone'});
});

router.get('/YellowZone', function (req, res, next) {
    res.render('YellowZone', {title: 'YellowZone'});
});

router.get('/RedZone', function (req, res, next) {
    res.render('RedZone', {title: 'RedZone'});
});

router.get('/Practice', function (req, res, next) {
    res.render('Practice', {title: 'Practice'});
});

router.get('/Triggers', function (req, res, next) {
    res.render('Triggers', {title: 'Triggers'});
});

router.get('/Notification', function (req, res, next) {
    res.render('Notification', {title: 'Notification'});
});

router.get('/SendPlan', function (req, res, next) {
    res.render('SendPlan', {title: 'SendPlan'});
});

/*router.post('/updatePen/:pen/:recordDate', function (req, res, next) {
    var recordInput = {
        recordDate: req.params.recordDate
    };
    databaseFunction.findRecord(recordInput, function (err, recordObject) {
        if (err) {
            return res.send(err);
        }
        if (recordObject == null) {
            var newRecord = {

                school: true,
                sleep: false,
                tired: false,
                reliever: false,
                recordDate: req.params.recordDate
            };
            databaseFunction.addRecord(newRecord, function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    res.end();
                }
            });
        } else {
            var updateInput = {
                recordDate: req.params.recordDate,
                school: req.params.pen
            };
            databaseFunction.updateSchoolRecord(updateInput, function (err, object) {
                if (err) {
                    return res.send(err);
                }
                res.end();
            });
        }
    });

});*/

router.post('/updatePen/:pen/:recordDate/', function (req, res, next) {
    var recordInput = {
        //may need to add user here
        username : sess.username,
        recordDate: req.params.recordDate
    };
    databaseFunction.findRecord(recordInput, function (err, recordObject) {
        if (err) {
            return res.send(err);
        }
        if (recordObject == null) {
            console.log("Username: " + req.params.username);
            var newRecord = {
                user: sess.username,
                school: true,
                sleep: false,
                tired: false,
                reliever: false,
                recordDate: req.params.recordDate
            };
            databaseFunction.addRecord(newRecord, function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    res.end();
                }
            });
        } else {
            var updateInput = {
                recordDate: req.params.recordDate,
                school: req.params.pen
            };
            databaseFunction.updateSchoolRecord(updateInput, function (err, object) {
                if (err) {
                    console.log("error");
                    return res.send(err);
                }
                res.end();
            });
        }
    });

});


router.post('/updateSleep/:sleep/:recordDate', function (req, res, next) {
    var recordInput = {
        username : sess.username,
        recordDate: req.params.recordDate
    };
    databaseFunction.findRecord(recordInput, function (err, recordObject) {
        if (err) {
            return res.send(err);
        }
        if (recordObject == null) {
            var newRecord = {
                user: sess.username,
                school: false,
                sleep: true,
                tired: false,
                reliever: false,
                recordDate: req.params.recordDate
            };
            databaseFunction.addRecord(newRecord, function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    res.end();
                }
            });
        } else {
            var updateInput = {
                recordDate: req.params.recordDate,
                sleep: req.params.sleep
            };
            databaseFunction.updateSleepRecord(updateInput, function (err, object) {
                if (err) {
                    return res.send(err);
                }
                res.end();
            });
        }
    });
});

router.post('/updateSleep/:sleep/:recordDate', function (req, res, next) {
    var recordInput = {
        username : sess.username,
        recordDate: req.params.recordDate
    };
    databaseFunction.findRecord(recordInput, function (err, recordObject) {
        if (err) {
            return res.send(err);
        }
        if (recordObject == null) {
            var newRecord = {
                user: sess.username,
                school: false,
                sleep: true,
                tired: false,
                reliever: false,
                recordDate: req.params.recordDate
            };
            databaseFunction.addRecord(newRecord, function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    res.end();
                }
            });
        } else {
            var updateInput = {
                recordDate: req.params.recordDate,
                sleep: req.params.sleep
            };
            databaseFunction.updateSleepRecord(updateInput, function (err, object) {
                if (err) {
                    return res.send(err);
                }
                res.end();
            });
        }
    });
});

router.post('/updateTired/:tired/:recordDate', function (req, res, next) {
    var recordInput = {
        username : sess.username,
        recordDate: req.params.recordDate
    };
    databaseFunction.findRecord(recordInput, function (err, recordObject) {
        if (err) {
            return res.send(err);
        }
        if (recordObject == null) {
            var newRecord = {
                user: sess.username,
                school: false,
                sleep: false,
                tired: true,
                reliever: false,
                recordDate: req.params.recordDate
            };
            databaseFunction.addRecord(newRecord, function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    res.end();
                }
            });
        } else {
            var updateInput = {
                recordDate: req.params.recordDate,
                tired: req.params.tired
            };
            databaseFunction.updateTiredRecord(updateInput, function (err, object) {
                if (err) {
                    return res.send(err);
                }
                res.end();
            });
        }
    });
});
router.post('/updateReliever/:reliever/:recordDate', function (req, res, next) {
    console.log("USERNAME: " + sess.username);
    var recordInput = {
        username : sess.username,
        recordDate: req.params.recordDate
    };
    databaseFunction.findRecord(recordInput, function (err, recordObject) {
        if (err) {
            return res.send(err);
        }
        if (recordObject == null) {
            var newRecord = {
                user: sess.username,
                school: false,
                sleep: false,
                tired: false,
                reliever: true,
                recordDate: req.params.recordDate
            };
            console.log("test");
            databaseFunction.addRecord(newRecord, function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    res.end();
                }
            });
        } else {
            var updateInput = {
                recordDate: req.params.recordDate,
                reliever: req.params.reliever
            };
            databaseFunction.updateRelieverRecord(updateInput, function (err, object) {
                if (err) {
                    return res.send(err);
                }
                res.end();
            });
        }
    });
});

router.get('/Notes/:recordDate', function (req, res, next) {
    res.render('NotesPage', {
        title: 'Notes',
        recordDate: req.params.recordDate
    });
});


router.get('/api/todos/:recordDate', function (req, res, next) {
    getTodos(req.params.recordDate, res);
});

router.post('/api/todos/:recordDate', function (req, res, next) {
    Todo.create({
        recordDate: req.params.recordDate,
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another

        getTodos(req.params.recordDate, res);
    });
});

router.delete('/api/todos/:recordDate/:todo_id', function (req, res, next) {
    Todo.remove({
        recordDate: req.params.recordDate,
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);

        getTodos(req.params.recordDate, res);
    });
});



function getTodos(recordDate, res) {
    Todo.find({recordDate: recordDate}, function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(todos); // return all todos in JSON format
    });
};


module.exports = router;
