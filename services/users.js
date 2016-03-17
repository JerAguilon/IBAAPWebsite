var User = require('../models/databaseModels').User;
var UserDetail = require('../models/databaseModels').UserDetail;

var bcrypt = require('bcrypt');
var Bing = require('node-bing-api')({accKey: "jgk2Sf3SABeYuCaIENSy+r6mIOnCVRP6qM7etOxMbns"});

exports.findUser = function (input, next) {
    User.findOne({username: input}, function (err, user) {
        next(err, user);
    });
};
exports.getSearch = function (input, next) {
    Bing.web(input, {
        top: 20,  // Number of results (max 50)
        skip: 1,   // Skip first 3 results
    }, function(error, res, body){

        next(error, body.d);
    });
};

exports.login = function (user, pass, callback) {
    User.findOne({username : user}, function (e, o) {
        if (o == null) {
            callback('user not found');
        } else {
            bcrypt.compare(pass, o.password, function (err, isMatch) {
                if (err) return callback(err);
                console.log(isMatch);
                callback(null, isMatch);
            });

        }
    });
}



exports.lookup = function(user, callback) {
    //callback('userfound');
    User.findOne({username:user}, function(e, o) {
        if (o == null){
            callback('user-not-found');
        }   else{
            callback('user found');
        }
    });
}

exports.findUserDetailById = function (input, next) {
    UserDetail.findOne({_userDetail: input}).populate('_userDetail').exec(function (err, object) {
        next(err, object);
    });
};

exports.findMatch = function (input, next) {
    UserDetail.find({accountType: {$ne: input.accountType}}).populate('_userDetail').exec(function (err, object) {
        next(err, object);
    });
};

exports.getUserDetailList = function (input, next) {
    UserDetail.find({}).populate('_userDetail', 'username created').exec(function (err, object) {
        next(err, object);
    });
};
exports.addUser = function (input, next) {

    //Hash the password
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(input.password, salt, function(err, hash) {
            if (err) return next(err);

            var newUser = new User({
                username : input.username,
                password : hash
            })


            newUser.save(function (err) {
                if (err)
                    return err;
            })

            next();
        });
    });





/*        bcrypt.hash(input.password, 10, function (err, hash) {
            if (err) {
                console.log("Error on hash of password");
            }

            var newUser = new User({
                username : input.username,
                password: hash
            });

            newUser.save(function(err) {
                if (err) {
                    console.log("oops");
                }
                console.log("User created");
            });


        });*/



    // bcrypt.hash(input.password, 10, function (err, hash) {
    //     if (err) {
    //         return next(err);
    //     }

    //     input.password = hash;
    //     var newUser = new User({
    //         username: input.username,
    //         password: input.password
    //     });
    //     console.log("ayyy");
    //     console.log(newUser);

    //     newUser.save(function (err) {
    //         if (err) {
    //             console.log("error on adding user");
    //             return next(err);
    //         }

    //         console.log("'User created");

    //         var newUserDetail = new UserDetail({
    //             _userDetail: newUser._id,
    //             interest: input.interest,
    //             accountType: input.accountType,
    //             profilePicture: "default",
    //         });
    //         console.log("Saving new user");
    //         newUserDetail.save(function (err) {
    //             if (err) {
    //                 return next(err);
    //             }
    //             else {
    //                 next(null);
    //             }

    //         });

    //     });
    // });
};

exports.deleteUser = function (input, res, next) {
    User.findById(input, function (err, object) {
        if (err) return next(err);
        object.remove(function (err) {
            res(err);
        });
    });
};


